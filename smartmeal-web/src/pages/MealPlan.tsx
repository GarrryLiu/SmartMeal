import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import RecipeCard from '../components/RecipeCard';
import './MealPlan.css';

const MealPlan: React.FC = () => {
  const { currentPlan, currentShoppingList, isLoading, error, clearError } = useAppStore();
  const [showShoppingList, setShowShoppingList] = useState(false);

  const days = [
    { key: 'monday', name: 'Monday' },
    { key: 'tuesday', name: 'Tuesday' },
    { key: 'wednesday', name: 'Wednesday' },
    { key: 'thursday', name: 'Thursday' },
    { key: 'friday', name: 'Friday' },
    { key: 'saturday', name: 'Saturday' },
    { key: 'sunday', name: 'Sunday' }
  ];

  const meals = [
    { key: 'breakfast', name: 'Breakfast', icon: '🌅' },
    { key: 'lunch', name: 'Lunch', icon: '☀️' },
    { key: 'dinner', name: 'Dinner', icon: '🌙' }
  ];

  const getMealRecipe = (dayKey: string, mealKey: string) => {
    if (!currentPlan) return null;
    const day = currentPlan[dayKey as keyof typeof currentPlan];
    if (!day) return null;
    return day[mealKey as keyof typeof day];
  };

  const getDayNutrition = (dayKey: string) => {
    if (!currentPlan) return null;
    const day = currentPlan[dayKey as keyof typeof currentPlan];
    if (!day) return null;
    return {
      calories: day.total_calories,
      protein: day.total_protein,
      carbs: day.total_carbs,
      fat: day.total_fat
    };
  };

  if (isLoading) {
    return (
      <div className="meal-plan">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Generating your personalized diet plan...</p>
        </div>
      </div>
    );
  }

  if (!currentPlan) {
    return (
      <div className="meal-plan">
        <div className="empty-state">
          <h2>No Diet Plan Yet</h2>
          <p>Go to the homepage to create your personalized diet plan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="meal-plan">
      <div className="meal-plan-header">
        <h1>This Week's Meal Plan</h1>
        {currentShoppingList && (
          <button 
            className="shopping-list-button"
            onClick={() => setShowShoppingList(true)}
          >
            🛒 View Shopping List
          </button>
        )}
      </div>

      <div className="meal-plan-grid">
        {/* Header row with meal names */}
        <div className="grid-header">
          <div className="day-header"></div>
          {meals.map(meal => (
            <div key={meal.key} className="meal-header">
              <span className="meal-icon">{meal.icon}</span>
              <span className="meal-name">{meal.name}</span>
            </div>
          ))}
        </div>

        {/* Daily rows */}
        {days.map(day => {
          const dayNutrition = getDayNutrition(day.key);
          return (
            <div key={day.key} className="day-row">
              <div className="day-info">
                <h3>{day.name}</h3>
                {dayNutrition && (
                  <div className="day-nutrition">
                    <span>🔥 {dayNutrition.calories} kcal</span>
                    <span>🥩 {dayNutrition.protein}g</span>
                  </div>
                )}
              </div>
              
              {meals.map(meal => {
                const recipe = getMealRecipe(day.key, meal.key);
                return (
                  <div key={meal.key} className="meal-cell">
                    {recipe && typeof recipe === 'object' ? (
                      <div className="meal-recipe">
                        <h4>{recipe.name}</h4>
                        <p className="recipe-description">{recipe.description}</p>
                        <div className="recipe-meta">
                          <span>⏱️ {recipe.prep_time + recipe.cook_time} min</span>
                          <span>🔥 {recipe.calories_per_serving} kcal</span>
                        </div>
                        <button className="view-recipe-button">
                          View Recipe
                        </button>
                      </div>
                    ) : (
                      <div className="empty-meal">
                        <span>No meal planned</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Shopping List Modal */}
      {showShoppingList && currentShoppingList && (
        <div className="modal-overlay" onClick={() => setShowShoppingList(false)}>
          <div className="modal-content shopping-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Shopping List</h3>
            <div className="shopping-list-content">
              <div className="shopping-summary">
                <p><strong>Estimated Cost:</strong> ${currentShoppingList.estimated_cost.toFixed(2)}</p>
                <p><strong>Recommended Stores:</strong> {currentShoppingList.store_suggestions.join(', ')}</p>
              </div>
              
              <div className="shopping-categories">
                {Object.entries(currentShoppingList.categories).map(([category, items]) => (
                  <div key={category} className="shopping-category">
                    <h4>{category}</h4>
                    <ul>
                      {items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <button className="instacart-button">
                🛒 Sync to Instacart
              </button>
            </div>
            <button className="close-button" onClick={() => setShowShoppingList(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
          <button onClick={clearError}>✕</button>
        </div>
      )}
    </div>
  );
};

export default MealPlan; 