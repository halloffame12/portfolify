# 🚀 Publishing & Deployment Guide

This guide covers how to:
1. **Update your portfolio details** locally.
2. **Publish the Portfolify CLI to npm** so anyone can use `npx portfolify`.
3. **Deploy your portfolio and the landing site** to Vercel and Render.

---

## 👤 1. Update Your Portfolio Configuration

Since you've already generated a test portfolio (`my-test-portfolio`), you can update its configuration directly.

### File: `my-test-portfolio/src/config/portfolio.json`

Open this file and update it with your details:

```json
{
  "name": "Sumit",
  "role": "Full Stack Developer",
  "bio": "Building amazing things independently.",
  "social": {
    "github": "halloffame12",
    "linkedin": "sumit-chauhan-a4ba98325"
  },
  // ... keep other settings
}
```

Wait, the `linkedin` field in `portfolio.json` usually expects just the username/slug, not the full URL.
**Update:**
```json
"linkedin": "sumit-chauhan-a4ba98325"
```
(The template constructs the URL as `linkedin.com/in/{username}`)

---

## 📦 2. Publish Portfolify CLI to npm

To let anyone run `npx portfolify`, you need to publish the `packages/cli` to the npm registry.

### Prerequisites
- An account on [npmjs.com](https://www.npmjs.com/).
- Verify your email on npm.

### Publishing Steps

1. **Login to npm** in your terminal:
   ```bash
   npm login
   ```
   Follow the browser prompt to authenticate.

2. **Navigate to the CLI package**:
   ```bash
   cd d:\CliProject\portfolify\packages\cli
   ```

3. **Ensure `package.json` is ready**:
   - Name must be unique on npm (e.g., `@halloffame12/portfolify` or check if `portfolify` is taken. If taken, rename in `package.json`).
   - Version should be `1.0.0` or higher.

4. **Build and Publish**:
   ```bash
   npm run build
   npm publish --access public
   ```
   *(Use `--access public` if using a scoped package like `@username/pkg`)*

**Note on Name Conflict:** `portfolify` might be taken. Consider renaming to `portfolify-cli` or `@halloffame12/portfolify` in `packages/cli/package.json` before publishing.

---

## 🚀 3. Deploy Your Portfolio (Vercel)

Vercel is the best place to host React/Vite apps.

### Option A: Drag & Drop (Easiest)
1. Run `npm run build` in your portfolio folder (`my-test-portfolio`).
2. This creates a `dist` folder.
3. Go to [vercel.com](https://vercel.com/dashboard).
4. Drag the `dist` folder onto the dashboard.
5. Vercel will deploy it instantly.

### Option B: Via GitHub (Recommended)
1. Push your generated portfolio to a GitHub repository.
   ```bash
   cd my-test-portfolio
   git remote add origin https://github.com/halloffame12/my-new-portfolio.git
   git branch -M main
   git push -u origin main
   ```
2. Go to Vercel Dashboard -> **Add New...** -> **Project**.
3. Import your GitHub repository.
4. Keep default settings (Framework: Vite).
5. Click **Deploy**.

---

## ☁️ 4. Deploy Landing Site (Render)

Render is great for static sites too.

1. **Push the entire `portfolify` monorepo** to GitHub (or just the landing package).
2. Go to [dashboard.render.com](https://dashboard.render.com/).
3. Click **New +** -> **Static Site**.
4. Connect your GitHub repository.
5. **Settings**:
   - **Root Directory**: `packages/landing`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
6. Click **Create Static Site**.

---

## 🌍 Global Availability

Once published to npm:

Anyone can run:
```bash
npx @halloffame12/portfolify my-portfolio
# (Replace with your actual package name)
```

Congratulations! You are now an open-source tool author! 🎉
