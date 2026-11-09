# Khadija Ennaifer — Portfolio

A responsive dark portfolio starter built with React, Vite, Framer Motion and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

## Before publishing

1. Email, LinkedIn, GitHub and photo are already set. Your CV is in `public/cv.pdf` (replace the file to update it, or set `CV_URL = null` in `src/main.jsx` to hide the button).
2. Replace the LinkedIn and GitHub placeholder links with your real profiles.
3. Add your portrait to `public/portrait.jpg`, then replace the `.portrait-placeholder` block in `src/main.jsx` with:
   ```jsx
   <img className="portrait-image" src="/portrait.jpg" alt="Khadija Ennaifer" />
   ```
   and add `.portrait-image { width:100%; height:430px; object-fit:cover; object-position:center; }` to `src/styles.css`.
4. Add your CV PDF to `public/` and add a download link if desired.
5. Review all project descriptions and internship wording before making the site public. Keep Airbus work at a public, non-confidential level.

## Build

```bash
npm run build
```

The production site is generated in `dist/`.
