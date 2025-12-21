# Contributing to CompAi

Thank you for your interest in contributing to CompAi! This document provides guidelines and best practices for contributing.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/compai.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly
6. Commit with a clear message (see guidelines below)
7. Push to your fork: `git push origin feature/your-feature-name`
8. Open a Pull Request

## 📝 Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, missing semicolons, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process or auxiliary tools

### Examples

**Good:**
```
feat: add support for Vue.js component generation

- Add Vue.js to framework options
- Update AI prompt for Vue syntax
- Add Vue preview support in PreviewModal
```

```
fix: resolve JSX compilation error in preview modal

The Babel transform was failing for arrow function components.
Now handles both function declarations and arrow functions.
```

```
docs: update installation instructions

Add Node.js version requirement and clarify API key setup.
```

**Bad:**
```
update code
```

```
fix bug
```

```
changes
```

### Scope (Optional)
- `components`: Changes to React components
- `services`: Changes to API/services
- `utils`: Changes to utility functions
- `styles`: Changes to CSS/styling
- `config`: Changes to configuration files

## 🎨 Code Style

- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing code patterns
- Keep functions small and focused
- Use ES6+ features where appropriate

## ✅ Pull Request Checklist

- [ ] Code follows the project's style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated (if needed)
- [ ] No console.logs or debug code
- [ ] Tests pass (if applicable)
- [ ] Changes tested in browser
- [ ] Commit messages follow guidelines

## 🐛 Reporting Bugs

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/OS information
- Screenshots (if applicable)

## 💡 Suggesting Features

Feature suggestions are welcome! Please include:
- Clear description of the feature
- Use case/benefit
- Potential implementation approach (if you have ideas)

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

Thank you for contributing! 🙌

