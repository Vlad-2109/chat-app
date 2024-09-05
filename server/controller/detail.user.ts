import { Request, Response } from 'express';
import { getUserDetailsFromToken } from '../helpers/getUserDetailsFromToken';

export const userDetails = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token || '';

    const user = await getUserDetailsFromToken(token);

    return res.status(200).json({ message: 'User details', data: user });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
};
