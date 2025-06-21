#!/bin/bash

# Start the Next.js frontend
cd smartmeal_frontend

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the development server
echo "Starting SmartMeal Frontend on http://localhost:3000"
npm run dev
