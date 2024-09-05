import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

dotenv.config();

const jwt_secret = process.env.JWT_SECRET || '';

export const checkPassword = async (req: Request, res: Response) => {
  try {
    const { password, userId } = req.body;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
        error: true,
      });
    }

    const verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      return res
        .status(400)
        .json({ message: 'Please check password', error: true });
    }
    const tokenData = { id: user._id, email: user.email };
    const token = jwt.sign(tokenData, jwt_secret, { expiresIn: '1d' });

    const cookieOptions = {
      http: true,
      secure: true,
    };

    return res
      .cookie('token', token, cookieOptions)
      .status(200)
      .json({ message: 'Login successfully', token, success: true });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
};
