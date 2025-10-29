# 📚 Reading Progress Tracker

A full-stack MERN application that helps you track your reading progress, manage your book library, and stay motivated on your reading journey.

![Reading Progress Tracker](https://img.shields.io/badge/MERN-Stack-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2024-orange)

## ✨ Features

### 🔐 User Authentication
- **Secure Registration & Login** - JWT-based authentication with bcrypt password hashing
- **Protected Routes** - Secure access to user-specific data
- **Profile Management** - Update personal information

### 📖 Book Management
- **Add Books** - Title, author, total pages, start date, and optional cover image
- **Edit Books** - Update book details, reading status, and progress
- **Delete Books** - Remove books from your library
- **Book Details** - Comprehensive view with all book information

### 📊 Progress Tracking
- **Visual Progress Bars** - See your reading progress at a glance
- **Status Management** - Track books as 'Not Started', 'Reading', 'Finished', or 'Paused'
- **Quick Progress Updates** - Add pages with quick +10, +25, +50 buttons
- **Reading Statistics** - Dashboard with total books, pages read, and completion rates

### 🎨 Modern UI/UX
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Clean Interface** - Modern design with Tailwind CSS
- **Interactive Elements** - Smooth animations and hover effects
- **Toast Notifications** - Real-time feedback for user actions

### 🔍 Advanced Features
- **Search & Filter** - Find books by title or author, filter by status
- **Sorting Options** - Sort by date, title, author, or progress
- **Cover Image Upload** - Add custom book covers
- **Reading Notes** - Add personal notes and ratings
- **Statistics Dashboard** - Track your reading habits and progress

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Express Validator** - Input validation

### Frontend
- **React** - User interface library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications
- **date-fns** - Date utility library

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/reading-progress-tracker.git
   cd reading-progress-tracker
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install server dependencies**
   ```bash
   npm run install-server
   ```

4. **Install client dependencies**
   ```bash
   npm run install-client
   ```

### Environment Setup

1. **Create server environment file**
   ```bash
   cp server/.env.example server/.env
   ```

2. **Configure environment variables** in `server/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/reading-tracker
   JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
   NODE_ENV=development
   ```

### Database Setup

#### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use the default connection string: `mongodb://localhost:27017/reading-tracker`

#### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env` file

### Running the Application

#### Development Mode (Recommended)
Run both client and server concurrently:
```bash
npm run dev
```

#### Separate Terminals
**Terminal 1 - Server:**
```bash
npm run server
```

**Terminal 2 - Client:**
```bash
npm run client
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📱 Usage Guide

### Getting Started
1. **Register** a new account or **login** with existing credentials
2. **Add your first book** using the "Add New Book" button
3. **Track progress** by updating current page numbers
4. **View statistics** on your dashboard

### Demo Account
For testing purposes, you can use these demo credentials:
- **Email**: demo@example.com
- **Password**: demo123

### Adding Books
1. Click "Add New Book" from the dashboard
2. Fill in book details (title, author, total pages)
3. Optionally upload a cover image
4. Set start date and initial progress
5. Add personal notes and rating

### Tracking Progress
- **Quick Updates**: Use +10, +25, +50 buttons for fast progress updates
- **Manual Entry**: Enter exact page numbers
- **Status Changes**: Books automatically update status based on progress

### Managing Your Library
- **Search**: Find books by title or author
- **Filter**: View books by reading status
- **Sort**: Organize by date, title, author, or progress
- **Edit**: Update book details anytime
- **Delete**: Remove books you no longer want to track

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Books
- `GET /api/books` - Get all user books
- `GET /api/books/:id` - Get specific book
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `PATCH /api/books/:id/progress` - Update reading progress
- `DELETE /api/books/:id` - Delete book
- `GET /api/books/stats/summary` - Get reading statistics

## 🏗️ Project Structure

```
reading-progress-tracker/
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Auth/          # Authentication components
│   │   │   ├── Books/         # Book-related components
│   │   │   ├── Dashboard/     # Dashboard components
│   │   │   ├── Layout/        # Layout components
│   │   │   ├── Profile/       # Profile components
│   │   │   └── UI/            # Reusable UI components
│   │   ├── contexts/          # React contexts
│   │   ├── App.js             # Main App component
│   │   └── index.js           # Entry point
│   └── package.json
├── server/                     # Node.js backend
│   ├── middleware/            # Express middleware
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── uploads/               # File uploads directory
│   ├── server.js              # Server entry point
│   └── package.json
├── package.json               # Root package.json
└── README.md                  # This file
```

## 🤝 Contributing

We welcome contributions! This project is perfect for **Hacktoberfest** and beginner developers.

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Ideas

#### 🟢 Beginner-Friendly
- Add more book status options
- Improve UI/UX with animations
- Add dark mode support
- Create more toast notification types
- Add form validation improvements

#### 🟡 Intermediate
- Implement book recommendations
- Add reading goals and streaks
- Create data export functionality
- Add book categories/genres
- Implement advanced search filters

#### 🔴 Advanced
- Add social features (friends, sharing)
- Implement reading challenges
- Create mobile app with React Native
- Add data visualization charts
- Implement real-time notifications

### Development Guidelines

1. **Code Style**: Follow existing code patterns
2. **Comments**: Add clear, helpful comments
3. **Testing**: Test your changes thoroughly
4. **Documentation**: Update README if needed
5. **Commits**: Use clear, descriptive commit messages

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running locally or check your Atlas connection string.

#### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Kill the process using the port or change the PORT in `.env`.

#### JWT Secret Error
```
Error: secretOrPrivateKey has a value which is not a number or string
```
**Solution**: Set a proper JWT_SECRET in your `.env` file.

#### File Upload Issues
**Solution**: Ensure the `uploads` directory exists in the server folder.

### Getting Help

1. Check existing [Issues](https://github.com/yourusername/reading-progress-tracker/issues)
2. Create a new issue with detailed description
3. Join our community discussions
4. Contact maintainers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MongoDB** for the excellent database
- **React Team** for the amazing frontend library
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- **All Contributors** who help improve this project

## 🌟 Show Your Support

If you find this project helpful, please consider:
- ⭐ **Starring** the repository
- 🍴 **Forking** for your own use
- 🐛 **Reporting** bugs and issues
- 💡 **Suggesting** new features
- 🤝 **Contributing** code

## 📞 Contact

- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Email**: your.email@example.com
- **Project Link**: https://github.com/yourusername/reading-progress-tracker

---

**Happy Reading! 📚✨**

Made with ❤️ for book lovers everywhere.
