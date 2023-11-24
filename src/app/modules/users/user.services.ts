import { User } from './user.interfaces';
import { UserModel } from './user.models';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
