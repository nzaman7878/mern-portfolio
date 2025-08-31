const express = require('express');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const { generateToken, requireAuth } = require('../middleware/auth');
const logger = require('../utils/logger');

const router = express.Router();

// Strict rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    message: 'Too many authentication attempts. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// POST /api/auth/login
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validation
    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password are required'
      });
    }
    
    // Find user (by username or email)
    const user = await User.findActiveUser(username.toLowerCase());
    
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }
    
    // Update login info
    await user.updateLoginInfo();
    
    // Generate token
    const token = generateToken({ userId: user._id });
    
    logger.info(`User ${user.username} logged in successfully`);
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    logger.error('Login error:', error.message);
    res.status(500).json({
      message: 'Login failed. Please try again.'
    });
  }
});

// GET /api/auth/me - Get current user info
router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        lastLogin: user.lastLogin,
        loginCount: user.loginCount,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    logger.error('Get user info error:', error.message);
    res.status(500).json({
      message: 'Failed to get user information'
    });
  }
});

// POST /api/auth/verify-token - Verify if token is valid
router.post('/verify-token', requireAuth, (req, res) => {
  res.json({
    message: 'Token is valid',
    user: {
      id: req.user._id,
      username: req.user.username,
      role: req.user.role
    }
  });
});

module.exports = router;
