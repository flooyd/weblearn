import mongoose from 'mongoose';
import { env } from '../../env';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {}
    
    // Debug logging (remove in production)
    console.log('Attempting to connect to MongoDB...');
    console.log('MONGODB_URI exists:', !!env.MONGODB_URI);
    console.log('MONGODB_URI starts with:', env.MONGODB_URI?.substring(0, 20) + '...');

    cached.promise = mongoose.connect(env.MONGODB_URI, options).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;