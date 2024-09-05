import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

dotenv.config();

const jwt_secret = process.env.JWT_SECRET || '';

export const getUserDetailsFromToken = async (token: string) => {
  if (!token) {
    return {
      message: 'session out',
      logout: true,
    };
  }

  const decode = jwt.verify(token, jwt_secret) as JwtPayload;

  const user = await UserModel.findById(decode.id).select('-password');

  return user;
};
