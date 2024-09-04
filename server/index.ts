import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/connectDB';
import router from './router/index';

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use('/api', router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
