import dotenv from 'dotenv';

// Only load .env file in development (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
  const result = dotenv.config();
  
  if (result.error) {
    console.error('Error loading .env file', result.error);
  } else {
    console.log('Environment variables loaded successfully');
  }
}

// Verify that required environment variables are present
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI environment variable is not set');
}

console.log('MONGODB_URI is', process.env.MONGODB_URI ? 'set' : 'NOT set');

export const env = process.env;