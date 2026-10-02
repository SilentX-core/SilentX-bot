# GitHub Pages frontend

## Files
Upload all files in this folder to the ROOT of your GitHub repository:
- index.html
- login.html
- style.css
- app.js
- config.js

## Configure backend
Edit `config.js` and replace:
`https://YOUR-HIDDENCLOUD-DOMAIN`
with your actual HiddenCloud backend HTTPS URL. Do not add a trailing slash.

## Publish
Repository → Settings → Pages → Deploy from a branch → main → /(root) → Save.

## Important
GitHub Pages only hosts the frontend. Discord/Telegram bots, API, secrets and both SQLite databases stay on HiddenCloud.
The backend must allow CORS from your exact GitHub Pages origin and support credentialed requests/cookies:
- Access-Control-Allow-Origin: your exact https://username.github.io origin (not *)
- Access-Control-Allow-Credentials: true
- Cookie: Secure; HttpOnly; SameSite=None
- Handle OPTIONS preflight requests.
Never put bot tokens, admin passwords or SECRET_KEY in this repository.
