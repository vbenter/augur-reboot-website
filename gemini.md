# Gemini Development Guide for Tease Project

This guide provides instructions for developing, building, and deploying the Tease static website.

## Project Overview

This is a static website built with [Astro](https://astro.build/) and designed for deployment on [Cloudflare Pages](https://pages.cloudflare.com/).

- **Framework:** Astro
- **Deployment:** Cloudflare Pages
- **Package Manager:** npm

## Development

To start the local development server, run the following command:

```bash
npm run dev
```

This will start a hot-reloading development server, typically at `http://localhost:4321`.

## Building

To build the website for production, run:

```bash
npm run build
```

This will create a `dist/` directory with the optimized, static assets of your website.

## Deployment

This project is configured for Cloudflare Pages. To deploy the website, run:

```bash
npm run deploy
```

This command will first build the project and then deploy it to Cloudflare using Wrangler.

## Project Structure

Here is a brief overview of the key files and directories:

- `astro.config.mjs`: Astro configuration file. It's set up to use the Cloudflare adapter.
- `package.json`: Defines project scripts and dependencies.
- `wrangler.jsonc`: Configuration for the Wrangler CLI, used for Cloudflare deployment.
- `src/`: Contains the source code for the website.
  - `src/pages/`: Contains the pages of the website. Each `.astro` file in this directory becomes a page.
  - `src/layouts/`: Contains layout components for pages.
  - `src/components/`: Contains reusable Astro components.
  - `src/assets/`: Contains static assets like images and stylesheets.
- `public/`: Contains static assets that don't need to be processed, like `favicon.ico` or `robots.txt`.
