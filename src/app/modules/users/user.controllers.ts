import { Request, Response } from 'express';
import { UserServices } from './user.services';
import { UserModel } from './user.models';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await UserServices.createUserIntoDB(userData);
    const { password, ...withoutPass } = result.toObject(); //Newly created user object. Make sure that the password field is not included in the response data.
    res.status(200).json({
      success: true,
      message: 'User created succesfully',
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


const retrieveUserList = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({}).select({
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    });

    res.json({
      success: true,
      message: 'Users fetched successfully!',
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Internal Server Error',
      },
    });
  }
};

const retrieveSpecificUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const user = await UserModel.findOne({ userId }, '-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Internal Server Error',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;

  try {
    // Find the user by userId
    const user = await UserModel.findOne({ userId });

    // If user not found, return an error
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // Update user fields with new data
    Object.assign(user, updatedUserData);

    // Save the updated user
    await user.save();

    // Exclude password field in the response
    const { password, ...updatedUser } = user.toObject();

    // Respond with success message and updated user data
    res.json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser,
    });
  } catch (error) {
    // Handle internal server error
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Internal Server Error',
      },
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    // Find the user by userId
    const user = await UserModel.findOne({ userId });

    // If user not found, return an error
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // Remove the user from the database
    await UserModel.deleteOne({ userId });

    // Respond with success message and null data
    res.json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    // Handle internal server error
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Internal Server Error',
      },
    });
  }
};

const addOrder = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { productName, price, quantity } = req.body;

  try {
    // Find the user by userId
    const user = await UserModel.findOne({ userId });

    // If user not found, return an error
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // Check if 'orders' property exists, if not, create it
    if (!user.orders) {
      user.orders = [];
    }

    // Append the new order to the 'orders' array
    user.orders.push({
      productName,
      price,
      quantity,
    });

    // Save the updated user
    await user.save();

    // Respond with success message and null data
    res.json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    // Handle internal server error
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Internal Server Error',
      },
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  const { usersId } = req.params;
  try {
    const userOrdrs = await UserModel.findOne({ usersId }, 'orders');
    res.status(200).json({
      success: true,
      message: 'User orders retrieved succssfully',
      data: userOrdrs,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'Oppps, User no found...',
      error,
    });
  }
};

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const totalPriceResult = await UserModel.aggregate([
      //Stage-1 for query one data
      { $match: { userId: userId } },
      //Stage-2 for separated data from orders array
      { $unwind: '$orders' },
      //Stage-3
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
          },
        },
      },
      { $project: { _id: 0, totalPrice: 1 } },
    ]);

    if (totalPriceResult.length === 0) {
      res.status(404).json({
        success: false,
        message: 'OPPS, user not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: totalPriceResult,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'Something went wrong...',
      error,
    });
  }
};
export const UserControllers = {
  createUser,
  retrieveUserList,
  retrieveSpecificUser,
  updateUser,
  deleteUser,
  addOrder,
  getOrders,
  getTotalPrice,
};
