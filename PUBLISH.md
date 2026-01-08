# 🌍 How to Publish Portfolify and Go Live

Follow these exact steps to make your project available to the world!

## 1. Prepare Your CLI name

The name `portfolify` is likely already taken on npm. You should use a unique name.

1. **Open `packages/cli/package.json`**
   - I have already renamed it to `@halloffame12/portfolify` for you! ✅

## 2. Login to npm

Open your terminal and run:

```bash
npm login
```
(You have already done this! ✅)

## 3. Publish the CLI (The "Backend")

Run these commands to build and publish your tool to npm:

```bash
cd packages/cli
npm run build
npm publish --access public
```

🎉 **Success!** Now anyone in the world can run:
```bash
npx @halloffame12/portfolify my-portfolio
```
*(Replace with whatever name you chose in step 1)*

---

## 4. Deploy the Landing Website (The "Frontend")

This is the website where people will see your tool.

### Using Render (Free & Easy)

1. **Push your code to GitHub**:
   ```bash
   cd d:\CliProject\portfolify
   git init
   git add .
   git commit -m "Ready to publish"
   # Create a repo on GitHub.com called 'portfolify'
   git remote add origin https://github.com/halloffame12/portfolify.git
   git push -u origin main
   ```

2. **Go to [render.com](https://dashboard.render.com/)**:
   - Create New **Static Site**
   - Connect your GitHub repo
   - **Root Directory**: `packages/landing`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - Click **Create Static Site**

Render will give you a URL like `portfolify.onrender.com`.

---

## 5. Update Your GitHub Profile

Add your new tool to your GitHub profile!

1. Edit your profile README or pinned items.
2. Link to your Landing Website.
3. Show off the command: `npx @halloffame12/portfolify`

You are now a published open-source developer! 🚀
