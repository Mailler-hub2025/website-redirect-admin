# Admin Panel — Netlify

This panel updates `config.json` in a GitHub repository through the GitHub Contents API.

IMPORTANT: A GitHub token embedded in a browser app is not a secure production secret. For a personal/testing setup, use a narrowly-scoped fine-grained token and a private admin deployment. For a production public admin panel, move the GitHub API call to a serverless function so the token is never exposed to the browser.

Build:
npm install
npm run build

Netlify environment variables:
VITE_GITHUB_OWNER
VITE_GITHUB_REPO
VITE_GITHUB_BRANCH
VITE_CONFIG_PATH
VITE_GITHUB_TOKEN
