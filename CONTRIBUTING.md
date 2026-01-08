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

To add a new theme:

1. Add theme definition in `packages/cli/src/themes/index.ts`
2. Use HSL color values for Tailwind CSS variables
3. Test the theme with a generated portfolio
4. Update documentation

## Testing

Before submitting a PR:

1. Test CLI generation: `node dist/index.js test-portfolio`
2. Verify the generated portfolio works
3. Check all themes
4. Test on different screen sizes
5. Validate SEO tags

## Questions?

Feel free to open an issue for any questions or join our discussions!

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to build something great together.

---

Thank you for contributing to Portfolify! ❤️
