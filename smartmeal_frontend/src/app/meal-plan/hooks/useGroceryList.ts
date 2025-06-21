import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import groceriesData from '@/data/groceries.json';

interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  essential?: boolean;
}

interface GroceryCategory {
  name: string;
  icon: string;
  items: GroceryItem[];
}

export function useGroceryList() {
  const { userProfile } = useUser();
  const [groceryList, setGroceryList] = useState<GroceryCategory[]>([]);

  useEffect(() => {
    // Generate personalized grocery list based on user profile
    let personalizedList = [...groceriesData.categories] as GroceryCategory[];
    
    // Add diet-specific recommendations
    if (userProfile.diet === 'vegetarian' || userProfile.diet === 'vegan') {
      // Remove meat items for vegetarians/vegans
      personalizedList = personalizedList.map(category => ({
        ...category,
        items: category.name === 'Proteins' 
          ? category.items.filter(item => !['chicken-breast', 'salmon'].includes(item.id))
          : category.items
      }));
      
      // Add vegetarian-specific items
      if (groceriesData.recommendations.vegetarian) {
        personalizedList.push({
          name: 'Plant-Based Extras',
          icon: '🌱',
          items: groceriesData.recommendations.vegetarian.additionalItems.map(item => ({
            ...item,
            essential: false
          }))
        });
      }
    }

    // Add keto-specific items
    if (userProfile.diet === 'keto' && groceriesData.recommendations.keto) {
      personalizedList.push({
        name: 'Keto Essentials',
        icon: '🥥',
        items: groceriesData.recommendations.keto.additionalItems.map(item => ({
          ...item,
          essential: false
        }))
      });
    }

    // Add high-protein items if user has high protein goals
    if (userProfile.macroGoals.includes('High Protein') && groceriesData.recommendations['high-protein']) {
      personalizedList.push({
        name: 'High Protein Boost',
        icon: '💪',
        items: groceriesData.recommendations['high-protein'].additionalItems.map(item => ({
          ...item,
          essential: false
        }))
      });
    }

    setGroceryList(personalizedList);
  }, [userProfile]);

  return groceryList;
} 