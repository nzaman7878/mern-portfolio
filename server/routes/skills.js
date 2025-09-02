const express = require('express');
const { body } = require('express-validator');
const {
  getSkills,
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skillController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const skillValidation = [
  body('name').trim().isLength({ min: 2, max: 50 }),
  body('category').isIn(['frontend', 'backend', 'database', 'devops', 'design', 'other']),
  body('proficiency').isInt({ min: 1, max: 10 }),
  body('experience').optional().isIn(['beginner', 'intermediate', 'advanced', 'expert']),
  body('yearsOfExperience').optional().isInt({ min: 0 }),
  body('description').optional().isLength({ max: 200 }),
  body('color').optional().matches(/^#[0-9A-F]{6}$/i)
];

// Public routes
router.get('/', getSkills);

// Admin routes
router.get('/admin/all', requireAuth, requireAdmin, getAllSkills);
router.post('/', requireAuth, requireAdmin, skillValidation, createSkill);
router.put('/:id', requireAuth, requireAdmin, skillValidation, updateSkill);
router.delete('/:id', requireAuth, requireAdmin, deleteSkill);

module.exports = router;
