#!/bin/bash

# Start the landing page
cd landing

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the development server on port 3001
echo "Starting SnapCook Landing Page on http://localhost:3001"
npm run dev
