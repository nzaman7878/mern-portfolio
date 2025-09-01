const { validationResult } = require('express-validator');
const Skill = require('../models/Skill');
const logger = require('../utils/logger');

// GET /api/skills - Get all published skills (public)
const getSkills = async (req, res) => {
  try {
    const { category, featured } = req.query;
    
    const query = { published: true };
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    
    const skills = await Skill.find(query)
      .populate('createdBy', 'username fullName')
      .sort('category order -proficiency');
    
    // Group by category
    const groupedSkills = skills.reduce((acc, skill) => {
      const cat = skill.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {});
    
    res.json({
      skills,
      grouped: groupedSkills,
      categories: [...new Set(skills.map(s => s.category))]
    });
  } catch (error) {
    logger.error('Get skills error:', error.message);
    res.status(500).json({ message: 'Failed to fetch skills' });
  }
};

// Admin-only routes

// GET /api/skills/admin/all - Get all skills (admin)
const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find()
      .populate('createdBy', 'username fullName')
      .sort('category order');
    
    res.json(skills);
  } catch (error) {
    logger.error('Get all skills error:', error.message);
    res.status(500).json({ message: 'Failed to fetch skills' });
  }
};

// POST /api/skills - Create skill (admin)
const createSkill = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const skillData = {
      ...req.body,
      createdBy: req.userId
    };
    
    const skill = new Skill(skillData);
    await skill.save();
    
    await skill.populate('createdBy', 'username fullName');
    
    logger.info(`Skill created: ${skill.name} by ${req.user.username}`);
    res.status(201).json(skill);
  } catch (error) {
    logger.error('Create skill error:', error.message);
    res.status(500).json({ message: 'Failed to create skill' });
  }
};

// PUT /api/skills/:id - Update skill (admin)
const updateSkill = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username fullName');
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    logger.info(`Skill updated: ${skill.name} by ${req.user.username}`);
    res.json(skill);
  } catch (error) {
    logger.error('Update skill error:', error.message);
    res.status(500).json({ message: 'Failed to update skill' });
  }
};

// DELETE /api/skills/:id - Delete skill (admin)
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    logger.info(`Skill deleted: ${skill.name} by ${req.user.username}`);
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    logger.error('Delete skill error:', error.message);
    res.status(500).json({ message: 'Failed to delete skill' });
  }
};

module.exports = {
  getSkills,
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill
};
