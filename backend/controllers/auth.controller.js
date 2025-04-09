//bookstoreapp/backend/controllers/auth.controller.js
import crypto from 'crypto';
import { sendVerificationEmail } from '../utils/emailService.js';

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    // Check if a user already exists
    const existingUser = await User.findOne({ email });

    if(existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create([{ 
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires

    }], { session });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        email: newUsers[0].email,
        isVerified: false
      }
    })
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}


export const verifyEmail =  async (req, res) => {
  try {
    const { token } = req.query;
    
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

      // Now issue JWT since user is verified
      const jw_token = jwt.sign(
        { userId: user._id }, 
        JWT_SECRET, 
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.status(200).json({
        success: true,
        message: 'Email verified successfully',
        data: {
          jw_token,
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            isVerified: true
          }
        }
      });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying email'
    });
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        token,
        user,
      }
    });
  } catch (error) {
    next(error);
  }
}

export const signOut = async (req, res, next) => {}