# Abdul Azeem Shaik — Portfolio

Personal portfolio site built with React, TypeScript, Tailwind CSS, and Vite.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Deploy to Netlify

### Option 1: Git-based deploy (recommended)

1. Push this `Portfolio` folder to a GitHub repository.
2. Log in to [Netlify](https://app.netlify.com) → **Add new site** → **Import an existing project**.
3. Connect your GitHub repo.
4. Netlify reads settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**.

Every push to your main branch will trigger a new deploy.

### Option 2: Manual drag-and-drop

```bash
npm install
npm run build
```

Drag the `dist` folder onto the Netlify dashboard under **Sites → Add new site → Deploy manually**.

## Customize content

Edit `src/data/profile.ts` to update experience, skills, links, and copy.

## Project structure

```
Portfolio/
├── public/           # Static assets (CV PDF, favicon)
├── src/
│   ├── components/   # UI sections
│   ├── data/         # Profile content
│   └── App.tsx
├── netlify.toml      # Netlify build config
└── package.json
```
