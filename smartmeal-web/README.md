# SmartMeal Web Frontend

A React web application for SmartMeal - AI-powered meal planning assistant.

## Features

### Path A: Recipe Generation from Receipt
- Generate recipes based on available ingredients
- Modal-based recipe display with beautiful cards
- Local state management

### Path B: Weekly Plan Generation from Goal
- Generate personalized weekly meal plans
- Multiple goal options (fitness, weight-loss, muscle-gain, low-carb)
- Global state management with Zustand
- Auto-navigation to Meal Plan page

### Four Main Pages
1. **Home**: Entry point for both user flows
2. **Meal Plan**: Displays current weekly plan with shopping list
3. **Analytics**: Static nutrition analytics display
4. **Profile**: Static user profile information

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend server running on http://localhost:8000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

### Alternative: Use the startup script
```bash
./start_web.sh
```

## Project Structure

```
smartmeal-web/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Navigation.css
│   │   ├── RecipeCard.tsx
│   │   └── RecipeCard.css
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Home.css
│   │   ├── MealPlan.tsx
│   │   ├── MealPlan.css
│   │   ├── Analytics.tsx
│   │   ├── Analytics.css
│   │   ├── Profile.tsx
│   │   └── Profile.css
│   ├── services/
│   │   └── api.ts
│   ├── store/
│   │   └── useAppStore.ts
│   ├── models/
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
└── README.md
```

## Demo Flow

1. **Path A Demo**: Click "Generate Recipes" on Home page
2. **Path B Demo**: Click any goal button (fitness, weight-loss, etc.) on Home page
3. **Navigation**: App automatically navigates to Meal Plan page after plan generation
4. **Shopping List**: Click "View Shopping List" on Meal Plan page

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Routing**: React Router DOM
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Styling**: CSS3 with responsive design
- **Build Tool**: Create React App

## API Integration

The web app connects to the FastAPI backend at `http://localhost:8000`:

- **Path A**: `POST /api/v1/recipes/from-receipt`
- **Path B**: `POST /api/v1/plans/from-goal`

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:8000
```

## Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest) 