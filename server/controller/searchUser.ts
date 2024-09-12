import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';

export const searchUser = async (req: Request, res: Response) => {
  try {
    const { search } = req.body;

    const query = new RegExp(search, 'i');

    const user = await UserModel.find({
      $or: [{ name: query }, { email: query }],
    }).select('-password');

    return res.json({ message: 'all user', data: user, success: true });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
};
