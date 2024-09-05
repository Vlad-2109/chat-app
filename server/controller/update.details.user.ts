import { Request, Response } from 'express';
import { getUserDetailsFromToken } from '../helpers/getUserDetailsFromToken';
import { UserModel } from '../models/user.model';

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token || '';

    const user = await getUserDetailsFromToken(token);

    if (user && '_id' in user) {
      const { name, profile_pic } = req.body;

      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: user?._id },
        { name, profile_pic },
        { new: true },
      );

      return res.json({
        message: 'User has updated successfully',
        data: updatedUser,
        success: true,
      });
    } else {
      return {
        message: 'session out',
        logout: true,
      };
    }
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
};
