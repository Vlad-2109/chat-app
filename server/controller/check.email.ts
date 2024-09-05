import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';

export const checkEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const checkEmail = await UserModel.findOne({ email }).select('-password');

    if (!checkEmail) {
      return res
        .status(400)
        .json({ message: `User doesn't exist`, error: true });
    }

    return res
      .status(200)
      .json({ message: 'email is verified', success: true, data: checkEmail });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
};
