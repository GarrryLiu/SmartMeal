import React, { useState } from 'react';
import './ReceiptInput.css';

interface IngredientItem {
  name: string;
  quantity: string;
  unit: string;
  price: string;
}

interface ReceiptInputProps {
  onSubmit: (items: IngredientItem[]) => void;
  onCancel: () => void;
}

const ReceiptInput: React.FC<ReceiptInputProps> = ({ onSubmit, onCancel }) => {
  const [ingredients, setIngredients] = useState<IngredientItem[]>([
    { name: '', quantity: '', unit: '', price: '' }
  ]);

  const units = ['lbs', 'kg', 'oz', 'g', 'pieces', 'bunch', 'pack', 'bottle', 'can', 'box'];

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '', price: '' }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: keyof IngredientItem, value: string) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const handleSubmit = () => {
    // Filter out empty ingredients
    const validIngredients = ingredients.filter(ing => ing.name.trim() !== '');
    if (validIngredients.length > 0) {
      onSubmit(validIngredients);
    }
  };

  // Sample receipt data for quick demo
  const loadSampleReceipt = () => {
    setIngredients([
      { name: 'Chicken Breast', quantity: '2', unit: 'lbs', price: '12.99' },
      { name: 'Bell Peppers', quantity: '3', unit: 'pieces', price: '4.47' },
      { name: 'Onions', quantity: '2', unit: 'lbs', price: '2.99' },
      { name: 'Garlic', quantity: '1', unit: 'bunch', price: '1.49' },
      { name: 'Rice', quantity: '5', unit: 'lbs', price: '8.99' },
      { name: 'Tomatoes', quantity: '4', unit: 'pieces', price: '3.99' },
      { name: 'Olive Oil', quantity: '1', unit: 'bottle', price: '9.99' },
      { name: 'Pasta', quantity: '1', unit: 'lbs', price: '2.49' },
      { name: 'Ground Beef', quantity: '1', unit: 'lbs', price: '7.99' },
      { name: 'Cheese', quantity: '8', unit: 'oz', price: '4.99' }
    ]);
  };

  return (
    <div className="receipt-input-container">
      <div className="receipt-header">
        <h3>Enter Receipt Details</h3>
        <button className="sample-btn" onClick={loadSampleReceipt}>
          Load Sample Receipt
        </button>
      </div>

      <div className="receipt-form">
        <div className="form-header">
          <span>Item</span>
          <span>Quantity</span>
          <span>Unit</span>
          <span>Price ($)</span>
          <span></span>
        </div>

        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-row">
            <input
              type="text"
              placeholder="Ingredient name"
              value={ingredient.name}
              onChange={(e) => updateIngredient(index, 'name', e.target.value)}
            />
            <input
              type="number"
              placeholder="Qty"
              value={ingredient.quantity}
              onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
            />
            <select
              value={ingredient.unit}
              onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
            >
              <option value="">Unit</option>
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              value={ingredient.price}
              onChange={(e) => updateIngredient(index, 'price', e.target.value)}
            />
            {ingredients.length > 1 && (
              <button 
                className="remove-btn"
                onClick={() => removeIngredient(index)}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <button className="add-ingredient-btn" onClick={addIngredient}>
        + Add Another Item
      </button>

      <div className="receipt-actions">
        <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        <button className="submit-btn" onClick={handleSubmit}>
          Generate Recipes
        </button>
      </div>
    </div>
  );
};

export default ReceiptInput;
