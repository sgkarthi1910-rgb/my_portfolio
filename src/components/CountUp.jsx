import React, { useEffect, useState, useRef } from 'react';

export default function CountUp({ endVal, duration = 1600 }) {
  const [val, setVal] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Parse numeric part and suffix
          const match = endVal.match(/^([\d.]+)(.*)$/);
          if (!match) {
            setVal(endVal);
            return;
          }

          const targetNum = parseFloat(match[1]);
          const suffix = match[2] || "";
          const isDecimal = match[1].includes(".");
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);

            const currentNum = targetNum * ease;
            setVal(
              (isDecimal ? currentNum.toFixed(1) : Math.floor(currentNum).toString()) +
                suffix
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setVal(endVal);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [endVal, duration, hasAnimated]);

  return <span ref={elementRef}>{val}</span>;
}
