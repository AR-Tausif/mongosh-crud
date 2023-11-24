import { Request, Response } from 'express';
import { UserServices } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await UserServices.createUserIntoDB(userData);
    const { password, ...withoutPass } = result.toObject(); //Newly created user object. Make sure that the password field is not included in the response data.
    res.status(200).json({
      success: true,
      massage: 'student created succesfully',
      data: withoutPass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Somethig went wrong...',
      error,
    });
  }
};

export const UserControllers = {
  createUser,
};
