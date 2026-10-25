<div align="center">

# Riflan Mohamed: Portfolio

**Software Engineer & AI Developer** · Full-stack · Real-time systems

[![Live](https://img.shields.io/badge/Live-rizlan.me-EAB308?style=for-the-badge&logo=googlechrome&logoColor=white)](https://rizlan.me)
&nbsp;
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
&nbsp;
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
&nbsp;
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

<br/>

![Portfolio preview](./preview.png)

</div>

---

## Overview

My personal portfolio: a fast, animated, fully responsive single-page site that showcases my work in full-stack engineering and applied AI. Built from scratch with React 19 + TypeScript + Vite and Tailwind CSS v4, with motion handled by the `framer-motion` library and buttery scrolling via Lenis.

**Live:** [rizlan.me](https://rizlan.me)

## ✨ Features

- **Editorial hero**: my name as rising condensed type beside my portrait, with quick links to my work and CV.
- **Services, about and journey** sections with count-up stats, an interactive service list and my experience and education.
- **Stacking split project cards** that pin as you scroll, plus an expandable list of every project.
- **Certifications grid** showing the latest four, with "see all" and a full-size certificate viewer.
- **"How I build" process grid**, FAQ accordion, WhatsApp link and a contact form that opens your email app with the message ready.
- **Light / dark theme** in royal blue on warm paper or warm black, switchable from the navbar and respecting system preference.
- **Fully responsive** from 320px phones to large desktops, with smooth scrolling (Lenis) and reduced-motion support.

## 🛠️ Tech Stack

| Area | Tools |
|---|---|
| **Core** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS v4, shadcn-style components, `class-variance-authority` |
| **Animation** | framer-motion, Lenis (smooth scroll) |
| **UI / Icons** | Lucide, Devicon, custom brand icons |
| **Tooling** | ESLint, TypeScript strict mode |

## 🚀 Getting Started

> Requires **Node.js 20+**.

```bash
# clone
git clone https://github.com/RizAhd/Portfolio-Updated.git
cd Portfolio-Updated

# install
npm install

# run the dev server (http://localhost:5173)
npm run dev

# production build
npm run build

# preview the production build
npm run preview
```

## 📁 Project Structure

```
src/
├── App.tsx                  # Page composition
├── data/portfolio.ts        # All content (profile, projects, skills, …)
├── hooks/                   # theme, smooth-scroll, screen-size, parallax
├── components/
│   ├── navbar.tsx
│   ├── sections/            # hero-adjacent sections: about, projects, quote,
│   │                        #   skills, resume, education, ask-me, contact
│   └── ui/                  # reusable animated components & primitives
└── index.css                # theme tokens (light/dark) + global styles
```

## 🌐 Deployment

Deployed to **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`, served from the custom domain **rizlan.me** (see `public/CNAME`).

## 📫 Connect

- 🌐 Portfolio: [rizlan.me](https://rizlan.me)
- 💼 LinkedIn: [linkedin.com/in/riflan](https://www.linkedin.com/in/riflan/)
- 🐙 GitHub: [github.com/RizAhd](https://github.com/RizAhd)
- ✉️ Email: rizlanahmd4545@gmail.com

---

<div align="center">

Built by **Riflan Mohamed**. © 2026

</div>
