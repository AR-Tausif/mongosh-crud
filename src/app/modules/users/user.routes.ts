import express from 'express';
import { UserControllers } from './user.controllers';

const router = express.Router();
router.post('/', UserControllers.createUser);
router.get('/', UserControllers.retrieveUserList);

export const StudentRoute = router;
