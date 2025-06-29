# Augur Website (Teaser)

This repository contains the source code for the teaser website for the upcoming reboot of the Augur prediction market. The live site serves as a landing page to announce the redevelopment of Augur, offering a glimpse into the future of decentralized forecasting.

The future home of the Augur platform will be: **[https://augur.net](https://augur.net)**

---

## 🚀 Project Overview

This is a static website built with [Astro](https://astro.build/) and is designed for deployment on [Cloudflare Pages](https://pages.cloudflare.com/). Its purpose is to provide a temporary, informative landing page while the full Augur platform is under development.

## 💻 Development

To get started with local development, follow the instructions below.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Setup

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

### Commands

All commands are run from the root of the project in a terminal:

| Command         | Action                                             |
| :-------------- | :------------------------------------------------- |
| `npm run dev`   | Starts the local development server at `localhost:4321`. |
| `npm run build` | Builds the production-ready site to the `./dist/` directory. |
| `npm run deploy`| Deploys the website to Cloudflare Pages.           |

## ☁️ Deployment

This project is configured for continuous deployment to [Cloudflare Pages](https://pages.cloudflare.com/). A new version can be deployed by running the appropriate deployment command.

To deploy manually, run:
```sh
npm run deploy
```