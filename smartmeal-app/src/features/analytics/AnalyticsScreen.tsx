import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const AnalyticsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrition Analytics</Text>
        <Text style={styles.subtitle}>Your weekly nutrition insights</Text>
      </View>
      
      <View style={styles.chartContainer}>
        <View style={styles.placeholderChart}>
          <Text style={styles.placeholderText}>Analytics Chart</Text>
          <Text style={styles.placeholderSubtext}>
            This would display your weekly nutrition data
          </Text>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Weekly Calories</Text>
          <Text style={styles.statValue}>14,700</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Protein Goal</Text>
          <Text style={styles.statValue}>92%</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Variety Score</Text>
          <Text style={styles.statValue}>85</Text>
        </View>
      </View>
    </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderChart: {
    width: width * 0.9,
    height: height * 0.4,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
});

export default AnalyticsScreen; 