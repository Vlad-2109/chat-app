import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import bcryptjs from 'bcryptjs';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, profile_pic } = req.body;

    const checkEmail = await UserModel.findOne({ email });

    if (checkEmail) {
      return res
        .status(400)
        .json({ message: 'Email already exists', error: true });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      profile_pic,
      password: hashedPassword,
    };

    const user = new UserModel(payload);
    const userSave = await user.save();

    return res.status(201).json({
      message: 'User created successfully',
      data: userSave,
      success: true,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
};
