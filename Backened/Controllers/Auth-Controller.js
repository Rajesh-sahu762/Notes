const UserModel = require("../models/Auth-model.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
  try {
    console.log('Register request body:', req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing username, email or password' });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hash = await bcrypt.hashSync(password, 10);
    const NewUser = new UserModel({ username, email, password: hash });
    await NewUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }

}

const logout = async (req, res) => {
  try {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};

module.exports = { register, login, logout };