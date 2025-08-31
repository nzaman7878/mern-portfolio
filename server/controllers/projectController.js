const { validationResult } = require('express-validator');
const Project = require('../models/Project');
const logger = require('../utils/logger');

// GET /api/projects - Get all projects (public)
const getProjects = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      featured,
      search,
      sort = '-createdAt'
    } = req.query;
    
    // Build query
    const query = { published: true };
    
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort,
      populate: 'createdBy',
      select: '-content' // Exclude full content from list view
    };
    
    const projects = await Project.find(query)
      .populate('createdBy', 'username fullName')
      .select('-content')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Project.countDocuments(query);
    
    res.json({
      projects,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit),
        total
      }
    });
  } catch (error) {
    logger.error('Get projects error:', error.message);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

// GET /api/projects/:slug - Get project by slug (public)
const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ 
      slug: req.params.slug, 
      published: true 
    }).populate('createdBy', 'username fullName');
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Increment views (don't await to avoid slowing response)
    project.incrementViews().catch(err => 
      logger.error('Failed to increment views:', err.message)
    );
    
    res.json(project);
  } catch (error) {
    logger.error('Get project by slug error:', error.message);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
};

// Admin-only routes below this point

// GET /api/projects/admin/all - Get all projects (admin)
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('createdBy', 'username fullName')
      .sort('-createdAt');
    
    res.json(projects);
  } catch (error) {
    logger.error('Get all projects error:', error.message);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

// POST /api/projects - Create project (admin)
const createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const projectData = {
      ...req.body,
      createdBy: req.userId
    };
    
    const project = new Project(projectData);
    await project.save();
    
    await project.populate('createdBy', 'username fullName');
    
    logger.info(`Project created: ${project.title} by ${req.user.username}`);
    res.status(201).json(project);
  } catch (error) {
    logger.error('Create project error:', error.message);
    res.status(500).json({ message: 'Failed to create project' });
  }
};

// PUT /api/projects/:id - Update project (admin)
const updateProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username fullName');
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    logger.info(`Project updated: ${project.title} by ${req.user.username}`);
    res.json(project);
  } catch (error) {
    logger.error('Update project error:', error.message);
    res.status(500).json({ message: 'Failed to update project' });
  }
};

// DELETE /api/projects/:id - Delete project (admin)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    logger.info(`Project deleted: ${project.title} by ${req.user.username}`);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    logger.error('Delete project error:', error.message);
    res.status(500).json({ message: 'Failed to delete project' });
  }
};

module.exports = {
  getProjects,
  getProjectBySlug,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject
};
