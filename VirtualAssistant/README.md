# 🎙️ Virtual AI Voice Assistant

A modern, full-stack voice and chat assistant powered by AI (Gemini). Built with React, Node.js, Express, and MongoDB. This assistant can handle voice commands, perform web searches, control media, manage tasks, and much more through an intuitive web interface.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue)
![License](https://img.shields.io/badge/License-ISC-green)

## ✨ Features

### 🗣️ Conversational AI
- Natural chat or voice interactions
- Human-like tone and friendly responses
- Smart context understanding powered by Google Gemini AI

### 🔍 Search & Knowledge
- Google search with direct result links
- News, sports, finance & trending topics
- Wikipedia summaries
- Fast fallback search when query not matched

### 🎵 Media Control
- Play YouTube videos or search playlists
- Spotify music links
- Trending music & entertainment lookups

### 🛠️ Utilities
- Time, date, day, month queries
- Calculator
- Calendar
- Notes
- Reminders & alarms

### 🌦️ Weather & Travel
- City-wise weather information
- Google Maps routing
- Flight status & booking helpers
- Hotel search

### 📰 News & Sports
- Latest headlines
- Cricket & football live scores
- Sports news summaries

### 📱 Social Apps
Quick-launch links to:
- Instagram • Facebook • Twitter/X • WhatsApp Web • Telegram • Snapchat • LinkedIn

### 💹 Finance
- Live stock prices
- Crypto price updates
- Finance news

### 🤖 Built-in AI Tools
- Image generation
- Code generation
- Document summarization
- Smart conversation fallback

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Image storage
- **Nodemailer** - Email service
- **Google Gemini AI** - AI integration

## 📋 Prerequisites

- Node.js (v20.x or higher)
- MongoDB (local or cloud instance)
- npm or yarn
- Google Gemini API key
- Cloudinary account (for image uploads)
- Gmail account (for OTP emails)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/shreyashpatel5506/VirtualAssistant.git
cd VirtualAssistant
```

### 2. Install dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Email Configuration (for OTP)
MY_MAIL=your_email@gmail.com
MY_PASSWORD=your_app_password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Gemini AI Configuration
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY

# Optional: API Template (for document generation)
APITEMPLATE_API_KEY=your_api_key
APITEMPLATE_TEMPLATE_ID=your_template_id
```

Create a `.env` file in the `frontend` directory (optional):

```env
VITE_API_URL=http://localhost:8080/api
```

### 4. Run the application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8080`

#### Production Mode

```bash
# Build frontend
npm run build

# Start backend (serves both API and frontend)
npm start
```

## 📁 Project Structure

```
VirtualAssistant/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js      # Cloudinary configuration
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js # Authentication logic
│   │   └── token.js           # JWT token utilities
│   ├── middleware/
│   │   ├── auth.middleware.js # Authentication middleware
│   │   └── multer.js          # File upload middleware
│   ├── models/
│   │   └── user.model.js      # User schema
│   ├── routes/
│   │   ├── auth.route.js      # Authentication routes
│   │   └── geminiRoute.js     # AI assistant routes
│   ├── src/
│   │   └── index.js           # Server entry point
│   ├── gemini.js              # Gemini AI integration
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── Context/           # React context providers
│   │   ├── pages/             # Page components
│   │   ├── stores/            # Zustand state stores
│   │   ├── utils/             # Utility functions
│   │   ├── assets/           # Static assets
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   └── package.json
├── .gitignore
├── package.json
└── README.md
```

## 🎯 Usage

### Getting Started

1. **Sign Up**: Create an account with email verification (OTP)
2. **Customize Assistant**: Set your assistant's name and avatar
3. **Start Chatting**: Use text or voice commands to interact with your assistant

### Example Commands

- **General**: "How are you?", "Tell me a joke"
- **Search**: "Search Google for React tutorials"
- **Media**: "Play Ed Sheeran on Spotify", "Search YouTube for cooking recipes"
- **Time**: "What time is it?", "What's today's date?"
- **Tools**: "Open calculator", "Open calendar"
- **Weather**: "What's the weather in London?"
- **News**: "Show me latest news"
- **Finance**: "What's the stock price of Apple?"

## 🔐 Authentication

The application uses JWT-based authentication with HTTP-only cookies for secure session management. Passwords are hashed using bcrypt.

## 📸 Screenshots

<!-- Add screenshots here -->
_Placeholder for application screenshots_

## 🚧 Future Improvements

- [ ] Offline mode support
- [ ] Multi-language voice support
- [ ] Personalization profiles
- [ ] Smart home integrations
- [ ] Chat history & memory persistence
- [ ] Voice command customization
- [ ] Mobile app (React Native)
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Plugin system for extensibility

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Commit Message Guidelines

We follow conventional commit messages:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example: `feat: Add voice recognition support`

## 🐛 Known Issues

- Gemini API integration may require API key configuration
- Some features may not work in production without proper environment variables

## 📜 License

This project is licensed under the ISC License.

## 👤 Author

**Shreyash Patel**

- GitHub: [@shreyashpatel5506](https://github.com/shreyashpatel5506)
- Project Link: [https://github.com/shreyashpatel5506/VirtualAssistant](https://github.com/shreyashpatel5506/VirtualAssistant)

## ⭐ Support

If you like this project, please give it a star ⭐ on GitHub. It motivates further development and helps the project grow!

## 🙏 Acknowledgments

- Google Gemini AI for the powerful AI capabilities
- All the open-source libraries that made this project possible
- Contributors and users of this project

---

**Note**: Make sure to configure all environment variables before running the application. The Gemini API key is required for the assistant to function properly.
