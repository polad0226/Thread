import express from 'express';
import {
  loginUser,
  signupUser,
  logOutUser,
  followUnFollowUser,
  updateUser,
  getUserProfile,
} from '../controllers/userController.js';

import protectRoute from '../middlewares/protectRoute.js';
const router = express.Router();

router.get('/profile/:username', getUserProfile);

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logOutUser);
router.post('/follow/:id', protectRoute, followUnFollowUser);
router.post('/update/:id', protectRoute, updateUser);

export default router;
