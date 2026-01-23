# 🚀 Portfolify

<div align="center">

![npm version](https://img.shields.io/npm/v/portfolify)
![npm downloads](https://img.shields.io/npm/dm/portfolify)
![license](https://img.shields.io/npm/l/portfolify)
![node](https://img.shields.io/node/v/portfolify)

**Generate stunning, production-ready portfolio websites in seconds.**

[Quick Start](#-quick-start) • [Themes](#-themes) • [Features](#-features) • [Documentation](#-documentation)

</div>

---

## ✨ What is Portfolify?

Portfolify is a powerful CLI tool that generates beautiful, customizable portfolio websites tailored for different professions. Whether you're a developer, designer, photographer, salon owner, or startup founder — Portfolify creates a unique, professional website for you in seconds.

```bash
npx portfolify my-portfolio
```

That's it! Answer a few questions and your portfolio is ready.

---

## 🚀 Quick Start

### Using npx (Recommended)

```bash
npx portfolify my-portfolio
```

### Global Installation

```bash
npm install -g portfolify
portfolify my-portfolio
```

### Quick Generation (Skip Prompts)

```bash
npx portfolify my-portfolio --yes --theme developer
```

---

## 🎨 Themes

Choose from 5 professionally designed themes, each with unique layouts, color schemes, and typography:

| Theme | Best For | Hero Style | Special Features |
|-------|----------|------------|------------------|
| 🖥️ **Developer** | Software Engineers, Full-Stack Devs | Centered | Terminal aesthetic, monospace fonts, code-inspired design |
| 🎨 **Designer** | UI/UX Designers, Creatives | Asymmetric | Bold gradients, creative layouts, portfolio showcase |
| 💅 **Salon** | Beauty, Spa, Wellness | Fullscreen | Elegant typography, booking CTA, service highlights |
| 📸 **Photographer** | Photographers, Visual Artists | Fullscreen | Gallery-focused, minimal UI, image-first design |
| 🚀 **Startup** | Founders, Entrepreneurs | Split | Modern SaaS style, metrics display, investor-ready |

### Theme Preview

```bash
# Developer - Clean, code-inspired design
npx portfolify dev-portfolio --theme developer --yes

# Designer - Bold, creative aesthetic
npx portfolify design-portfolio --theme designer --yes

# Salon - Elegant, luxurious feel
npx portfolify spa-portfolio --theme salon --yes

# Photographer - Gallery-focused, minimal
npx portfolify photo-portfolio --theme photographer --yes

# Startup - Modern, professional
npx portfolify startup-portfolio --theme startup --yes
```

---

## 🌟 Features

### 🎯 Core Features

- **5 Unique Themes** — Professionally designed for different industries
- **Interactive CLI** — Guided setup with smart defaults
- **Zero Config** — Works out of the box, no setup required
- **TypeScript** — Full type safety throughout

### 🎨 Design & UI

- **Responsive Design** — Looks great on all devices
- **Dark/Light Mode** — Built-in theme toggle
- **Glassmorphism Effects** — Modern, trendy UI elements
- **Smooth Animations** — Powered by Framer Motion
- **Custom Typography** — Google Fonts optimized per theme

### 🔍 SEO & Performance

- **SEO Optimized** — Meta tags, Open Graph, Twitter Cards
- **Sitemap Generation** — Automatic sitemap.xml
- **Robots.txt** — Search engine friendly
- **Fast Loading** — Optimized assets and lazy loading

### 📝 Content & Blogging

- **MDX Blog Support** — Write blog posts in Markdown + JSX
- **Code Highlighting** — Syntax highlighting for code blocks
- **Sample Content** — Pre-filled content based on theme

### 📦 What Gets Generated

```
my-portfolio/
├── public/
│   ├── sitemap.xml          # SEO sitemap
│   └── robots.txt           # Search engine config
├── src/
│   ├── components/
│   │   ├── Hero.tsx         # Theme-aware hero section
│   │   ├── Projects.tsx     # Portfolio/work showcase
│   │   ├── Skills.tsx       # Skills/expertise display
│   │   ├── Blog.tsx         # Blog post listing
│   │   ├── Footer.tsx       # Contact & social links
│   │   ├── SEO.tsx          # Meta tags component
│   │   └── ThemeToggle.tsx  # Dark/light mode
│   ├── config/
│   │   └── portfolio.json   # Your portfolio data
│   ├── content/
│   │   └── blog/            # MDX blog posts
│   └── styles/
│       └── globals.css      # Theme-specific styles
├── LICENSE                   # MIT License
├── CONTRIBUTING.md          # Contribution guide
├── README.md                # Project documentation
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 🛠️ CLI Options

```bash
portfolify <project-name> [options]
```

### Options

| Option | Description |
|--------|-------------|
| `-y, --yes` | Skip prompts and use defaults |
| `-t, --theme <theme>` | Choose theme: `developer`, `designer`, `salon`, `photographer`, `startup` |
| `-h, --help` | Display help |
| `-V, --version` | Display version |

### Examples

```bash
# Interactive mode (recommended for first-time users)
npx portfolify my-portfolio

# Quick start with developer theme
npx portfolify my-portfolio --yes --theme developer

# Create a photography portfolio
npx portfolify photo-gallery --theme photographer -y

# Create a salon/spa website
npx portfolify beauty-spa --theme salon --yes
```

---

## 📖 Documentation

### Customizing Your Portfolio

After generation, edit `src/config/portfolio.json` to customize:

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "bio": "Your bio here...",
  "avatar": "/avatar.jpg",
  "social": {
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "twitter": "https://twitter.com/username"
  },
  "skills": ["React", "TypeScript", "Node.js"],
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description",
      "tech": ["React", "Tailwind"],
      "github": "https://github.com/...",
      "live": "https://..."
    }
  ]
}
```

### Adding Blog Posts

Create MDX files in `src/content/blog/`:

```mdx
---
title: "My First Post"
date: "2024-01-15"
description: "A great blog post"
---

# Hello World

This is my first blog post!
```

### Development

```bash
cd my-portfolio
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Deployment

Your portfolio is ready to deploy on:

- **Vercel** — `vercel`
- **Netlify** — `netlify deploy`
- **GitHub Pages** — Push to `gh-pages` branch
- **Any static host** — Upload the `dist` folder

---

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite 5 | Build Tool |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| MDX | Blog Content |
| Lucide Icons | Icon Library |

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](https://github.com/halloffame12/portfolify/blob/main/CONTRIBUTING.md) for details.

```bash
# Clone the repo
git clone https://github.com/halloffame12/portfolify.git

# Install dependencies
cd portfolify
npm install

# Build the CLI
cd packages/cli
npm run build

# Test locally
node dist/index.js test-portfolio --yes
```

---

## 📄 License

MIT © [Sumit](https://github.com/halloffame12)

---

## 🌟 Star History

If you find Portfolify helpful, please consider giving it a star! ⭐

---

<div align="center">

**Made with ❤️ by [Sumit](https://github.com/halloffame12)**

[Report Bug](https://github.com/halloffame12/portfolify/issues) • [Request Feature](https://github.com/halloffame12/portfolify/issues)

</div>
