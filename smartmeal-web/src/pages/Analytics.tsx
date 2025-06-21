import React, { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import './Analytics.css';

const Analytics: React.FC = () => {
  const { currentAnalytics, loadUserProfile, userProfile, isLoading, error, clearError } = useAppStore();

  useEffect(() => {
    if (!userProfile) {
      loadUserProfile();
    }
  }, [userProfile, loadUserProfile]);

  // Mock analytics data for demo
  const mockAnalytics = {
    weekly_calories: 15400,
    weekly_protein: 1050,
    weekly_carbs: 1800,
    weekly_fat: 560,
    goal_compliance: 92.5,
    variety_score: 87.3,
    daily_breakdown: {
      monday: { calories: 2200, protein: 150, carbs: 250, fat: 80 },
      tuesday: { calories: 2150, protein: 145, carbs: 245, fat: 75 },
      wednesday: { calories: 2300, protein: 160, carbs: 260, fat: 85 },
      thursday: { calories: 2100, protein: 140, carbs: 240, fat: 70 },
      friday: { calories: 2250, protein: 155, carbs: 255, fat: 80 },
      saturday: { calories: 2400, protein: 165, carbs: 270, fat: 90 },
      sunday: { calories: 2000, protein: 135, carbs: 230, fat: 65 }
    }
  };

  const analytics = currentAnalytics || mockAnalytics;

  const days = [
    { key: 'monday', name: 'Monday' },
    { key: 'tuesday', name: 'Tuesday' },
    { key: 'wednesday', name: 'Wednesday' },
    { key: 'thursday', name: 'Thursday' },
    { key: 'friday', name: 'Friday' },
    { key: 'saturday', name: 'Saturday' },
    { key: 'sunday', name: 'Sunday' }
  ];

  const nutritionGoals = userProfile?.nutrition_goals || {
    daily_calories: 2200,
    protein_goal: 150,
    carb_goal: 250,
    fat_goal: 80,
    fiber_goal: 30
  };

  const getDailyCompliance = (dayKey: string) => {
    const daily = analytics.daily_breakdown[dayKey as keyof typeof analytics.daily_breakdown];
    if (!daily) return 0;
    
    const calorieCompliance = Math.min(100, (daily.calories / nutritionGoals.daily_calories) * 100);
    const proteinCompliance = Math.min(100, (daily.protein / nutritionGoals.protein_goal) * 100);
    const carbCompliance = Math.min(100, (daily.carbs / nutritionGoals.carb_goal) * 100);
    const fatCompliance = Math.min(100, (daily.fat / nutritionGoals.fat_goal) * 100);
    
    return (calorieCompliance + proteinCompliance + carbCompliance + fatCompliance) / 4;
  };

  if (isLoading) {
    return (
      <div className="analytics">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading nutrition analysis data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h1>Nutrition Analytics</h1>
        <p>Weekly nutrition overview</p>
      </div>

      {/* Weekly Overview Cards */}
      <div className="overview-cards">
        <div className="overview-card">
          <div className="card-icon">🔥</div>
          <div className="card-content">
            <h3>Total Calories</h3>
            <div className="card-value">{analytics.weekly_calories.toLocaleString()}</div>
            <div className="card-unit">kcal</div>
          </div>
        </div>

        <div className="overview-card">
          <div className="card-icon">🥩</div>
          <div className="card-content">
            <h3>Protein</h3>
            <div className="card-value">{analytics.weekly_protein.toFixed(0)}</div>
            <div className="card-unit">g</div>
          </div>
        </div>

        <div className="overview-card">
          <div className="card-icon">🍞</div>
          <div className="card-content">
            <h3>Carbohydrates</h3>
            <div className="card-value">{analytics.weekly_carbs.toFixed(0)}</div>
            <div className="card-unit">g</div>
          </div>
        </div>

        <div className="overview-card">
          <div className="card-icon">🥑</div>
          <div className="card-content">
            <h3>Fat</h3>
            <div className="card-value">{analytics.weekly_fat.toFixed(0)}</div>
            <div className="card-unit">g</div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="progress-section">
        <div className="progress-card">
          <h3>Goal Compliance</h3>
          <div className="progress-circle">
            <div className="progress-value">{analytics.goal_compliance.toFixed(1)}%</div>
            <div className="progress-ring">
              <svg width="120" height="120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#e9ecef"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#667eea"
                  strokeWidth="8"
                  strokeDasharray={`${(analytics.goal_compliance / 100) * 314} 314`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="progress-card">
          <h3>Dietary Variety</h3>
          <div className="progress-circle">
            <div className="progress-value">{analytics.variety_score.toFixed(1)}%</div>
            <div className="progress-ring">
              <svg width="120" height="120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#e9ecef"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#f093fb"
                  strokeWidth="8"
                  strokeDasharray={`${(analytics.variety_score / 100) * 314} 314`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Breakdown */}
      <div className="daily-breakdown">
        <h2>Daily Nutrition Intake</h2>
        <div className="daily-chart">
          <div className="chart-header">
            <div className="chart-day">Day</div>
            <div className="chart-calories">Calories</div>
            <div className="chart-protein">Protein</div>
            <div className="chart-carbs">Carbs</div>
            <div className="chart-fat">Fat</div>
            <div className="chart-compliance">Compliance</div>
          </div>
          
          {days.map(day => {
            const daily = analytics.daily_breakdown[day.key as keyof typeof analytics.daily_breakdown];
            const compliance = getDailyCompliance(day.key);
            
            return (
              <div key={day.key} className="chart-row">
                <div className="chart-day">{day.name}</div>
                <div className="chart-calories">
                  <div className="bar-container">
                    <div 
                      className="calorie-bar"
                      style={{ width: `${(daily.calories / nutritionGoals.daily_calories) * 100}%` }}
                    ></div>
                    <span>{daily.calories}</span>
                  </div>
                </div>
                <div className="chart-protein">
                  <div className="bar-container">
                    <div 
                      className="protein-bar"
                      style={{ width: `${(daily.protein / nutritionGoals.protein_goal) * 100}%` }}
                    ></div>
                    <span>{daily.protein}g</span>
                  </div>
                </div>
                <div className="chart-carbs">
                  <div className="bar-container">
                    <div 
                      className="carb-bar"
                      style={{ width: `${(daily.carbs / nutritionGoals.carb_goal) * 100}%` }}
                    ></div>
                    <span>{daily.carbs}g</span>
                  </div>
                </div>
                <div className="chart-fat">
                  <div className="bar-container">
                    <div 
                      className="fat-bar"
                      style={{ width: `${(daily.fat / nutritionGoals.fat_goal) * 100}%` }}
                    ></div>
                    <span>{daily.fat}g</span>
                  </div>
                </div>
                <div className="chart-compliance">
                  <div className="compliance-indicator">
                    <div 
                      className="compliance-dot"
                      style={{ 
                        backgroundColor: compliance >= 90 ? '#28a745' : 
                                       compliance >= 70 ? '#ffc107' : '#dc3545' 
                      }}
                    ></div>
                    <span>{compliance.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nutrition Distribution Chart */}
      <div className="nutrition-distribution">
        <h2>Nutrition Distribution</h2>
        <div className="distribution-chart">
          <div className="macro-breakdown">
            <div className="macro-item">
              <div className="macro-label">Protein</div>
              <div className="macro-bar">
                <div 
                  className="macro-fill protein-fill"
                  style={{ width: `${(analytics.weekly_protein / (analytics.weekly_protein + analytics.weekly_carbs + analytics.weekly_fat * 9)) * 100}%` }}
                ></div>
              </div>
              <div className="macro-percentage">
                {((analytics.weekly_protein / (analytics.weekly_protein + analytics.weekly_carbs + analytics.weekly_fat * 9)) * 100).toFixed(1)}%
              </div>
            </div>
            
            <div className="macro-item">
              <div className="macro-label">Carbohydrates</div>
              <div className="macro-bar">
                <div 
                  className="macro-fill carb-fill"
                  style={{ width: `${(analytics.weekly_carbs / (analytics.weekly_protein + analytics.weekly_carbs + analytics.weekly_fat * 9)) * 100}%` }}
                ></div>
              </div>
              <div className="macro-percentage">
                {((analytics.weekly_carbs / (analytics.weekly_protein + analytics.weekly_carbs + analytics.weekly_fat * 9)) * 100).toFixed(1)}%
              </div>
            </div>
            
            <div className="macro-item">
              <div className="macro-label">Fat</div>
              <div className="macro-bar">
                <div 
                  className="macro-fill fat-fill"
                  style={{ width: `${((analytics.weekly_fat * 9) / (analytics.weekly_protein + analytics.weekly_carbs + analytics.weekly_fat * 9)) * 100}%` }}
                ></div>
              </div>
              <div className="macro-percentage">
                {(((analytics.weekly_fat * 9) / (analytics.weekly_protein + analytics.weekly_carbs + analytics.weekly_fat * 9)) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={clearError}>✕</button>
        </div>
      )}
    </div>
  );
};

export default Analytics; 