import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import generateTokeAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js';

const getUserProfile = async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username })
    .select('-password')
    .select('-updatedAt');

  if (!user) {
    res.status(200).json({ message: 'User not found' });
  }
  res.status(200).json({ user });
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('error in getUserProfile');
  }
};

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    if (newUser) {
      generateTokeAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ message: 'invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ''
    );
    if (!isPasswordCorrect || !user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    generateTokeAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logOutUser = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: 'User Logged Out' });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ error: 'You cannot follow/unfollow yourself' });

    if (!userToModify || !currentUser)
      return res.status(400).json({ error: 'User not found' });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // Unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: 'User unfollowed successfully' });
    } else {
      // Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(200).json({ message: 'User followed successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('Error in followUnFollowUser: ', err.message);
  }
};
const updateUser = async (req, res) => {
  try {
    const { name, email, password, username, profilePic, bio } = req.body;
    const userId = req.user._id;

    let user = await User.findById(userId);
    if (!user) {
      return res.json(400).json({ message: 'User not found' });
    }
    if (req.params.id !== userId.toString()) {
      return res
        .status(400)
        .json({ message: 'You cannot update people profile' });
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hashPassword(password, salt);
      user.password = hashedPassword;
    }
    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;
    user = await user.save();

    res.status(200).json({ message: 'profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: err.message });
    console.log('Error in updateUser: ', err.message);
  }
};

export {
  signupUser,
  loginUser,
  logOutUser,
  followUnFollowUser,
  updateUser,
  getUserProfile,
};
