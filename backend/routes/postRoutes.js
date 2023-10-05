import express from 'express';
import {
  createPost,
  getPost,
  deletePost,
  likePost,
  replyToPost,
  getFeedPosts,
} from '../controllers/postController.js';
import protectRoute from '../middlewares/protectRoute.js';
const router = express.Router();

router.get('/feed', protectRoute, getFeedPosts);
router.get('/:id', getPost);
router.delete('/:id', protectRoute, deletePost);
router.post('/create', protectRoute, createPost);
router.post('/like/:id', protectRoute, likePost);
router.post('/reply/:id', protectRoute, replyToPost);

export default router;
