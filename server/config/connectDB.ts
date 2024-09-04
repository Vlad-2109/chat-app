import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log('MongoDB is connected');

    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('Connected to DB');
    });

    connection.on('error', (error) => {
      console.log('Something is wrong in mongodb', error);
    });
  } catch (error) {
    console.log('Something is wrong', error);
  }
};
