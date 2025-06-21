import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import './Home.css';

const Home: React.FC = () => {
  const { generatePlanFromGoal, generateRecipesFromReceipt, isLoading, error, clearError } = useAppStore();
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<any[]>([]);

  const goals = [
    { id: 'fitness', name: 'Fitness & Muscle Building', description: 'High-protein diet to support muscle growth' },
    { id: 'weight-loss', name: 'Weight Loss', description: 'Low-calorie healthy weight loss' },
    { id: 'muscle-gain', name: 'Muscle Gain', description: 'High-protein high-carb for quick muscle building' },
    { id: 'low-carb', name: 'Low Carb', description: 'Control carb intake for stable blood sugar' },
    { id: 'vegetarian', name: 'Vegetarian', description: 'Plant-based diet for health and environment' }
  ];

  const handleGoalSelect = async (goal: string) => {
    try {
      await generatePlanFromGoal(goal);
      setShowGoalModal(false);
    } catch (error) {
      console.error('Error generating plan:', error);
    }
  };

  const handleReceiptUpload = async () => {
    try {
      // Simulate receipt items - in real app this would come from OCR
      const receiptItems = [
        'chicken breast', 'broccoli', 'sweet potatoes', 'olive oil',
        'quinoa', 'bell peppers', 'tomatoes', 'onions'
      ];
      
      const recipes = await generateRecipesFromReceipt(receiptItems);
      setGeneratedRecipes(recipes);
      setShowReceiptModal(false);
    } catch (error) {
      console.error('Error generating recipes:', error);
    }
  };

  const closeModals = () => {
    setShowReceiptModal(false);
    setShowGoalModal(false);
    setGeneratedRecipes([]);
    clearError();
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1>SmartMeal</h1>
        <p>Your AI-powered meal assistant</p>
      </div>

      <div className="home-content">
        <div className="path-section">
          <h2>I need a meal plan</h2>
          <p>Generate a personalized weekly meal plan based on your health goal</p>
          <button 
            className="primary-button"
            onClick={() => setShowGoalModal(true)}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Start Planning'}
          </button>
        </div>

        <div className="path-section">
          <h2>I just went shopping</h2>
          <p>Upload a receipt and get recipes based on your ingredients</p>
          <button 
            className="secondary-button"
            onClick={() => setShowReceiptModal(true)}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Upload Receipt'}
          </button>
        </div>
      </div>

      {/* Goal Selection Modal */}
      {showGoalModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Select your health goal</h3>
            <div className="goals-grid">
              {goals.map((goal) => (
                <div 
                  key={goal.id} 
                  className="goal-card"
                  onClick={() => handleGoalSelect(goal.id)}
                >
                  <h4>{goal.name}</h4>
                  <p>{goal.description}</p>
                </div>
              ))}
            </div>
            <button className="close-button" onClick={closeModals}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Receipt Upload Modal */}
      {showReceiptModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Upload Shopping Receipt</h3>
            <div className="receipt-upload">
              <div className="receipt-preview">
                <img 
                  src="/receipt-sample.jpg" 
                  alt="Sample Receipt"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                    const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                    if (next) next.style.display = 'block';
                  }}
                />
                <div className="receipt-placeholder" style={{ display: 'none' }}>
                  <div className="receipt-text">
                    <h4>Sample Receipt</h4>
                    <p>Chicken Breast - $8.99</p>
                    <p>Broccoli - $2.49</p>
                    <p>Sweet Potatoes - $3.99</p>
                    <p>Olive Oil - $5.99</p>
                    <p>Quinoa - $4.99</p>
                    <p>Bell Peppers - $3.49</p>
                    <p>Tomatoes - $2.99</p>
                    <p>Onions - $1.99</p>
                  </div>
                </div>
              </div>
              <button 
                className="primary-button"
                onClick={handleReceiptUpload}
                disabled={isLoading}
              >
                {isLoading ? 'Analyzing...' : 'Analyze Receipt & Generate Recipes'}
              </button>
            </div>
            <button className="close-button" onClick={closeModals}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Generated Recipes Modal */}
      {generatedRecipes.length > 0 && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content recipes-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Recommended Recipes</h3>
            <div className="recipes-grid">
              {generatedRecipes.map((recipe, index) => (
                <div key={index} className="recipe-card">
                  <h4>{recipe.name}</h4>
                  <p>{recipe.description}</p>
                  <div className="recipe-details">
                    <span>⏱️ {recipe.prep_time + recipe.cook_time} min</span>
                    <span>🔥 {recipe.calories_per_serving} kcal</span>
                  </div>
                  <div className="recipe-ingredients">
                    <strong>Main Ingredients:</strong>
                    <ul>
                      {recipe.ingredients.slice(0, 3).map((ingredient: string, i: number) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <button className="close-button" onClick={closeModals}>
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

export default Home; 