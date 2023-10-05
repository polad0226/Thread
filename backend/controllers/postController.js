import User from '../models/userModel.js';
import Post from '../models/postModel.js';
import bcrypt from 'bcrypt';
import generateTokeAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js';

const createPost = async (req, res) => {
  try {
    const { postedBy, text, img } = req.body;
    if (!postedBy || !text) {
      res.status(400).json({ message: 'Please fill all the fields' });
    }
    const user = await User.findById(postedBy);
    if (!user) {
      res.status(404).json({ message: 'User not Found' });
    }
    if (user._id.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'You are not authorized to Post' });
    }
    const maxLength = 500;
    if (text.length > maxLength) {
      res.status(400).json({ message: 'Text size should be less than 500' });
    }
    const newPost = new Post({ postedBy, text, img });
    await newPost.save();
    res.status(201).json({ message: 'Post Created successfully', newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('error in createPost');
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    }
    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const likePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    }
    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      await Post.findByIdAndUpdate(
        { _id: postId },
        { $pull: { likes: userId } }
      );
      res.status(200).json({ message: 'Post unLiked successfully' });
    } else {
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: 'Post liked successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: postId } = req.params;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;

    if (!text) {
      res.status(400).json({ message: 'Text field is required' });
    }

    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    }

    const reply = { userId, text, userProfilePic, username };
    post.replies.push(reply);
    await post.save();

    const userLikedPost = post.likes.includes(userId);

    res.status(200).json({ message: 'Replied to the Post Successfully' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }

    const following = user.following;
    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    res.status(200).json({ feedPosts });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export { createPost, getPost, deletePost, likePost, replyToPost, getFeedPosts };
