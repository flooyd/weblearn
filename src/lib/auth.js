import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import Element from './models/element.js';
import User from './models/user.js';

const JWT_SECRET = 'your-secret-key';

export const authService = {
  async register(credentials) {
    const { username, password } = credentials;

    // Check if the username already exists
    const existingUser = await User.findOne({ username }).exec();

    if (existingUser) {
      throw new Error('Username already exists');
    }

    const userId = uuidv4();
    const hashedPassword = await hashPassword(password);

    const user = new User({
      username,
      password: hashedPassword
    })

    await user.save();

    return { token: generateToken(userId) };
  },

  async login(credentials) {
    const { username, password } = credentials;
    const user = await User.findOne({ username }).exec();

    if (!user || !(await comparePasswords(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    return { token: generateToken(user._id), username: user.username };
  },

  async verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
};

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
}