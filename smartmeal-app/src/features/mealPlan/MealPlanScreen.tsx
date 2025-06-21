import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { useAppStore } from '../../state/useAppStore';
import { DailyMeal } from '../../models';

const MealPlanScreen: React.FC = () => {
  const { currentPlan, isLoadingPlan, fetchInitialPlan } = useAppStore();
  const [isShoppingListVisible, setIsShoppingListVisible] = useState(false);

  useEffect(() => {
    // Fetch initial plan on component mount if none exists
    if (!currentPlan) {
      fetchInitialPlan();
    }
  }, [currentPlan, fetchInitialPlan]);

  const renderDailyMeal = (day: string, dailyMeal: DailyMeal) => (
    <View key={day} style={styles.dayContainer}>
      <Text style={styles.dayTitle}>{day}</Text>
      <View style={styles.mealsContainer}>
        <View style={styles.mealCard}>
          <Text style={styles.mealType}>Breakfast</Text>
          <Text style={styles.recipeName}>{dailyMeal.breakfast.name}</Text>
          <Text style={styles.calories}>{dailyMeal.breakfast.calories_per_serving} cal</Text>
        </View>
        <View style={styles.mealCard}>
          <Text style={styles.mealType}>Lunch</Text>
          <Text style={styles.recipeName}>{dailyMeal.lunch.name}</Text>
          <Text style={styles.calories}>{dailyMeal.lunch.calories_per_serving} cal</Text>
        </View>
        <View style={styles.mealCard}>
          <Text style={styles.mealType}>Dinner</Text>
          <Text style={styles.recipeName}>{dailyMeal.dinner.name}</Text>
          <Text style={styles.calories}>{dailyMeal.dinner.calories_per_serving} cal</Text>
        </View>
      </View>
      <View style={styles.dailyStats}>
        <Text style={styles.dailyStatsText}>
          Total: {dailyMeal.total_calories} cal | 
          P: {dailyMeal.total_protein.toFixed(1)}g | 
          C: {dailyMeal.total_carbs.toFixed(1)}g | 
          F: {dailyMeal.total_fat.toFixed(1)}g
        </Text>
      </View>
    </View>
  );

  if (isLoadingPlan) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Generating your meal plan...</Text>
      </View>
    );
  }

  if (!currentPlan) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No meal plan available</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchInitialPlan}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const weekDays = [
    { key: 'monday', label: 'Monday', meal: currentPlan.plan.monday },
    { key: 'tuesday', label: 'Tuesday', meal: currentPlan.plan.tuesday },
    { key: 'wednesday', label: 'Wednesday', meal: currentPlan.plan.wednesday },
    { key: 'thursday', label: 'Thursday', meal: currentPlan.plan.thursday },
    { key: 'friday', label: 'Friday', meal: currentPlan.plan.friday },
    { key: 'saturday', label: 'Saturday', meal: currentPlan.plan.saturday },
    { key: 'sunday', label: 'Sunday', meal: currentPlan.plan.sunday },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Meal Plan</Text>
          <Text style={styles.subtitle}>
            {currentPlan.goal.charAt(0).toUpperCase() + currentPlan.goal.slice(1).replace('-', ' ')} Plan
          </Text>
        </View>

        <View style={styles.weeklyStats}>
          <Text style={styles.weeklyStatsTitle}>Weekly Overview</Text>
          <View style={styles.statsRow}>
            <Text style={styles.statItem}>
              {currentPlan.analytics.weekly_calories.toLocaleString()} cal
            </Text>
            <Text style={styles.statItem}>
              {currentPlan.analytics.weekly_protein.toFixed(0)}g protein
            </Text>
            <Text style={styles.statItem}>
              {currentPlan.analytics.goal_compliance.toFixed(0)}% compliance
            </Text>
          </View>
        </View>

        <View style={styles.planContainer}>
          {weekDays.map(({ key, label, meal }) => renderDailyMeal(label, meal))}
        </View>

        <TouchableOpacity
          style={styles.shoppingListButton}
          onPress={() => setIsShoppingListVisible(true)}
        >
          <Text style={styles.shoppingListButtonText}>View Shopping List</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Shopping List Modal */}
      <Modal
        visible={isShoppingListVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsShoppingListVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Shopping List</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsShoppingListVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.shoppingListInfo}>
            <Text style={styles.estimatedCost}>
              Estimated Cost: ${currentPlan.shopping_list.estimated_cost.toFixed(2)}
            </Text>
            <Text style={styles.storeSuggestions}>
              Suggested Stores: {currentPlan.shopping_list.store_suggestions.join(', ')}
            </Text>
          </View>

          <FlatList
            data={currentPlan.shopping_list.items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.shoppingItem}>
                <Text style={styles.shoppingItemText}>• {item}</Text>
              </View>
            )}
            style={styles.shoppingList}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  errorText: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  weeklyStats: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
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
  weeklyStatsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  planContainer: {
    padding: 16,
  },
  dayContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  mealsContainer: {
    marginBottom: 12,
  },
  mealCard: {
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  mealType: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8E8E93',
    marginBottom: 4,
  },
  recipeName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  calories: {
    fontSize: 12,
    color: '#007AFF',
  },
  dailyStats: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 12,
  },
  dailyStatsText: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  shoppingListButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  shoppingListButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  shoppingListInfo: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  estimatedCost: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  storeSuggestions: {
    fontSize: 14,
    color: '#8E8E93',
  },
  shoppingList: {
    flex: 1,
    padding: 16,
  },
  shoppingItem: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  shoppingItemText: {
    fontSize: 16,
    color: '#1C1C1E',
  },
});

export default MealPlanScreen; 