const express = require('express');
const { body } = require('express-validator');
const {
  contactLimiter,
  submitContactMessage,
  getAllContactMessages,
  getContactMessage,
  updateContactMessage,
  deleteContactMessage
} = require('../controllers/contactController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Validation rules for contact form
const contactValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }),
  body('email').isEmail().normalizeEmail(),
  body('subject').trim().isLength({ min: 5, max: 150 }),
  body('message').trim().isLength({ min: 10, max: 2000 }),
  body('phone').optional().trim(),
  body('company').optional().trim().isLength({ max: 100 })
];

// Public routes
router.post('/', contactLimiter, contactValidation, submitContactMessage);

// Admin routes
router.get('/admin/all', requireAuth, requireAdmin, getAllContactMessages);
router.get('/admin/:id', requireAuth, requireAdmin, getContactMessage);
router.put('/admin/:id', requireAuth, requireAdmin, updateContactMessage);
router.delete('/admin/:id', requireAuth, requireAdmin, deleteContactMessage);

module.exports = router;
