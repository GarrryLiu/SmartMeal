import React from 'react';
import { Recipe } from '../models';
import './RecipeCard.css';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <div className="recipe-header">
        <h3 className="recipe-title">{recipe.name}</h3>
        <div className="recipe-meta">
          <span className="recipe-calories">{recipe.calories_per_serving} cal</span>
          <span className="recipe-time">{recipe.prep_time + recipe.cook_time} min</span>
        </div>
      </div>
      
      <p className="recipe-description">{recipe.description}</p>
      
      <div className="recipe-ingredients">
        <h4>Ingredients:</h4>
        <ul>
          {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
          {recipe.ingredients.length > 3 && (
            <li>+{recipe.ingredients.length - 3} more</li>
          )}
        </ul>
      </div>
      
      <div className="recipe-tags">
        {recipe.tags.slice(0, 2).map((tag, index) => (
          <span key={index} className="recipe-tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard; 