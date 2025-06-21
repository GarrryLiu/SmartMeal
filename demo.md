# SmartMeal Demo Guide

## Project Overview
SmartMeal is an AI-powered meal assistant that provides two core functional paths:
- **Path A**: Generate recipes from shopping receipts
- **Path B**: Generate weekly meal plans from health goals

## Tech Stack
- **Backend**: FastAPI (Python)
- **Frontend**: React + TypeScript
- **State Management**: Zustand
- **Styling**: CSS3 + Responsive Design

## Starting the Project

### 1. Start Backend Server
```bash
cd smartmeal_backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Start Frontend Server
```bash
cd smartmeal-web
npm start
```

## Demo Flow

### 1. Home Page Feature Demo
Visit `http://localhost:3000`

**Path A - Receipt to Recipe Generation:**
1. Click "I just went shopping" button
2. View the preset receipt image
3. Click "Analyze receipt and generate recipes"
4. View the generated recipe list

**Path B - Goal to Plan Generation:**
1. Click "I need a meal plan" button
2. Select health goals (fitness, weight loss, etc.)
3. System automatically redirects to weekly plan page

### 2. Weekly Plan Page Demo
- View 7x3 grid layout meal plan
- Click "View shopping list" button
- View categorized shopping list
- Click "Sync to Instacart" button (demo feature)

### 3. Nutrition Analytics Page Demo
- View total calories, protein, carbs, fat statistics
- View goal achievement rate and dietary diversity metrics
- View daily nutrition intake charts
- View nutrition distribution pie charts

### 4. Personal Profile Page Demo
- View user basic information
- View personal preference settings
- View nutrition goals
- View premium feature status

## API Endpoints

### User Profile
- `GET /api/v1/profile` - Get user profile

### Path A - Recipe Generation
- `POST /api/v1/recipes/from-receipt` - Generate recipes from receipt

### Path B - Plan Generation
- `POST /api/v1/plans/from-goal` - Generate meal plan from goal

## Core Feature Highlights

### 1. Responsive Design
- Supports desktop, tablet, mobile devices
- Adaptive layout and font sizes

### 2. Modern UI
- Gradient color design
- Card-based layout
- Smooth animation effects

### 3. Data Visualization
- Nutrition intake charts
- Progress ring charts
- Bar chart displays

### 4. Interactive Experience
- Modal interactions
- Loading state displays
- Error handling mechanisms

## Demo Key Points

### Business Value Showcase
1. **Personalized Recommendations**: Smart recommendations based on user preferences
2. **Nutrition Management**: Complete nutrition analysis and goal tracking
3. **Shopping Integration**: Integration potential with e-commerce platforms
4. **User Retention**: Complete user profile and preference management

### Technical Highlights
1. **Frontend-Backend Separation**: Clear API design
2. **State Management**: Using Zustand for state management
3. **Type Safety**: TypeScript provides type checking
4. **Responsive Design**: Multi-device compatibility

### User Experience
1. **Intuitive Navigation**: Clear tab navigation structure
2. **Quick Feedback**: Instant loading and error prompts
3. **Data Display**: Rich data visualization
4. **Simplified Operations**: One-click generation and viewing features

## Extended Features (P1 Level)
- Enhanced animation effects
- Detailed cooking instructions
- Social sharing features
- Nutritionist customization services
- Mobile app development

## Summary
SmartMeal demonstrates best practices for modern web applications, including:
- Complete frontend-backend architecture
- Excellent user experience design
- Scalable functional modules
- Commercialized product thinking

This project provides a complete solution framework for intelligent meal management. 