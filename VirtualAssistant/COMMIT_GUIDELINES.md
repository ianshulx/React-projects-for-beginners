# Commit Message Guidelines

This project follows conventional commit message format for better readability and automated changelog generation.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries

## Examples

### Feature
```
feat(auth): Add OTP email verification

Implement email-based OTP verification for user registration.
Includes DNS validation and secure OTP storage.
```

### Bug Fix
```
fix(api): Resolve CORS issue with production frontend URL

Fixed CORS configuration to properly handle production frontend URL.
```

### Documentation
```
docs(readme): Update installation instructions

Added environment variable examples and deployment steps.
```

### Refactoring
```
refactor(middleware): Rename middlewear to middleware

Fixed typo in directory name and updated all imports.
```

### Style
```
style(components): Format code with Prettier

Applied consistent formatting across all component files.
```

## Best Practices

1. Use imperative mood ("Add feature" not "Added feature" or "Adds feature")
2. Keep subject line under 50 characters
3. Capitalize the subject line
4. Do not end the subject line with a period
5. Use the body to explain what and why vs. how
6. Reference issues and pull requests in the footer

## Scope (Optional)

- `auth` - Authentication related
- `api` - API endpoints
- `ui` - User interface
- `config` - Configuration files
- `deps` - Dependencies

## Footer Examples

```
Closes #123
Fixes #456
See also #789
```

