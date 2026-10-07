# Secure Admin — Netlify

Deploy this folder to Netlify.

Netlify environment variables (NO VITE_ prefix):
GITHUB_OWNER = your GitHub username
GITHUB_REPO = website-redirect-config
GITHUB_BRANCH = main
GITHUB_CONFIG_PATH = config.json
GITHUB_TOKEN = your new fine-grained GitHub token
ADMIN_PASSWORD = a strong password you choose

The GitHub token is used only by the Netlify serverless function and is NOT bundled into browser JavaScript.

Admin login sends the admin password over HTTPS to the function. Use a strong unique password.

After deployment, Website 1 should set:
VITE_CONFIG_URL=https://YOUR-ADMIN-SITE.netlify.app/.netlify/functions/config

The public GET returns only the redirect settings; the GitHub token is never returned.
