#!/bin/bash

echo "Starting SmartMeal Backend..."

# Navigate to backend directory
cd smartmeal_backend

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

# Install dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "Installing Python dependencies..."
    pip3 install -r requirements.txt
fi

# Start the FastAPI server
echo "Starting FastAPI server on http://localhost:8000"
python3 main.py 