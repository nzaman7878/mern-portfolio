const { validationResult } = require('express-validator');
const TimelineItem = require('../models/TimelineItem');
const logger = require('../utils/logger');

// GET /api/timeline - Get published timeline items (public)
const getTimeline = async (req, res) => {
  try {
    const { type, featured } = req.query;
    
    const query = { published: true };
    if (type) query.type = type;
    if (featured === 'true') query.featured = true;
    
    const timeline = await TimelineItem.find(query)
      .populate('createdBy', 'username fullName')
      .sort('-startDate order');
    
    res.json(timeline);
  } catch (error) {
    logger.error('Get timeline error:', error.message);
    res.status(500).json({ message: 'Failed to fetch timeline' });
  }
};

// Admin-only routes

// GET /api/timeline/admin/all - Get all timeline items (admin)
const getAllTimelineItems = async (req, res) => {
  try {
    const timeline = await TimelineItem.find()
      .populate('createdBy', 'username fullName')
      .sort('-startDate');
    
    res.json(timeline);
  } catch (error) {
    logger.error('Get all timeline items error:', error.message);
    res.status(500).json({ message: 'Failed to fetch timeline items' });
  }
};

// POST /api/timeline - Create timeline item (admin)
const createTimelineItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const timelineData = {
      ...req.body,
      createdBy: req.userId
    };
    
    const timelineItem = new TimelineItem(timelineData);
    await timelineItem.save();
    
    await timelineItem.populate('createdBy', 'username fullName');
    
    logger.info(`Timeline item created: ${timelineItem.title} by ${req.user.username}`);
    res.status(201).json(timelineItem);
  } catch (error) {
    logger.error('Create timeline item error:', error.message);
    res.status(500).json({ message: 'Failed to create timeline item' });
  }
};

// PUT /api/timeline/:id - Update timeline item (admin)
const updateTimelineItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const timelineItem = await TimelineItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username fullName');
    
    if (!timelineItem) {
      return res.status(404).json({ message: 'Timeline item not found' });
    }
    
    logger.info(`Timeline item updated: ${timelineItem.title} by ${req.user.username}`);
    res.json(timelineItem);
  } catch (error) {
    logger.error('Update timeline item error:', error.message);
    res.status(500).json({ message: 'Failed to update timeline item' });
  }
};

// DELETE /api/timeline/:id - Delete timeline item (admin)
const deleteTimelineItem = async (req, res) => {
  try {
    const timelineItem = await TimelineItem.findByIdAndDelete(req.params.id);
    
    if (!timelineItem) {
      return res.status(404).json({ message: 'Timeline item not found' });
    }
    
    logger.info(`Timeline item deleted: ${timelineItem.title} by ${req.user.username}`);
    res.json({ message: 'Timeline item deleted successfully' });
  } catch (error) {
    logger.error('Delete timeline item error:', error.message);
    res.status(500).json({ message: 'Failed to delete timeline item' });
  }
};

module.exports = {
  getTimeline,
  getAllTimelineItems,
  createTimelineItem,
  updateTimelineItem,
  deleteTimelineItem
};
