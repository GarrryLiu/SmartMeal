import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const ProfileScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dietary Preferences</Text>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Cuisine Preferences</Text>
          <Text style={styles.preferenceValue}>Mediterranean, Asian, Italian</Text>
        </View>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Allergies</Text>
          <Text style={styles.preferenceValue}>None</Text>
        </View>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Dietary Restrictions</Text>
          <Text style={styles.preferenceValue}>None</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nutrition Goals</Text>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Daily Calorie Target</Text>
          <Text style={styles.preferenceValue}>2,200 calories</Text>
        </View>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Protein Goal</Text>
          <Text style={styles.preferenceValue}>150g per day</Text>
        </View>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Carb Goal</Text>
          <Text style={styles.preferenceValue}>250g per day</Text>
        </View>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Fat Goal</Text>
          <Text style={styles.preferenceValue}>80g per day</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Notifications</Text>
          <Text style={styles.preferenceValue}>Enabled</Text>
        </View>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Meal Reminders</Text>
          <Text style={styles.preferenceValue}>7:00 AM, 12:00 PM, 6:00 PM</Text>
        </View>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Shopping List Reminders</Text>
          <Text style={styles.preferenceValue}>Sundays at 9:00 AM</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Member Since</Text>
          <Text style={styles.preferenceValue}>January 2024</Text>
        </View>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Plan Type</Text>
          <Text style={styles.preferenceValue}>Premium</Text>
        </View>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceLabel}>Last Login</Text>
          <Text style={styles.preferenceValue}>Today at 10:30 AM</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#8E8E93',
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
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  preferenceLabel: {
    fontSize: 16,
    color: '#1C1C1E',
    flex: 1,
  },
  preferenceValue: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'right',
    flex: 1,
  },
});

export default ProfileScreen; 