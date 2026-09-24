# 🚀 Selva Guru Karthikeyan P - Software Engineer Portfolio

A futuristic, high-performance, and visually immersive developer portfolio website designed for **Selva Guru Karthikeyan P**.

Built with **React 19**, **Vite 8**, and **Tailwind CSS v4**, featuring interactive 3D particle physics, a functional developer terminal CLI (*GuruShell*), live code runner simulation, audio micro-interactions via Web Audio API, project architecture inspection modals, and direct contact dispatch with confetti celebrations.

---

## ✨ Standout Features

- 🌌 **Interactive Constellation Canvas**: High-performance HTML5 Canvas particle background with cursor repulsion and ambient nebula lighting.
- ⚡ **Dynamic Role Switcher**: Smooth multi-role typewriter headline animation.
- 💻 **Interactive IDE Simulation**: Live TypeScript code viewer with instant test simulation and clipboard copy.
- 🖥️ **GuruShell Terminal v2.4**: Built-in developer CLI supporting commands like `help`, `about`, `skills`, `projects`, `sudo hire`, `matrix`, `contact`, and arrow-key history.
- 🛠️ **Dynamic Skills Matrix**: Filterable skills catalog with real-time level indicators and custom tool categorizations.
- 📁 **Flagship Projects Showcase**: High-impact project cards with architecture inspection modal, live metrics, tech tags, and code links.
- 📜 **Interactive CV / Resume Modal**: In-browser resume viewer with instant print / PDF export and formatted plain-text copy.
- 🔊 **Web Audio Synthesizer**: Subtle, non-intrusive futuristic cyber sound effects generated via native Web Audio API (with mute toggle).
- 📬 **Interactive Contact Dispatch**: Functional form with client validation, email clipboard copy toast, and confetti explosion celebration.
- 📱 **100% Responsive & Accessible**: Flawless experience across 4K displays, laptops, tablets, and smartphones.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Custom Neon Glassmorphism
- **Icons**: Lucide React + Custom SVG Brand Badges
- **Effects**: HTML5 Canvas Particle Engine + Canvas-Confetti
- **Audio**: Native Web Audio API Sound Synthesizer
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*)

---

## 🚀 Getting Started Locally

In the project folder `C:\Users\hp\OneDrive\Desktop\portfolio`:

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` to see your portfolio live.

### 3. Build for Production
```bash
npm run build
```
This generates an optimized static bundle in the `dist/` directory ready for deployment.

---

## 🌐 How to Deploy as a Website

This portfolio builds into clean static assets in the `dist/` directory, meaning you can deploy it anywhere for **100% free**:

### Option 1: Deploy to Vercel (Recommended & Easiest)
1. Push your folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Selva Guru Karthikeyan P Portfolio"
   git remote add origin https://github.com/SelvaGuruKarthikeyan/portfolio.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **"Add New" > "Project"**, select your `portfolio` repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **"Deploy"**. Your website will be live with an SSL certificate and free domain (e.g. `selva-guru-karthikeyan.vercel.app`) in under 60 seconds!

### Option 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com).
2. Drag and drop the `dist` folder into the Netlify dashboard, or link your GitHub repository.
3. Build command: `npm run build`, Publish directory: `dist`.
4. Click **Deploy Site**.

### Option 3: Deploy to GitHub Pages
1. Install `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```
2. In `package.json`, add:
   ```json
   "homepage": "https://<your-username>.github.io/<repo-name>",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run `npm run deploy`.

---

## ✏️ Customizing Your Details

All personal details, project descriptions, skills, social links, and experience data are centralized in:
📂 `src/data/portfolioData.js`

To update your email, links, or add new projects, simply edit this file and save!
