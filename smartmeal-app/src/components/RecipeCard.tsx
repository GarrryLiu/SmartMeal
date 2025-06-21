import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Recipe } from '../models';

interface RecipeCardProps {
  recipe: Recipe;
  onPress?: () => void;
}

const { width } = Dimensions.get('window');

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {recipe.description}
        </Text>
        <View style={styles.details}>
          <Text style={styles.calories}>
            {recipe.calories_per_serving} cal
          </Text>
          <Text style={styles.time}>
            {recipe.prep_time + recipe.cook_time} min
          </Text>
        </View>
        <View style={styles.tags}>
          {recipe.tags.slice(0, 2).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 4,
    width: width * 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
    lineHeight: 20,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  calories: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
  time: {
    fontSize: 14,
    color: '#8E8E93',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#8E8E93',
  },
});

export default RecipeCard; 