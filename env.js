import dotenv from 'dotenv';

// Load environment variables from .env file
const result = dotenv.config();

if (result.error) {
  console.error('Error loading .env file', result.error);
} else {
  console.log('Environment variables loaded successfully');
}
console.log(process.env.MONGODB_URI);
export const env = process.env;