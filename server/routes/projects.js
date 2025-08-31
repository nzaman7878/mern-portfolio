const express = require('express');
const { body } = require('express-validator');
const {
  getProjects,
  getProjectBySlug,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const projectValidation = [
  body('title').trim().isLength({ min: 3, max: 100 }),
  body('description').trim().isLength({ min: 10, max: 500 }),
  body('content').trim().isLength({ min: 10 }),
  body('category').isIn(['web', 'mobile', 'desktop', 'api', 'other']),
  body('technologies').optional().isArray(),
  body('status').optional().isIn(['planning', 'in-progress', 'completed', 'on-hold']),
  body('featured').optional().isBoolean(),
  body('published').optional().isBoolean()
];

// Public routes
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// Admin routes
router.get('/admin/all', requireAuth, requireAdmin, getAllProjects);
router.post('/', requireAuth, requireAdmin, projectValidation, createProject);
router.put('/:id', requireAuth, requireAdmin, projectValidation, updateProject);
router.delete('/:id', requireAuth, requireAdmin, deleteProject);

module.exports = router;
