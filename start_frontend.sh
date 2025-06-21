#!/bin/bash

echo "Starting SmartMeal Frontend..."

# Navigate to frontend directory
cd smartmeal-app

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

# Start the Metro bundler
echo "Starting Metro bundler..."
echo "Press 'i' for iOS simulator or 'a' for Android emulator"
npm start 