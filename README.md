# Augur Reboot Website

This repository contains the source code for the teaser website announcing the reboot of the Augur prediction market. The site serves as a retro-futuristic landing page showcasing the redevelopment of Augur and offering a glimpse into the future of decentralized forecasting.

The future home of the Augur platform will be: **[https://augur.net](https://augur.net)**

---

## Technical Architecture

This is a modern static website built with cutting-edge web technologies:

- **Astro 5.10+** - Static site generator with selective client-side hydration
- **React 19** - Interactive components with concurrent features
- **Tailwind CSS 4.1** - Utility-first styling with @theme directive approach
- **TypeScript** - Full type safety across components and utilities
- **Nanostores** - Lightweight state management for cross-component communication

### Deployment Strategy

The project supports dual deployment to maximize reach and reliability:

- Cloudflare Pages with Wrangler integration
- GitHub Pages with automated syncing from main branch

## Key Features

- **Retro-Futuristic Design**: CRT monitor aesthetics with power-on/off animations
- **3D Perspective Grid**: WebGL-powered animated tunnel background
- **Interactive Intro Sequence**: Terminal-style typewriter effects with smart skip functionality
- **View Transitions**: Smooth page navigation with animation continuity
- **Responsive Layout**: Optimized for desktop and mobile experiences
- **Performance Optimized**: Static-first with selective hydration for interactivity

## Project Structure

```
src/
├── components/           # React and Astro components
│   ├── *.astro          # Server-rendered static components
│   └── *.tsx            # Client-hydrated interactive components
├── pages/               # Route definitions
│   ├── index.astro      # Landing page with intro sequence
│   ├── mission.astro    # Technical roadmap
│   └── team.astro       # Team information
├── layouts/             # Base page layouts
├── stores/              # Nanostores state management
├── styles/              # Tailwind CSS with custom utilities
└── assets/              # Static SVGs and resources
```

## Development

### Prerequisites

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Setup

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

### Development Commands

All commands are run from the root of the project:

| Command           | Action                                                    |
| :---------------- | :-------------------------------------------------------- |
| `npm run dev`     | Starts development server at `localhost:4321`            |
| `npm run build`   | Builds production site to `./dist/`                      |
| `npm run preview` | Builds and previews with Wrangler (Cloudflare)          |
| `npm run deploy`  | Deploys to Cloudflare Pages                              |
| `npm run cf-typegen` | Generates Cloudflare Worker types                     |

### Development Workflow

The development server provides:
- Hot module replacement for rapid iteration
- TypeScript checking and error reporting
- Tailwind CSS compilation with custom utilities
- React component hydration in development mode

For development questions or issues, refer to the project documentation in the `docs/` directory or check the component implementations for usage patterns.

### Styling System

The project uses Tailwind CSS 4.1 with a CSS-first approach:

- **Global Styles**: Located in `src/styles/global.css`
- **Theme Configuration**: Uses `@theme` directive instead of config files
- **Custom Utilities**: Defined with `@utility` directive
- **Component Styles**: Scoped styles within Astro components

## Deployment

### Dual Deployment Architecture

This project maintains two deployment targets:

**Main Branch (Cloudflare Pages)**:
- Primary deployment target
- Uses `@astrojs/cloudflare` adapter
- Optimized for edge computing and global CDN
- Supports server-side rendering capabilities

**GitHub Pages Branch**:
- Automatically synced from main via GitHub Actions
- Static site deployment with different base path configuration
- Provides fallback hosting option
- Uses GitHub's global CDN infrastructure

### Automatic Syncing

Changes to the main branch trigger an automated workflow that:
1. Syncs source code changes to the `gh-pages` branch
2. Preserves deployment-specific configurations
3. Maintains both deployment targets without manual intervention
4. Ensures consistency across both hosting platforms

### Manual Deployment

To deploy manually to Cloudflare Pages:
```sh
npm run deploy
```
