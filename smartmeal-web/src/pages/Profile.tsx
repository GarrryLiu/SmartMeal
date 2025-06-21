import React, { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import './Profile.css';

const Profile: React.FC = () => {
  const { userProfile, loadUserProfile, isLoading, error, clearError } = useAppStore();

  useEffect(() => {
    if (!userProfile) {
      loadUserProfile();
    }
  }, [userProfile, loadUserProfile]);

  if (isLoading) {
    return (
      <div className="profile">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading personal profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="profile">
        <div className="empty-state">
          <h2>Unable to load personal profile</h2>
          <p>Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {userProfile.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="profile-info">
          <h1>{userProfile.name}</h1>
          <p className="profile-email">{userProfile.email}</p>
          <div className="profile-meta">
            <span className="member-since">Member since {userProfile.member_since}</span>
            <span className="plan-type">{userProfile.plan_type === 'premium' ? 'Premium' : 'Free'}</span>
          </div>
        </div>
      </div>

      <div className="profile-content">
        {/* Personal Preferences */}
        <div className="profile-section">
          <h2>Preferences</h2>
          <div className="preferences-grid">
            <div className="preference-item">
              <h3>Cuisine Preferences</h3>
              <div className="preference-tags">
                {userProfile.preferences.cuisine_preferences.map((cuisine, index) => (
                  <span key={index} className="preference-tag">{cuisine}</span>
                ))}
              </div>
            </div>

            <div className="preference-item">
              <h3>Allergies</h3>
              <div className="preference-tags">
                {userProfile.preferences.allergies.map((allergy, index) => (
                  <span key={index} className="preference-tag allergy">{allergy}</span>
                ))}
              </div>
            </div>

            <div className="preference-item">
              <h3>Dietary Restrictions</h3>
              <div className="preference-tags">
                {userProfile.preferences.dietary_restrictions.map((restriction, index) => (
                  <span key={index} className="preference-tag restriction">{restriction}</span>
                ))}
              </div>
            </div>

            <div className="preference-item">
              <h3>Cooking Frequency</h3>
              <div className="preference-value">
                {userProfile.preferences.cooking_frequency === 'daily' && 'Daily'}
                {userProfile.preferences.cooking_frequency === 'weekdays' && 'Weekdays'}
                {userProfile.preferences.cooking_frequency === 'weekends' && 'Weekends'}
              </div>
            </div>

            <div className="preference-item">
              <h3>Household Size</h3>
              <div className="preference-value">{userProfile.preferences.household_size} people</div>
            </div>
          </div>
        </div>

        {/* Nutrition Goals */}
        <div className="profile-section">
          <h2>Nutrition Goals</h2>
          <div className="nutrition-goals">
            <div className="goal-item">
              <div className="goal-icon">🔥</div>
              <div className="goal-content">
                <h3>Daily Calories</h3>
                <div className="goal-value">{userProfile.nutrition_goals.daily_calories.toLocaleString()}</div>
                <div className="goal-unit">kcal</div>
              </div>
            </div>

            <div className="goal-item">
              <div className="goal-icon">🥩</div>
              <div className="goal-content">
                <h3>Protein Goal</h3>
                <div className="goal-value">{userProfile.nutrition_goals.protein_goal}</div>
                <div className="goal-unit">g/day</div>
              </div>
            </div>

            <div className="goal-item">
              <div className="goal-icon">🍞</div>
              <div className="goal-content">
                <h3>Carb Goal</h3>
                <div className="goal-value">{userProfile.nutrition_goals.carb_goal}</div>
                <div className="goal-unit">g/day</div>
              </div>
            </div>

            <div className="goal-item">
              <div className="goal-icon">🥑</div>
              <div className="goal-content">
                <h3>Fat Goal</h3>
                <div className="goal-value">{userProfile.nutrition_goals.fat_goal}</div>
                <div className="goal-unit">g/day</div>
              </div>
            </div>

            <div className="goal-item">
              <div className="goal-icon">🌾</div>
              <div className="goal-content">
                <h3>Fiber Goal</h3>
                <div className="goal-value">{userProfile.nutrition_goals.fiber_goal}</div>
                <div className="goal-unit">g/day</div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Features */}
        <div className="profile-section">
          <h2>Premium Features</h2>
          <div className="premium-features">
            <div className="feature-item locked">
              <div className="feature-icon">👨‍⚕️</div>
              <div className="feature-content">
                <h3>Dietitian Customization</h3>
                <p>Get personalized guidance from a professional dietitian</p>
                <span className="feature-status">Coming Soon</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div className="feature-content">
                <h3>Detailed Nutrition Analytics</h3>
                <p>In-depth analysis of your nutrition intake</p>
                <span className="feature-status available">Enabled</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🛒</div>
              <div className="feature-content">
                <h3>Smart Shopping List</h3>
                <p>Automatically generate optimized shopping lists</p>
                <span className="feature-status available">Enabled</span>
              </div>
            </div>

            <div className="feature-item locked">
              <div className="feature-icon">📱</div>
              <div className="feature-content">
                <h3>Mobile App</h3>
                <p>Access your meal plan anytime, anywhere</p>
                <span className="feature-status">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="profile-section">
          <h2>Account Settings</h2>
          <div className="account-actions">
            <button className="action-button">
              ✏️ Edit Profile
            </button>
            <button className="action-button">
              🔒 Privacy Settings
            </button>
            <button className="action-button">
              📧 Notification Settings
            </button>
            <button className="action-button danger">
              🚪 Log Out
            </button>
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

export default Profile; 