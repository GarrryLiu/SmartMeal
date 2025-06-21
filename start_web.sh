#!/bin/bash

echo "Starting SmartMeal Web Frontend..."

# Navigate to web frontend directory
cd smartmeal-web

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if package.json exists
if [ -f "package.json" ]; then
    echo "Installing Node.js dependencies..."
    npm install
fi

# Start the development server
echo "Starting development server on http://localhost:3000"
echo "Make sure the backend is running on http://localhost:8000"
npm start 