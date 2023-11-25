import { User } from './user.interfaces';
import { UserModel } from './user.models';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const RetrieveUsersFromDB = async () => {
  const result = await UserModel.find({});
  return result;
};
export const UserServices = {
  createUserIntoDB,
  RetrieveUsersFromDB,
};
