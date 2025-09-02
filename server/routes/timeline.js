const express = require('express');
const { body } = require('express-validator');
const {
  getTimeline,
  getAllTimelineItems,
  createTimelineItem,
  updateTimelineItem,
  deleteTimelineItem
} = require('../controllers/timelineController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const timelineValidation = [
  body('title').trim().isLength({ min: 3, max: 100 }),
  body('description').trim().isLength({ min: 10, max: 1000 }),
  body('type').isIn(['education', 'experience', 'project', 'achievement', 'certification', 'other']),
  body('startDate').isISO8601(),
  body('endDate').optional().isISO8601(),
  body('company').optional().trim().isLength({ max: 80 }),
  body('location').optional().trim().isLength({ max: 100 }),
  body('current').optional().isBoolean()
];

// Public routes
router.get('/', getTimeline);

// Admin routes
router.get('/admin/all', requireAuth, requireAdmin, getAllTimelineItems);
router.post('/', requireAuth, requireAdmin, timelineValidation, createTimelineItem);
router.put('/:id', requireAuth, requireAdmin, timelineValidation, updateTimelineItem);
router.delete('/:id', requireAuth, requireAdmin, deleteTimelineItem);

module.exports = router;
