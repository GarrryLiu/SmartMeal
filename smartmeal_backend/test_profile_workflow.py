"""
Test workflow for Path A with user profile
Simulates complete flow: Profile → Shopping → Recipes
"""
import requests
import json

BASE_URL = "http://localhost:8000/api/v1"

def test_path_a_with_profile():
    """
    Test Path A with user profile data
    """
    
    # Simulate user profile from onboarding
    user_profile = {
        "diet": "vegetarian",
        "preferredCuisines": ["Italian", "Indian"],
        "allergies": ["nuts", "shellfish"],
        "dislikes": ["mushrooms", "olives"],
        "cookingTime": "moderate",
        "calorieTracking": "estimate",
        "macroGoals": ["high-protein"]
    }
    
    # What user bought (ingredients)
    request_data = {
        "items": [
            "pasta",
            "tomatoes", 
            "garlic",
            "spinach",
            "chickpeas",
            "olive oil",
            "onions",
            "bell peppers",
            "rice",
            "tofu"
        ],
        "user_preferences": user_profile
    }
    
    print("🧑 User Profile:")
    print(f"   Diet: {user_profile['diet']}")
    print(f"   Cuisines: {', '.join(user_profile['preferredCuisines'])}")
    print(f"   Allergies: {', '.join(user_profile['allergies'])}")
    print(f"   Cooking Time: {user_profile['cookingTime']}")
    
    print("\n🛒 Ingredients Bought:")
    print(f"   {', '.join(request_data['items'])}")
    
    print("\n📡 Generating personalized recipes...")
    
    try:
        response = requests.post(
            f"{BASE_URL}/recipes/from-receipt",
            json=request_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"\n✅ Success! Got {data['total_count']} recipes")
            
            print("\n📖 Personalized Recipes (Vegetarian, No Nuts):")
            print("-" * 60)
            
            for i, recipe in enumerate(data['recipes'], 1):
                print(f"\n{i}. {recipe['name']}")
                print(f"   📝 {recipe['description']}")
                print(f"   ⏱️  Total time: {recipe['prep_time'] + recipe['cook_time']} minutes")
                print(f"   🍽️  Servings: {recipe['servings']}")
                print(f"   🥘 Main ingredients: {', '.join(recipe['ingredients'][:5])}")
                
                # Check if recipe respects constraints
                ingredients_lower = [ing.lower() for ing in recipe['ingredients']]
                if any(allergen in ' '.join(ingredients_lower) for allergen in user_profile['allergies']):
                    print("   ⚠️  WARNING: May contain allergens!")
                
        else:
            print(f"\n❌ Error: {response.status_code}")
            print(response.json())
            
    except Exception as e:
        print(f"\n❌ Connection error: {e}")

if __name__ == "__main__":
    test_path_a_with_profile()
