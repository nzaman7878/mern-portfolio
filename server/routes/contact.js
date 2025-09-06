const express = require('express');
const {
  contactRateLimit,
  honeypotRateLimit,
  contactValidationRules,
  spamDetection,
  handleValidationErrors
} = require('../middleware/validateContact');

const {
  submitContactMessage,
  getAllContactMessages,
  getContactMessage,
  updateContactMessage,
  deleteContactMessage,
  markAsReplied
} = require('../controllers/contactController');

const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/', 
  honeypotRateLimit,
  contactRateLimit,
  contactValidationRules,
  handleValidationErrors,
  spamDetection,
  submitContactMessage
);

// Admin routes
router.get('/admin/all', requireAuth, requireAdmin, getAllContactMessages);
router.get('/admin/:id', requireAuth, requireAdmin, getContactMessage);
router.put('/admin/:id', requireAuth, requireAdmin, updateContactMessage);
router.put('/admin/:id/reply', requireAuth, requireAdmin, markAsReplied);
router.delete('/admin/:id', requireAuth, requireAdmin, deleteContactMessage);

module.exports = router;
