import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../navigation/types';
import { useAppStore } from '../../state/useAppStore';
import RecipeCard from '../../components/RecipeCard';
import { Recipe } from '../../models';

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { generateNewPlan } = useAppStore();
  
  // Local state for Path A (recipe generation)
  const [isRecipeModalVisible, setIsRecipeModalVisible] = useState(false);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Path A: Generate recipes from receipt
  const handleGenerateRecipes = async () => {
    setIsRecipeModalVisible(true);
    setIsLoadingRecipes(true);
    
    try {
      // Simulate API call with hardcoded items
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock recipes for demo
      const mockRecipes: Recipe[] = [
        {
          id: '1',
          name: 'Grilled Chicken with Cherry Tomatoes',
          description: 'A healthy and delicious grilled chicken dish with fresh cherry tomatoes',
          ingredients: ['chicken breast', 'cherry tomatoes', 'olive oil', 'garlic', 'herbs'],
          instructions: ['Season chicken breast', 'Heat olive oil', 'Cook chicken', 'Add tomatoes'],
          prep_time: 10,
          cook_time: 20,
          servings: 2,
          calories_per_serving: 350,
          tags: ['healthy', 'quick', 'protein']
        },
        {
          id: '2',
          name: 'Cherry Tomato Pasta',
          description: 'Simple and flavorful pasta with cherry tomatoes',
          ingredients: ['pasta', 'cherry tomatoes', 'garlic', 'basil', 'parmesan'],
          instructions: ['Cook pasta', 'Sauté garlic', 'Add tomatoes', 'Toss with pasta'],
          prep_time: 5,
          cook_time: 15,
          servings: 4,
          calories_per_serving: 420,
          tags: ['vegetarian', 'pasta', 'quick']
        }
      ];
      
      setRecipes(mockRecipes);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate recipes');
    } finally {
      setIsLoadingRecipes(false);
    }
  };

  // Path B: Generate plan from goal
  const handleGeneratePlan = async (goal: string) => {
    try {
      await generateNewPlan(goal);
      // Auto-navigate to Meal Plan tab after successful generation
      navigation.navigate('MealPlan');
    } catch (error) {
      Alert.alert('Error', 'Failed to generate meal plan');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SmartMeal</Text>
        <Text style={styles.subtitle}>Your AI-powered meal planning assistant</Text>
      </View>

      {/* Path A: Recipe Generation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>I just went shopping</Text>
        <Text style={styles.sectionDescription}>
          Generate recipes based on ingredients you have
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleGenerateRecipes}>
          <Text style={styles.buttonText}>Generate Recipes</Text>
        </TouchableOpacity>
      </View>

      {/* Path B: Plan Generation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Create a meal plan</Text>
        <Text style={styles.sectionDescription}>
          Get a personalized weekly meal plan based on your goals
        </Text>
        <View style={styles.goalButtons}>
          {['fitness', 'weight-loss', 'muscle-gain', 'low-carb'].map((goal) => (
            <TouchableOpacity
              key={goal}
              style={styles.goalButton}
              onPress={() => handleGeneratePlan(goal)}
            >
              <Text style={styles.goalButtonText}>
                {goal.charAt(0).toUpperCase() + goal.slice(1).replace('-', ' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recipe Modal */}
      <Modal
        visible={isRecipeModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsRecipeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Generated Recipes</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsRecipeModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
          
          {isLoadingRecipes ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Generating recipes...</Text>
            </View>
          ) : (
            <ScrollView style={styles.recipesContainer}>
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </ScrollView>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  goalButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  goalButton: {
    backgroundColor: '#F2F2F7',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  goalButtonText: {
    color: '#1C1C1E',
    fontSize: 14,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },
  recipesContainer: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen; 