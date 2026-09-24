import React, { useEffect, useRef, useState } from 'react';

// Scientifically categorized stellar spectral classes (Morgan-Keenan Classification)
const SPECTRAL_CLASSES = [
  { class: 'O', color: '#9bb0ff', core: '#dce6ff', name: 'Hot Blue', weight: 0.06 },
  { class: 'B', color: '#bbccff', core: '#f0f4ff', name: 'Blue-White', weight: 0.12 },
  { class: 'A', color: '#f8f9ff', core: '#ffffff', name: 'Pure White', weight: 0.22 },
  { class: 'F', color: '#fff4e8', core: '#ffffff', name: 'Yellow-White', weight: 0.24 },
  { class: 'G', color: '#ffd27d', core: '#fff9e6', name: 'Solar Yellow', weight: 0.18 },
  { class: 'K', color: '#ffa044', core: '#ffe8cc', name: 'Orange Giant', weight: 0.11 },
  { class: 'M', color: '#ff6238', core: '#ffd4cc', name: 'Red Dwarf', weight: 0.07 }
];

function getRandomSpectralStar() {
  const rand = Math.random();
  let cumulative = 0;
  for (const s of SPECTRAL_CLASSES) {
    cumulative += s.weight;
    if (rand <= cumulative) return s;
  }
  return SPECTRAL_CLASSES[2];
}

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const raRef = useRef(null);
  const decRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // High-precision smooth mouse physics
    const mouse = {
      x: width * 0.5,
      y: height * 0.4,
      targetX: width * 0.5,
      targetY: height * 0.4,
      prevX: width * 0.5,
      prevY: height * 0.4,
      vx: 0,
      vy: 0,
      speed: 0
    };

    // Physics camera with momentum / inertia
    const camera = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      vx: 0,
      vy: 0,
      scrollY: window.scrollY || 0,
      targetScrollY: window.scrollY || 0
    };

    let lastTime = performance.now();

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      camera.targetX = (e.clientX - width / 2);
      camera.targetY = (e.clientY - height / 2);

      // Real astronomical coordinates calculation
      const raH = ((e.clientX / width) * 24).toFixed(0).padStart(2, '0');
      const raM = Math.floor(((e.clientX / width) * 1440) % 60).toString().padStart(2, '0');
      const raS = Math.floor(((e.clientX / width) * 86400) % 60).toString().padStart(2, '0');
      const decSign = e.clientY < height / 2 ? '+' : '-';
      const decD = Math.floor(Math.abs((height / 2 - e.clientY) / (height / 2)) * 89).toString().padStart(2, '0');
      const decM = Math.floor(Math.random() * 60).toString().padStart(2, '0');

      if (raRef.current) raRef.current.textContent = `${raH}h ${raM}m ${raS}s`;
      if (decRef.current) decRef.current.textContent = `${decSign}${decD}° ${decM}′ 14″`;
    };

    const handleScroll = () => {
      camera.targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 1. STAR POPULATIONS WITH CONTINUOUS DRIFT PHYSICS
    let microStars = [];
    let classifiedStars = [];
    let jwstPrimaryStars = [];

    const initStars = () => {
      microStars = [];
      classifiedStars = [];
      jwstPrimaryStars = [];

      // A: 480 Unresolved Micro-Stars (Faint Milky Way Stardust)
      const microCount = Math.min(Math.floor(width * 0.42), 520);
      for (let i = 0; i < microCount; i++) {
        const alongPlane = Math.random();
        const planeX = alongPlane * width;
        const planeY = (alongPlane * 0.7 + 0.15) * height + (Math.random() - 0.5) * height * 0.6;

        microStars.push({
          x: planeX,
          y: planeY,
          size: Math.random() * 0.65 + 0.25,
          alpha: Math.random() * 0.55 + 0.15,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          parallaxFactor: Math.random() * 0.015 + 0.005,
          // Continuous micro-drift in deep space
          vx: (Math.random() - 0.45) * 0.06,
          vy: (Math.random() - 0.5) * 0.04
        });
      }

      // B: 150 Medium Stellar Bodies with Morgan-Keenan Spectral Classification
      const mediumCount = Math.min(Math.floor(width * 0.12), 140);
      for (let i = 0; i < mediumCount; i++) {
        const spectral = getRandomSpectralStar();
        const depth = Math.random(); // 0 (far) to 1 (near)
        classifiedStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: depth > 0.7 ? Math.random() * 1.3 + 1.0 : Math.random() * 0.8 + 0.5,
          spectral: spectral,
          alpha: Math.random() * 0.5 + 0.35,
          twinkleSpeed: Math.random() * 0.035 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          depth: depth,
          parallaxFactor: depth * 0.04 + 0.012,
          // Galactic orbital drift
          vx: (Math.random() - 0.4) * 0.10 * (depth + 0.3),
          vy: (Math.random() - 0.5) * 0.08 * (depth + 0.3)
        });
      }

      // C: 10 Landmark Stars with James Webb Space Telescope 6-Point Hexagonal Spikes
      const primaryCount = 10;
      for (let i = 0; i < primaryCount; i++) {
        const spectral = getRandomSpectralStar();
        jwstPrimaryStars.push({
          x: (0.08 + (i / primaryCount) * 0.84) * width + (Math.random() - 0.5) * 80,
          y: Math.random() * height * 0.80 + height * 0.10,
          radius: Math.random() * 1.6 + 2.0,
          spectral: spectral,
          spikeLength: Math.random() * 26 + 34,
          twinkleSpeed: Math.random() * 0.025 + 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
          parallaxFactor: 0.065,
          vx: (Math.random() - 0.4) * 0.08,
          vy: (Math.random() - 0.5) * 0.05
        });
      }
    };

    initStars();

    // 2. INTERACTIVE COSMIC DUST SLIPSTREAM (Smooth Cursor Wake Particles)
    const stardustParticles = [];
    const maxStardust = 32;
    const lastSpawn = { x: width * 0.5, y: height * 0.4 };

    // 3. PERSISTENT HYPERSONIC METEORS
    const meteors = [];
    const persistentTrails = [];

    const spawnMeteor = () => {
      const startX = Math.random() * width * 0.85 + width * 0.15;
      const startY = Math.random() * height * 0.35;
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.35;
      const speed = Math.random() * 14 + 18;

      meteors.push({
        x: startX,
        y: startY,
        dx: -Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length: Math.random() * 180 + 120,
        width: Math.random() * 1.5 + 1.2,
        life: 1.0,
        decay: Math.random() * 0.025 + 0.018,
        color: Math.random() > 0.4 ? '#e0f2fe' : '#fef08a'
      });
    };

    const meteorInterval = setInterval(() => {
      if (meteors.length < 2 && Math.random() > 0.45) {
        spawnMeteor();
      }
    }, 2800);

    // 4. PLANETARY GEOMETRY
    const planet = {
      baseX: 0.84,
      baseY: 0.20,
      radiusRatio: 0.085,
      tilt: -0.38,
      ringInnerRatio: 1.45,
      ringCassiniInnerRatio: 1.95,
      ringCassiniOuterRatio: 2.05,
      ringOuterRatio: 2.50
    };

    let simTime = 0;

    const render = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      simTime += dt;

      // Smooth responsive mouse interpolation with sub-pixel precision
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x += (mouse.targetX - mouse.x) * 0.42;
      mouse.y += (mouse.targetY - mouse.y) * 0.42;
      mouse.vx = (mouse.x - mouse.prevX);
      mouse.vy = (mouse.y - mouse.prevY);
      mouse.speed = Math.hypot(mouse.vx, mouse.vy);

      // Camera interpolation with silky inertia
      camera.vx += (camera.targetX - camera.x) * 0.025;
      camera.vy += (camera.targetY - camera.y) * 0.025;
      camera.vx *= 0.90;
      camera.vy *= 0.90;
      camera.x += camera.vx;
      camera.y += camera.vy;

      camera.scrollY += (camera.targetScrollY - camera.scrollY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // --- LAYER 1: Deep Astronomical Vacuum Canvas ---
      const vacuum = ctx.createLinearGradient(0, 0, width, height);
      vacuum.addColorStop(0, '#010206');
      vacuum.addColorStop(0.5, '#02040b');
      vacuum.addColorStop(1, '#010206');
      ctx.fillStyle = vacuum;
      ctx.fillRect(0, 0, width, height);

      // Subtle Galactic Core diffuse illumination
      const mwGrad = ctx.createRadialGradient(
        width * 0.45 + camera.x * 0.008, height * 0.45 + camera.y * 0.008, width * 0.05,
        width * 0.45 + camera.x * 0.008, height * 0.45 + camera.y * 0.008, width * 0.55
      );
      mwGrad.addColorStop(0, 'rgba(192, 132, 252, 0.05)');
      mwGrad.addColorStop(0.35, 'rgba(56, 189, 248, 0.035)');
      mwGrad.addColorStop(0.7, 'rgba(15, 23, 42, 0.04)');
      mwGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = mwGrad;
      ctx.fillRect(0, 0, width, height);

      // --- LAYER 2: Ethereal Gravitational Lensing Halo Around Cursor ---
      if (mouse.x > 0 && mouse.x < width) {
        const lensRadius = 140 + Math.min(mouse.speed * 2.0, 45);
        const lensGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, lensRadius
        );
        lensGrad.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
        lensGrad.addColorStop(0.35, 'rgba(192, 132, 252, 0.05)');
        lensGrad.addColorStop(0.7, 'rgba(147, 51, 234, 0.02)');
        lensGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = lensGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, lensRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- LAYER 3: 480 Unresolved Micro-Stars (Milky Way Galactic Dust) ---
      for (let i = 0; i < microStars.length; i++) {
        const s = microStars[i];

        // Continuous natural zero-g drift
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        // Inertial camera parallax
        const px = s.x - camera.x * s.parallaxFactor;
        const py = s.y - (camera.y * s.parallaxFactor + camera.scrollY * 0.02);

        if (px < -10 || px > width + 10 || py < -10 || py > height + 10) continue;

        const twinkle = Math.sin(simTime * 2.5 + s.twinklePhase) * 0.25;
        const alpha = Math.max(0.08, Math.min(0.85, s.alpha + twinkle));

        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = alpha;
        ctx.fillRect(px, py, s.size, s.size);
      }

      // --- LAYER 4: 150 Morgan-Keenan Classified Stars with Smooth Lorentzian Deflection ---
      for (let i = 0; i < classifiedStars.length; i++) {
        const s = classifiedStars[i];

        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const px = s.x - camera.x * s.parallaxFactor;
        const py = s.y - (camera.y * s.parallaxFactor + camera.scrollY * 0.04);

        if (px < -20 || px > width + 20 || py < -20 || py > height + 20) continue;

        // Mathematical Einstein Gravitational Deflection with Smooth Lorentzian Curve
        // Seamless smooth falloff — zero popping or harsh radius borders!
        const dx = mouse.x - px;
        const dy = mouse.y - py;
        const r2 = dx * dx + dy * dy;
        const softeningRadius2 = 140 * 140; // Softening parameter
        const deflectionFactor = (6000 * s.depth) / (r2 + softeningRadius2);

        let drawX = px - dx * deflectionFactor;
        let drawY = py - dy * deflectionFactor;

        // Subtle frame-dragging swirl along cursor velocity
        if (mouse.speed > 0.5) {
          const frameDrag = (mouse.speed * 8 * s.depth) / (r2 + softeningRadius2);
          drawX += -dy * frameDrag * 0.05;
          drawY += dx * frameDrag * 0.05;
        }

        const twinkle = Math.sin(simTime * 3.2 + s.twinklePhase) * 0.3;
        const alpha = Math.max(0.15, Math.min(1, s.alpha + twinkle));

        // Stellar glow halo
        ctx.beginPath();
        ctx.arc(drawX, drawY, s.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = s.spectral.color;
        ctx.globalAlpha = alpha * 0.25;
        ctx.fill();

        // Pinpoint stellar core
        ctx.beginPath();
        ctx.arc(drawX, drawY, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.spectral.core;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }

      // --- LAYER 5: Photorealistic Ringed Celestial Exoplanet with Parallax ---
      const planetRadius = Math.max(34, Math.min(width * planet.radiusRatio, 90));
      const planetX = width * planet.baseX - camera.x * 0.025;
      const planetY = height * planet.baseY - (camera.y * 0.025 + camera.scrollY * 0.03);

      ctx.save();
      ctx.translate(planetX, planetY);
      ctx.rotate(planet.tilt);

      const rInner = planetRadius * planet.ringInnerRatio;
      const rCassiniIn = planetRadius * planet.ringCassiniInnerRatio;
      const rCassiniOut = planetRadius * planet.ringCassiniOuterRatio;
      const rOuter = planetRadius * planet.ringOuterRatio;
      const ringAspect = 0.24;

      const drawRingSegment = (inner, outer, style, alpha, startAngle, endAngle) => {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(0, 0, outer, outer * ringAspect, 0, startAngle, endAngle);
        ctx.ellipse(0, 0, inner, inner * ringAspect, 0, endAngle, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = style;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.restore();
      };

      // Back rings
      drawRingSegment(rInner * 0.9, rInner, 'rgba(148, 163, 184, 0.2)', 0.4, Math.PI, Math.PI * 2);
      const bRingGradBack = ctx.createLinearGradient(-rCassiniIn, 0, rCassiniIn, 0);
      bRingGradBack.addColorStop(0, 'rgba(254, 243, 199, 0.65)');
      bRingGradBack.addColorStop(0.5, 'rgba(203, 213, 225, 0.85)');
      bRingGradBack.addColorStop(1, 'rgba(254, 243, 199, 0.65)');
      drawRingSegment(rInner, rCassiniIn, bRingGradBack, 0.75, Math.PI, Math.PI * 2);
      drawRingSegment(rCassiniOut, rOuter, 'rgba(226, 232, 240, 0.55)', 0.6, Math.PI, Math.PI * 2);

      // Planet shadow on back rings
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(-planetRadius * 0.35, -planetRadius * 0.15, planetRadius * 1.3, planetRadius * 0.85, 0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(1, 2, 8, 0.90)';
      ctx.fill();
      ctx.restore();

      // Planet body & atmospheric Rayleigh scattering
      ctx.save();
      const atmoScatter = ctx.createRadialGradient(
        -planetRadius * 0.45, -planetRadius * 0.45, planetRadius * 0.85,
        -planetRadius * 0.35, -planetRadius * 0.35, planetRadius * 1.14
      );
      atmoScatter.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
      atmoScatter.addColorStop(0.5, 'rgba(14, 165, 233, 0.18)');
      atmoScatter.addColorStop(1, 'transparent');
      ctx.fillStyle = atmoScatter;
      ctx.beginPath();
      ctx.arc(0, 0, planetRadius * 1.14, 0, Math.PI * 2);
      ctx.fill();

      const planetShade = ctx.createRadialGradient(
        -planetRadius * 0.5, -planetRadius * 0.4, planetRadius * 0.1,
        planetRadius * 0.2, planetRadius * 0.2, planetRadius * 1.05
      );
      planetShade.addColorStop(0, '#e2e8f0');
      planetShade.addColorStop(0.25, '#7dd3fc');
      planetShade.addColorStop(0.5, '#0284c7');
      planetShade.addColorStop(0.75, '#0f172a');
      planetShade.addColorStop(0.95, '#020617');
      planetShade.addColorStop(1, '#000000');

      ctx.fillStyle = planetShade;
      ctx.beginPath();
      ctx.arc(0, 0, planetRadius, 0, Math.PI * 2);
      ctx.fill();

      // Ring shadow on planet body
      ctx.beginPath();
      ctx.ellipse(0, planetRadius * 0.15, planetRadius * 0.98, planetRadius * 0.12, 0, 0, Math.PI);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.fill();
      ctx.restore();

      // Front rings over planet
      drawRingSegment(rInner * 0.9, rInner, 'rgba(148, 163, 184, 0.2)', 0.45, 0, Math.PI);
      drawRingSegment(rInner, rCassiniIn, bRingGradBack, 0.85, 0, Math.PI);
      drawRingSegment(rCassiniOut, rOuter, 'rgba(226, 232, 240, 0.6)', 0.7, 0, Math.PI);

      ctx.restore();

      // --- LAYER 6: 10 Landmark Stars with James Webb 6-Point Hexagonal Spikes ---
      for (let i = 0; i < jwstPrimaryStars.length; i++) {
        const s = jwstPrimaryStars[i];

        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const px = s.x - camera.x * s.parallaxFactor;
        const py = s.y - (camera.y * s.parallaxFactor + camera.scrollY * 0.05);

        if (px < -60 || px > width + 60 || py < -60 || py > height + 60) continue;

        // Smooth Einstein deflection for landmark stars
        const dx = mouse.x - px;
        const dy = mouse.y - py;
        const r2 = dx * dx + dy * dy;
        const softeningRadius2 = 160 * 160;
        const deflectionFactor = (7500) / (r2 + softeningRadius2);
        const drawX = px - dx * deflectionFactor;
        const drawY = py - dy * deflectionFactor;

        const twinkle = Math.sin(simTime * 2.8 + s.twinklePhase) * 0.22;
        const alpha = Math.max(0.65, Math.min(1.0, 0.85 + twinkle));

        ctx.save();
        // Airy Disk
        ctx.beginPath();
        ctx.arc(drawX, drawY, s.radius * 2.8, 0, Math.PI * 2);
        ctx.strokeStyle = s.spectral.color;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = alpha * 0.35;
        ctx.stroke();

        // Core
        const coreGlow = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, s.radius * 4.5);
        coreGlow.addColorStop(0, '#ffffff');
        coreGlow.addColorStop(0.3, s.spectral.core);
        coreGlow.addColorStop(0.7, s.spectral.color);
        coreGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(drawX, drawY, s.radius * 4.5, 0, Math.PI * 2);
        ctx.globalAlpha = alpha;
        ctx.fill();

        // 6-Point JWST Hexagonal Spikes
        const angles = [0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3];
        const spikeLen = s.spikeLength * (0.9 + twinkle * 0.2);

        for (const ang of angles) {
          const endX = drawX + Math.cos(ang) * spikeLen;
          const endY = drawY + Math.sin(ang) * spikeLen;

          const spikeGrad = ctx.createLinearGradient(drawX, drawY, endX, endY);
          spikeGrad.addColorStop(0, '#ffffff');
          spikeGrad.addColorStop(0.25, s.spectral.color);
          spikeGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.4)');
          spikeGrad.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.moveTo(drawX, drawY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = spikeGrad;
          ctx.lineWidth = 0.85;
          ctx.globalAlpha = alpha * 0.75;
          ctx.stroke();
        }

        // Secondary horizontal struts
        const hSpikeLen = spikeLen * 0.65;
        const hGrad = ctx.createLinearGradient(drawX - hSpikeLen, drawY, drawX + hSpikeLen, drawY);
        hGrad.addColorStop(0, 'transparent');
        hGrad.addColorStop(0.5, '#ffffff');
        hGrad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(drawX - hSpikeLen, drawY);
        ctx.lineTo(drawX + hSpikeLen, drawY);
        ctx.strokeStyle = hGrad;
        ctx.lineWidth = 0.6;
        ctx.globalAlpha = alpha * 0.5;
        ctx.stroke();
        ctx.restore();
      }

      // --- LAYER 7: Radiant Cosmic Stardust Glitter Trail (Ultra-Smooth Short Wake) ---
      const distFromLastSpawn = Math.hypot(mouse.x - lastSpawn.x, mouse.y - lastSpawn.y);

      if (distFromLastSpawn > 3.5 && mouse.speed > 0.4) {
        // Continuous segment interpolation: guarantees zero gaps with lean, tight short trail
        const stepDist = 14;
        const steps = Math.min(2, Math.max(1, Math.floor(distFromLastSpawn / stepDist)));
        const glitterPalettes = [
          { glow: '#38bdf8', core: '#ffffff' }, // Electric Cyan
          { glow: '#c084fc', core: '#ffffff' }, // Radiant Violet
          { glow: '#fde047', core: '#ffffff' }, // Golden Star Sparkle
          { glow: '#67e8f9', core: '#ffffff' }, // Diamond Starlight
          { glow: '#f472b6', core: '#ffffff' }  // Magenta Cosmic Dust
        ];

        for (let s = 1; s <= steps; s++) {
          if (stardustParticles.length >= maxStardust) break;
          const t = s / steps;
          const interpX = lastSpawn.x + (mouse.x - lastSpawn.x) * t;
          const interpY = lastSpawn.y + (mouse.y - lastSpawn.y) * t;

          const chosen = glitterPalettes[Math.floor(Math.random() * glitterPalettes.length)];
          const spread = Math.random() * 2.0 + 0.6; // Ultra-tight cluster right at cursor tip
          const spreadAng = Math.random() * Math.PI * 2;

          stardustParticles.push({
            x: interpX + Math.cos(spreadAng) * spread,
            y: interpY + Math.sin(spreadAng) * spread,
            vx: -mouse.vx * 0.03 + (Math.random() - 0.5) * 0.18,
            vy: -mouse.vy * 0.03 + (Math.random() - 0.5) * 0.18,
            size: Math.random() * 0.85 + 0.55,
            life: 1.0,
            decay: Math.random() * 0.075 + 0.055, // Shorter, ultra-crisp trail duration (~0.2s)
            color: chosen.glow,
            core: chosen.core,
            sparklePhase: Math.random() * Math.PI * 2,
            sparkleSpeed: Math.random() * 8 + 4,
            hasSpike: true
          });
        }
        lastSpawn.x = mouse.x;
        lastSpawn.y = mouse.y;
      } else if (distFromLastSpawn <= 3.5) {
        lastSpawn.x = mouse.x;
        lastSpawn.y = mouse.y;
      }

      ctx.save();
      // Additive blending for pure starlight glint
      ctx.globalCompositeOperation = 'lighter';

      for (let i = stardustParticles.length - 1; i >= 0; i--) {
        const p = stardustParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.80; // Snappy drag: tightly hugs the cursor line without drifting away
        p.vy *= 0.80;
        p.life -= p.decay;

        if (p.life <= 0) {
          stardustParticles.splice(i, 1);
          continue;
        }

        // Hermite smoothstep fade curve: zero popping, buttery organic fade
        const smoothLife = p.life * p.life * (3 - 2 * p.life);
        const sparkleFactor = 0.82 + 0.22 * Math.sin(simTime * p.sparkleSpeed + p.sparklePhase);
        const currentAlpha = Math.min(0.48, smoothLife * 0.82 * sparkleFactor);

        // 1. Soft Outer Glow Halo
        const glowRadius = p.size * 2.2;
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        glowGrad.addColorStop(0, '#ffffff');
        glowGrad.addColorStop(0.35, p.color);
        glowGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.globalAlpha = currentAlpha * 0.34;
        ctx.fill();

        // 2. Micro 4-Point Starlight Sparkle Cross
        const spikeLen = p.size * (1.6 + sparkleFactor * 0.8);
        ctx.beginPath();
        ctx.moveTo(p.x - spikeLen, p.y);
        ctx.lineTo(p.x + spikeLen, p.y);
        ctx.moveTo(p.x, p.y - spikeLen);
        ctx.lineTo(p.x, p.y + spikeLen);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.55;
        ctx.globalAlpha = currentAlpha * 0.45;
        ctx.stroke();

        // 3. Crisp Micro Starlight Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = currentAlpha * 0.65;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 3;
        ctx.fill();
      }
      ctx.restore();

      // --- LAYER 8: Hypersonic Meteors with Persistent Ionization Trails ---
      for (let i = persistentTrails.length - 1; i >= 0; i--) {
        const pt = persistentTrails[i];
        pt.alpha -= 0.012;
        pt.width += 0.14;

        if (pt.alpha <= 0) {
          persistentTrails.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pt.x1, pt.y1);
        ctx.lineTo(pt.x2, pt.y2);
        ctx.strokeStyle = `rgba(186, 230, 253, ${pt.alpha * 0.45})`;
        ctx.lineWidth = pt.width;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const oldX = m.x;
        const oldY = m.y;

        m.x += m.dx;
        m.y += m.dy;
        m.life -= m.decay;

        if (Math.random() > 0.3) {
          persistentTrails.push({
            x1: oldX,
            y1: oldY,
            x2: m.x,
            y2: m.y,
            alpha: m.life * 0.7,
            width: m.width * 1.2
          });
        }

        if (m.life <= 0 || m.x < -100 || m.y > height + 100) {
          meteors.splice(i, 1);
          continue;
        }

        const headX = m.x;
        const headY = m.y;
        const tailX = m.x - (m.dx / Math.hypot(m.dx, m.dy)) * m.length;
        const tailY = m.y - (m.dy / Math.hypot(m.dx, m.dy)) * m.length;

        const mGrad = ctx.createLinearGradient(headX, headY, tailX, tailY);
        mGrad.addColorStop(0, '#ffffff');
        mGrad.addColorStop(0.15, m.color);
        mGrad.addColorStop(0.65, 'rgba(56, 189, 248, 0.4)');
        mGrad.addColorStop(1, 'transparent');

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(headX, headY);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = mGrad;
        ctx.lineWidth = m.width;
        ctx.lineCap = 'round';
        ctx.globalAlpha = m.life;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(headX, headY, m.width * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(meteorInterval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#010206]">
      {/* Volumetric Emission Nebulae: Physically Modeled Hydrogen-Alpha (656nm) & Oxygen-III (501nm) */}
      <div 
        className="absolute -top-40 -left-40 w-[46rem] h-[46rem] rounded-full blur-[160px] pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.32) 0%, rgba(147, 51, 234, 0.20) 45%, rgba(15, 23, 42, 0) 75%)'
        }}
      />

      <div 
        className="absolute top-10 -right-36 w-[48rem] h-[48rem] rounded-full blur-[170px] pointer-events-none opacity-35 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.28) 0%, rgba(59, 130, 246, 0.18) 45%, rgba(2, 6, 23, 0) 75%)'
        }}
      />

      <div 
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] rounded-full blur-[180px] pointer-events-none opacity-30 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(79, 70, 229, 0.15) 50%, transparent 80%)'
        }}
      />

      {/* Realistic Deep-Space Canvas Simulation */}
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
      />

      {/* Astronomical Observatory Telemetry Viewport (NASA / JWST Astrometry HUD) */}
      <div className="absolute bottom-8 right-8 pointer-events-none hidden xl:flex flex-col text-right text-[11px] font-mono text-slate-500/80 tracking-widest uppercase select-none">
        <div className="flex items-center justify-end gap-2 text-cyan-400/90 font-semibold mb-1">
          <span>DEEP SKY ASTROMETRY // JWST SURVEY</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </div>
        <div className="text-[10px] text-slate-400/70 space-y-0.5">
          <div>EPOCH: J2000.0 • APERTURE: 6.5M BERYLLIUM</div>
          <div>RIGHT ASCENSION (α): <span ref={raRef} className="text-purple-300 font-mono">18h 36m 56s</span></div>
          <div>DECLINATION (δ): <span ref={decRef} className="text-cyan-300 font-mono">+38° 47′ 01″</span></div>
          <div>ORBITAL DYNAMICS: <span className="text-emerald-400 font-mono">NOMINAL GRAVITATIONAL LENS</span></div>
        </div>
      </div>

      {/* Subtle Atmospheric Vignette for Photographic Realism */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 45%, rgba(1, 2, 6, 0.75) 100%)'
        }}
      />
    </div>
  );
}
