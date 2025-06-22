'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

// Sample data for charts
const nutritionData = [
  { name: 'Carbohydrates', value: 45, color: '#9cb481' },
  { name: 'Proteins', value: 25, color: '#f4a261' },
  { name: 'Fats', value: 20, color: '#7a9365' },
  { name: 'Fiber', value: 10, color: '#e8956b' },
];

const budgetData = [
  { month: 'Jan', planned: 400, actual: 340 },
  { month: 'Feb', planned: 420, actual: 380 },
  { month: 'Mar', planned: 450, actual: 390 },
  { month: 'Apr', planned: 400, actual: 320 },
  { month: 'May', planned: 430, actual: 350 },
  { month: 'Jun', planned: 410, actual: 310 },
];

const healthGoalsData = [
  { name: 'High Protein', achieved: 85, fill: '#9cb481' },
  { name: 'Low Sodium', achieved: 92, fill: '#f4a261' },
  { name: 'High Fiber', achieved: 78, fill: '#7a9365' },
  { name: 'Balanced Diet', achieved: 95, fill: '#e8956b' },
];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('nutrition');

  const tabs = [
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'budget', name: 'Budget Tracking' },
    { id: 'health', name: 'Health Goals' },
  ];

  const renderNutritionChart = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="card-title text-gray-900 mb-2">Daily Nutrition Breakdown</h3>
        <p className="font-body text-gray-600">Average distribution of macronutrients in your meals</p>
      </div>
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={nutritionData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label={({ name, value }: { name: string; value: number }) => `${name}: ${value}%`}
            >
              {nutritionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {nutritionData.map((item, index) => (
          <div key={item.name} className="text-center p-4 bg-gray-50 rounded-xl">
            <div 
              className="w-4 h-4 rounded-full mx-auto mb-2"
              style={{ backgroundColor: item.color }}
            />
            <p className="font-body font-semibold text-gray-900">{item.name}</p>
            <p className="font-body text-gray-600">{item.value}%</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBudgetChart = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="card-title text-gray-900 mb-2">Budget vs Actual Spending</h3>
        <p className="font-body text-gray-600">Track your meal budget savings over time</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={budgetData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px',
              fontFamily: 'Work Sans'
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="planned" 
            stroke="#9cb481" 
            strokeWidth={3}
            name="Planned Budget"
            dot={{ fill: '#9cb481', strokeWidth: 2, r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#f4a261" 
            strokeWidth={3}
            name="Actual Spending"
            dot={{ fill: '#f4a261', strokeWidth: 2, r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-green-light rounded-xl">
          <p className="font-body font-semibold text-gray-900">Average Savings</p>
          <p className="font-title text-2xl font-bold" style={{ color: '#7a9365' }}>$67</p>
          <p className="font-body text-gray-600">per month</p>
        </div>
        <div className="text-center p-4 bg-orange-secondary-light rounded-xl">
          <p className="font-body font-semibold text-gray-900">Total Saved</p>
          <p className="font-title text-2xl font-bold" style={{ color: '#e8956b' }}>$402</p>
          <p className="font-body text-gray-600">this year</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="font-body font-semibold text-gray-900">Savings Rate</p>
          <p className="font-title text-2xl font-bold text-gray-900">17%</p>
          <p className="font-body text-gray-600">below budget</p>
        </div>
      </div>
    </div>
  );

  const renderHealthGoalsChart = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="card-title text-gray-900 mb-2">Health Goals Progress</h3>
        <p className="font-body text-gray-600">How well you're meeting your nutrition objectives</p>
      </div>
      
      {/* Radial Progress Chart */}
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={400}>
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="20%" 
            outerRadius="80%" 
            data={healthGoalsData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar 
              dataKey="achieved" 
              cornerRadius={10}
              label={{ position: 'insideStart', fill: '#fff', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                fontFamily: 'Work Sans'
              }}
              formatter={(value: number) => [`${value}%`, 'Progress']}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {healthGoalsData.map((item, index) => (
          <div key={item.name} className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="mb-3">
              <div className="relative w-16 h-16 mx-auto">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-current"
                    stroke={item.fill}
                    strokeWidth="3"
                    strokeDasharray={`${item.achieved}, 100`}
                    strokeLinecap="round"
                    fill="transparent"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-900">{item.achieved}%</span>
                </div>
              </div>
            </div>
            <p className="font-body font-semibold text-gray-900 text-sm">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'nutrition':
        return renderNutritionChart();
      case 'budget':
        return renderBudgetChart();
      case 'health':
        return renderHealthGoalsChart();
      default:
        return renderNutritionChart();
    }
  };

  return (
    <div className="min-h-screen bg-soft-grey">
      <div className="page-container">
        {/* Title - Matching Profile Page Style */}
        <div className="flex justify-center items-center mb-8">
          <h1 className="title-medium text-gray-900 text-4xl">Your Analytics</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-body font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                style={activeTab === tab.id ? { 
                  backgroundColor: tabs.indexOf(tab) % 2 === 0 ? '#9cb481' : '#f4a261' 
                } : {}}
              >
                <span className="text-lg">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chart Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
} 