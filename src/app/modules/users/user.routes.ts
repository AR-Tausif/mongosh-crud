import express from 'express';
import { UserControllers } from './user.controllers';

const router = express.Router();
router.post('/', UserControllers.createUser);
router.get('/', UserControllers.retrieveUserList);
router.get('/:userId', UserControllers.retrieveSpecificUser);
router.put('/:userId', UserControllers.updateUser);
router.delete('/:userId', UserControllers.deleteUser);
router.get('/:userId/orders', UserControllers.getOrders);
router.put('/:userId/orders', UserControllers.addOrder);
router.get('/:userId/orders/total-price', UserControllers.getTotalPrice);

export const StudentRoute = router;
