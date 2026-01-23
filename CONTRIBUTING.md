# Contributing to Portfolify

Thank you for your interest in contributing to Portfolify! 🎉

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, Node version, etc.)

### Suggesting Features

We love new ideas! Please create an issue with:
- A clear description of the feature
- Why it would be useful
- Any implementation ideas

### Pull Requests

1. **Fork the repository**
2. **Create a branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test your changes**: Ensure everything works
5. **Commit**: `git commit -m 'Add amazing feature'`
6. **Push**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

## Development Setup

```bash
# Clone the repository
git clone https://github.com/halloffame12/portfolify.git
cd portfolify

# Install dependencies for all packages
npm install

# Build the CLI
npm run build:cli

# Run the template in development
npm run dev:template

# Run the landing site
npm run dev:landing
```

## Project Structure

```
portfolify/
├── packages/
│   ├── cli/          # CLI package
│   ├── template/     # Portfolio template
│   └── landing/      # Landing website
└── package.json      # Root package.json
```

## Code Style

- Use TypeScript for type safety
- Follow existing code formatting
- Write meaningful commit messages
- Add comments for complex logic

## Adding New Themes

To add a new theme, update `packages/cli/src/prompts/index.ts`:

1. Add a new `ThemeConfig` entry to the `themes` array
2. Define unique colors (HSL values), typography, and layout options
3. Categories: `developer`, `designer`, `salon`, `photographer`, `startup`
4. Test the theme with: `npx portfolify my-test --theme <your-theme>`
5. Update documentation with the new theme

## Testing

Before submitting a PR:

1. Build the CLI: `cd packages/cli && npm run build`
2. Test CLI generation: `npx portfolify test-portfolio --yes`
3. Test each theme: `npx portfolify test --theme developer|designer|salon|photographer|startup`
4. Verify the generated portfolio runs: `cd test-portfolio && npm run dev`
5. Check all themes visually
6. Test on different screen sizes
7. Validate SEO tags

## Questions?

Feel free to open an issue for any questions or join our discussions!

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to build something great together.

---

Thank you for contributing to Portfolify! ❤️
