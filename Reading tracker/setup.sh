#!/bin/bash

# Reading Progress Tracker Setup Script
echo "🚀 Setting up Reading Progress Tracker..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if MongoDB is running (optional check)
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found locally. Make sure you have MongoDB installed or use MongoDB Atlas."
    echo "Local MongoDB: https://docs.mongodb.com/manual/installation/"
    echo "MongoDB Atlas: https://www.mongodb.com/atlas"
fi

echo "📦 Installing dependencies..."

# Install root dependencies
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server && npm install && cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client && npm install && cd ..

# Create .env file if it doesn't exist
if [ ! -f "server/.env" ]; then
    echo "🔧 Creating environment file..."
    cp server/.env.example server/.env
    echo "✅ Created server/.env file. Please update it with your configuration."
else
    echo "✅ Environment file already exists."
fi

# Create uploads directory
mkdir -p server/uploads

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update server/.env with your MongoDB URI and JWT secret"
echo "2. Start MongoDB (if using local installation)"
echo "3. Run 'npm run dev' to start both client and server"
echo ""
echo "🌐 The app will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "📚 Happy reading!"
