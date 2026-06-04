# Static Portfolio Website (Vue 3 + Vite)

A modern, responsive, and lightweight static portfolio website built using Vue 3, Tailwind CSS v4, and Vite. All content is powered by local JSON files under `src/data` (no backend required).

## Features

- **Multilingual Support**: Fully localized in English (EN) and Indonesian (ID) using `vue-i18n`.
- **Theme Engine**: Light, Dark, and System theme synchronizations.
- **3D Hero Animation**: Interactive 3D glass morphing orb in the Hero section, built with `TresJS` (Three.js for Vue) and custom shaders, with automatic WebGL detection and 2D CSS gradient bubble fallback.
- **Bento Grid Projects Showcase**: Categorized portfolio showcase with responsive bento-style layouts and detailed overview modals.
- **Core Skills Progress**: Fully static technology stack grids displaying expertise levels with clean horizontal progress bars.
- **Interactive Work Experience**: Chronological timeline displaying job details and company logos with zoom-in Lightbox modals.
- **Unified Contact Deck**: Symmetrical 3-card footer layout (Email, WhatsApp, Socials) with direct CTAs, copy-to-clipboard actions, and a live availability indicator.

## Technology Stack

- **Framework**: Vue 3 (Composition API)
- **Bundler & Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4
- **State Management**: Pinia (stores for language, theme, and data)
- **Localization**: Vue I18n 11
- **3D Render**: TresJS & Three.js
- **Utility**: VueUse

## Project Setup

### Prerequisites

Ensure you have Node.js (v18+ recommended) and npm installed.

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Development

Run the local development server with hot-reload:

```bash
npm run dev
```

### Production Build

Compile and minify the project for production:

```bash
npm run build
```

The output build files will be generated inside the `dist/` directory, ready to be served statically on platforms like GitHub Pages, Vercel, Netlify, or similar services.

## Data Configuration

All portfolio content is stored as local static data. To customize the text, logos, projects, or work history, modify the JSON files in the `src/data` directory:

- `profile.json`: General bio, photo links, and metadata.
- `about.json`: Profile narrative text and philosophies.
- `skills.json`: Technology lists, proficiency ratings, and icons.
- `projects.json`: Projects showcase items, descriptions, and tag assets.
- `experiences.json`: Professional career timeline points and achievements.
- `certifications.json`: Certification list, credential links, and PDF files.
- `socials.json`: URLs to external networking profiles.
