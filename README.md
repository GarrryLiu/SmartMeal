# SmartMeal P0 MVP

A functional prototype demonstrating dual-direction AI meal planning capabilities through mobile and web applications.

## Project Structure

```
SmartMeal/
├── smartmeal_backend/          # FastAPI Backend
│   ├── api/
│   │   ├── routers/
│   │   │   ├── path_a.py       # Recipe generation from receipt
│   │   │   └── path_b.py       # Plan generation from goal
│   │   └── v1.py
│   ├── models/
│   │   └── schemas.py          # Pydantic models
│   ├── main.py                 # FastAPI app entry point
│   └── requirements.txt
├── smartmeal-app/              # React Native Frontend
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── features/
│   │   ├── models/
│   │   ├── navigation/
│   │   ├── repository/
│   │   ├── state/
│   │   └── services.ts
│   ├── App.tsx
│   └── package.json
├── smartmeal-web/              # React Web Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── models/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   └── package.json
├── README.md                   # Project documentation
├── start_backend.sh           # Backend startup script
├── start_frontend.sh          # React Native startup script
└── start_web.sh               # Web frontend startup script
```

## Features

### Path A: Recipe Generation from Receipt
- Generate recipes based on available ingredients
- Modal-based recipe display
- Local state management

### Path B: Weekly Plan Generation from Goal
- Generate personalized weekly meal plans
- Multiple goal options (fitness, weight-loss, muscle-gain, low-carb)
- Global state management with Zustand
- Auto-navigation to Meal Plan tab/page

### Four Main Sections
1. **Home**: Entry point for both user flows
2. **Meal Plan**: Displays current weekly plan with shopping list
3. **Analytics**: Static nutrition analytics display
4. **Profile**: Static user profile information

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
```bash
cd smartmeal_backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the FastAPI server:
```bash
python main.py
```

The backend will be available at `http://localhost:8000`

### Frontend Options

#### Option 1: React Native (Mobile)
```bash
cd smartmeal-app
npm install
npm start
# Then press 'i' for iOS or 'a' for Android
```

#### Option 2: React Web (Browser)
```bash
cd smartmeal-web
npm install
npm start
```

The web app will open in your browser at `http://localhost:3000`

### Using Startup Scripts

```bash
# Start backend
./start_backend.sh

# Start React Native (in new terminal)
./start_frontend.sh

# Start React Web (in new terminal)
./start_web.sh
```

## API Endpoints

### Path A: Recipe Generation
- `POST /api/v1/recipes/from-receipt`
- Request: `{ "items": ["chicken breast", "cherry tomatoes"] }`
- Response: `RecipeResponse` object

### Path B: Plan Generation
- `POST /api/v1/plans/from-goal`
- Request: `{ "goal": "fitness" }`
- Response: `PlanResponse` object

## Development Notes

- **Mock Data**: Both frontends currently use mock data for demonstration
- **Service Locator**: Switch between mock and real API in React Native `src/services.ts`
- **State Management**: Global state managed with Zustand
- **Navigation**: React Navigation (mobile) / React Router (web)
- **Styling**: Native iOS-style design with consistent theming

## Demo Flow

1. **Path A Demo**: Tap/Click "Generate Recipes" on Home screen
2. **Path B Demo**: Tap/Click any goal button (fitness, weight-loss, etc.) on Home screen
3. **Navigation**: App automatically navigates to Meal Plan section after plan generation
4. **Shopping List**: Tap/Click "View Shopping List" on Meal Plan screen

## Tech Stack

### Backend
- **Framework**: FastAPI, Pydantic, Python

### React Native (Mobile)
- **Framework**: React Native, TypeScript
- **Navigation**: React Navigation
- **State Management**: Zustand
- **HTTP Client**: Axios

### React Web (Browser)
- **Framework**: React 18, TypeScript
- **Routing**: React Router DOM
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Build Tool**: Create React App

## Frontend Comparison

| Feature | React Native | React Web |
|---------|-------------|-----------|
| Platform | Mobile (iOS/Android) | Browser |
| Navigation | Bottom Tabs | Top Navigation |
| Demo Ease | Requires simulator/device | Instant browser access |
| Responsive | Native responsive | CSS responsive |
| Development | Metro bundler | Create React App |

## Getting Started for Demo

For the easiest demo experience, we recommend using the **React Web version**:

1. Start the backend: `./start_backend.sh`
2. Start the web frontend: `./start_web.sh`
3. Open `http://localhost:3000` in your browser
4. Demo both user flows immediately

The web version provides the same functionality as the mobile app but is much easier to demo and share with stakeholders. 