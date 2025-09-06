const { validationResult } = require('express-validator');
const ContactMessage = require('../models/ContactMessage');
const emailService = require('../utils/emailService');
const logger = require('../utils/logger');

// POST /api/contact - Submit contact message (public)
const submitContactMessage = async (req, res) => {
  try {
    // Extract client info
    const clientInfo = {
      ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
      referer: req.get('Referer') || '',
    };

    const messageData = {
      ...req.body,
      ...clientInfo,
      // Remove honeypot field
      website: undefined
    };

    // Create contact message
    const contactMessage = new ContactMessage(messageData);
    await contactMessage.save();

    // Send email notifications (async, don't block response)
    Promise.all([
      emailService.sendContactNotification(contactMessage),
      emailService.sendAutoReply(contactMessage)
    ]).catch(error => {
      logger.error('Email notification failed:', error);
      // Don't fail the request if email fails
    });

    logger.info(`Contact message received from ${contactMessage.email} (${contactMessage.name})`);

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      id: contactMessage._id
    });
  } catch (error) {
    logger.error('Submit contact message error:', error);
    
    // Handle duplicate submissions
    if (error.code === 11000) {
      return res.status(429).json({
        success: false,
        message: 'Duplicate message detected. Please wait before submitting again.'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
};

// GET /api/contact/admin/all - Get all contact messages (admin)
const getAllContactMessages = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      priority,
      search,
      startDate,
      endDate,
      sort = '-createdAt'
    } = req.query;

    // Build query
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

    // Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const options = {
      page: parseInt(page),
      limit: Math.min(parseInt(limit), 100), // Cap at 100
      sort,
    };

    const messages = await ContactMessage.find(query)
      .sort(sort)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .lean(); // Use lean for better performance

    const total = await ContactMessage.countDocuments(query);

    // Get stats
    const stats = await ContactMessage.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          unread: {
            $sum: { $cond: [{ $eq: ['$status', 'unread'] }, 1, 0] }
          },
          thisWeek: {
            $sum: {
              $cond: [
                { $gte: ['$createdAt', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    res.json({
      success: true,
      messages,
      pagination: {
        page: options.page,
        pages: Math.ceil(total / options.limit),
        limit: options.limit,
        total
      },
      stats: stats[0] || { total: 0, unread: 0, thisWeek: 0 }
    });
  } catch (error) {
    logger.error('Get contact messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact messages'
    });
  }
};

// GET /api/contact/admin/:id - Get contact message by ID (admin)
const getContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    // Mark as read if it was unread
    if (message.status === 'unread') {
      message.status = 'read';
      await message.save();
    }

    res.json({
      success: true,
      message
    });
  } catch (error) {
    logger.error('Get contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact message'
    });
  }
};

// PUT /api/contact/admin/:id - Update contact message (admin)
const updateContactMessage = async (req, res) => {
  try {
    const allowedUpdates = ['status', 'priority', 'tags', 'notes', 'replied', 'repliedAt'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // Auto-set repliedAt when marked as replied
    if (updates.status === 'replied' || updates.replied === true) {
      updates.replied = true;
      updates.repliedAt = new Date();
    }

    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    logger.info(`Contact message updated by ${req.user.username}: ${message._id}`);
    
    res.json({
      success: true,
      message
    });
  } catch (error) {
    logger.error('Update contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact message'
    });
  }
};

// DELETE /api/contact/admin/:id - Delete contact message (admin)
const deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    logger.info(`Contact message deleted by ${req.user.username}: ${message.email}`);
    
    res.json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    logger.error('Delete contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact message'
    });
  }
};

// PUT /api/contact/admin/:id/reply - Mark as replied (admin)
const markAsReplied = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    await message.markAsReplied();

    res.json({
      success: true,
      message: 'Message marked as replied'
    });
  } catch (error) {
    logger.error('Mark as replied error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark message as replied'
    });
  }
};

module.exports = {
  submitContactMessage,
  getAllContactMessages,
  getContactMessage,
  updateContactMessage,
  deleteContactMessage,
  markAsReplied
};
