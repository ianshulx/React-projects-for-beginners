# 🚀 CompAi

> **AI-Powered Component Generator** - Generate production-ready components for multiple frameworks and languages with a single description.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-38bdf8.svg)](https://tailwindcss.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Future Improvements](#future-improvements)
- [License](#license)

## 🎯 Overview

CompAi is a modern web application that leverages Google's Gemini AI to generate production-ready components across multiple frameworks and languages. Simply describe what you need, select your target framework, and get instant, copy-paste-ready code.

**Live Demo:** [https://compai-ruddy.vercel.app](https://compai-ruddy.vercel.app)

## ✨ Features

### 🎨 Multi-Framework Support
Generate components for:
- **HTML & CSS** - Pure HTML with embedded styles
- **JSX + TailwindCSS** - React components with Tailwind styling
- **HTML + TailwindCSS** - HTML with Tailwind CDN
- **React Native** - Mobile components with StyleSheet
- **Flutter & Dart** - Stateless/Stateful widgets
- **Python (Django & Flask)** - Server-side templates
- **Java & Spring** - Spring component templates

### 🛠️ Developer Experience
- **Live Preview** - See your component before copying
- **Code Editor** - Monaco editor with syntax highlighting
- **One-Click Copy** - Copy generated code instantly
- **File Download** - Download with proper file extensions
- **Responsive Design** - Works seamlessly on all devices
- **Dark Theme** - Easy on the eyes

### 🎯 Smart Features
- AI-powered code generation
- Production-ready code output
- Framework-specific optimizations
- Image placeholder integration
- Error handling and validation

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **React Router DOM 7.9.3** - Client-side routing
- **TailwindCSS 4.1.14** - Utility-first CSS framework
- **DaisyUI 5.1.26** - Component library
- **Monaco Editor** - Code editor component
- **Lucide React** - Icon library

### AI & Build Tools
- **Google Generative AI (Gemini)** - AI code generation
- **Vite 7.1.7** - Build tool and dev server
- **Babel Standalone** - JSX compilation for preview
- **ESLint** - Code linting

### Deployment
- **Vercel** - Hosting platform

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/compai.git
   cd compai/Frontend/Comp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `Frontend/Comp` directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key | Yes |

Create a `.env` file in the `Frontend/Comp` directory:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

> **Note:** Never commit your `.env` file to version control. It's already included in `.gitignore`.

## 🚀 Usage

1. **Select Framework**: Choose your target framework from the dropdown
2. **Describe Component**: Enter a detailed description of the component you need
3. **Generate**: Click "Generate Component" and wait for AI to create your code
4. **Preview**: Click "Preview" to see a live preview (for HTML/JSX frameworks)
5. **Copy or Download**: Use the copy button or download the file with proper extension

### Example Descriptions

- "A responsive product card with an image, title, price, and an 'Add to Cart' button"
- "A navigation bar with logo, menu items, and a mobile hamburger menu"
- "A user profile card with avatar, name, bio, and social media links"
- "A login form with email, password fields, and submit button"

## 📁 Project Structure

```
Frontend/Comp/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and other assets
│   ├── Components/        # React components
│   │   ├── About.jsx      # About page component
│   │   ├── Home.jsx       # Main component generator
│   │   ├── Navbar.jsx     # Navigation bar
│   │   └── PreviewModal.jsx # Code preview modal
│   ├── services/          # API and external services
│   │   └── aiService.js   # Gemini AI integration
│   ├── utils/             # Utility functions
│   │   ├── constants.js   # Framework options and constants
│   │   └── fileUtils.js   # File download utilities
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles and theme
├── .env                   # Environment variables (not in git)
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md             # This file
```

## 📸 Screenshots

> **Note:** Add screenshots of your application here. You can include:
> - Main component generator interface
> - Generated code preview
> - Live preview modal
> - Responsive mobile view

### Example Screenshot Placeholders:
- `screenshots/home.png` - Main interface
- `screenshots/preview.png` - Preview modal
- `screenshots/mobile.png` - Mobile responsive view

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes thoroughly
4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
   See [Commit Message Guidelines](#commit-message-guidelines) below
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
- `feat: add support for Vue.js components`
- `fix: resolve JSX compilation error in preview`
- `docs: update installation instructions`
- `refactor: extract AI service to separate module`

## 🔮 Future Improvements

- [ ] Support for more frameworks (Vue.js, Angular, Svelte)
- [ ] Component customization options (colors, sizes, themes)
- [ ] Code export in multiple formats (ZIP, multiple files)
- [ ] Component library/templates
- [ ] User authentication and saved components
- [ ] Component sharing and collaboration
- [ ] Integration with popular design tools (Figma, Sketch)
- [ ] Unit tests and E2E testing
- [ ] Performance optimizations
- [ ] Accessibility improvements (WCAG compliance)
- [ ] Internationalization (i18n) support
- [ ] Component version history
- [ ] AI model selection (different Gemini models)

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgements

Special thanks to:
- [Google Gemini API](https://ai.google.dev/) - For powerful AI capabilities
- [React](https://reactjs.org/) - Amazing UI library
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Vercel](https://vercel.com/) - Hosting platform

And the amazing open-source community! 🙌

---

**Made with ❤️ by the CompAi Team**

> Ready to skip repetitive coding? Generate → Copy → Ship with CompAi 🚀
