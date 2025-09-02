const { validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const ContactMessage = require('../models/ContactMessage');
const logger = require('../utils/logger');

// Strict rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 messages per hour per IP
  message: {
    message: 'Too many contact messages. Please try again in an hour.'
  }
});

// POST /api/contact - Submit contact message (public)
const submitContactMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const messageData = {
      ...req.body,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || ''
    };
    
    const contactMessage = new ContactMessage(messageData);
    await contactMessage.save();
    
    logger.info(`Contact message received from ${contactMessage.email}`);
    
    res.status(201).json({
      message: 'Message sent successfully! I\'ll get back to you soon.',
      id: contactMessage._id
    });
  } catch (error) {
    logger.error('Submit contact message error:', error.message);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
};

// Admin-only routes

// GET /api/contact/admin/all - Get all contact messages (admin)
const getAllContactMessages = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      priority,
      search
    } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }
    
    const messages = await ContactMessage.find(query)
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await ContactMessage.countDocuments(query);
    const unreadCount = await ContactMessage.countDocuments({ status: 'unread' });
    
    res.json({
      messages,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit),
        total
      },
      stats: {
        total,
        unread: unreadCount
      }
    });
  } catch (error) {
    logger.error('Get contact messages error:', error.message);
    res.status(500).json({ message: 'Failed to fetch contact messages' });
  }
};

// GET /api/contact/admin/:id - Get contact message by ID (admin)
const getContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    
    // Mark as read if it was unread
    if (message.status === 'unread') {
      await message.markAsRead();
    }
    
    res.json(message);
  } catch (error) {
    logger.error('Get contact message error:', error.message);
    res.status(500).json({ message: 'Failed to fetch contact message' });
  }
};

// PUT /api/contact/admin/:id - Update contact message (admin)
const updateContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!message) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    
    logger.info(`Contact message updated by ${req.user.username}`);
    res.json(message);
  } catch (error) {
    logger.error('Update contact message error:', error.message);
    res.status(500).json({ message: 'Failed to update contact message' });
  }
};

// DELETE /api/contact/admin/:id - Delete contact message (admin)
const deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    
    logger.info(`Contact message deleted by ${req.user.username}`);
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    logger.error('Delete contact message error:', error.message);
    res.status(500).json({ message: 'Failed to delete contact message' });
  }
};

module.exports = {
  contactLimiter,
  submitContactMessage,
  getAllContactMessages,
  getContactMessage,
  updateContactMessage,
  deleteContactMessage
};
