// Configuration for application URLs
export const config = {
  // Development URLs
  development: {
    app: 'http://localhost:3000',
    api: 'http://localhost:8000'
  },
  
  // Production URLs - Update these with your actual deployed URLs
  production: {
    app: process.env.NEXT_PUBLIC_APP_URL || 'https://smart-meal-fbsu-git-main-garys-projects-5b955e64.vercel.app',
    api: process.env.NEXT_PUBLIC_API_URL || 'https://your-api-domain.com'  // Replace with your actual API URL
  }
};

// Get the appropriate URL based on environment
export const getAppUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return config.production.app;
  }
  return config.development.app;
};

export const getApiUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return config.production.api;
  }
  return config.development.api;
}; 