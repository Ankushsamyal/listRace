const { getDb } = require('../connect.cjs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { use } = require('react');
const { isEmail } = require('validator');
require('dotenv').config({ path: './config.env' });

// Password requirements configuration
const PASSWORD_CONFIG = {
  minLength: 8,
  requireUppercase: true,
  requireNumber: true,
  requireSpecialChar: true
};

// Helper function to validate password complexity
const validatePassword = (password) => {
  if (password.length < PASSWORD_CONFIG.minLength) {
    return { valid: false, message: `Password must be at least ${PASSWORD_CONFIG.minLength} characters` };
  }
  
  if (PASSWORD_CONFIG.requireUppercase && !/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (PASSWORD_CONFIG.requireNumber && !/\d/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  
  if (PASSWORD_CONFIG.requireSpecialChar && !/[@$!%*?&]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one special character (@$!%*?&)' };
  }
  
  return { valid: true };
};

const signup = async (req, res) => {
  console.log("req ",req.body)
  try {
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Request body is missing'
      });
    }

    const { email, password, confirmPassword,name, userRole } = req.body;
    
    // Validate required fields
    if (!email || !password || !confirmPassword || !name ) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'All fields are required'
      });
    }

    // Validate email format
    if (!isEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Please provide a valid email address'
      });
    }

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Passwords do not match'
      });
    }

    // Validate password complexity
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: passwordValidation.message
      });
    }

    const db = getDb();
    const loginCollection = db.collection('login');

    // Check for existing user in login collection
    const existingUser = await loginCollection.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'USER_EXISTS',
        message: 'An account with this email already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user in login collection
    const newUser = {
      name:name,
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null,
      userRole: userRole
    };

    const result = await loginCollection.insertOne(newUser);

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: result.insertedId,
        email: newUser.email,
        userRole: newUser.userRole
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
      }
    );

    // Return success response with token
    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        email: newUser.email,
        id: result.insertedId,
        userRole: newUser.userRole
      }
    });

  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
};

const login = async (req, res) => {
  try {
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Request body is missing'
      });
    }

    const { email, password } = req.body;


    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Email and password are required'
      });
    }

    const db = getDb();
    const loginCollection = db.collection('login');

    // Find user in login collection
    const user = await loginCollection.findOne({ 
      email: email.toLowerCase(),
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'AUTHENTICATION_ERROR',
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'AUTHENTICATION_ERROR',
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        userRole: user.userRole
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
      }
    );

    // Update last login time
    await loginCollection.updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    );

    // Return success response with token
    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        email: user.email,
        id: user._id,
        name:user.name,
        userRole: user.userRole
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
};

const logout = (req, res) => {
  return res.json({
    success: true,
    message: 'Logout successful (client should remove token)'
  });
};

module.exports = {
  signup,
  login,
  logout
};