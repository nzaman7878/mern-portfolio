const mongoose = require('mongoose');
const { createUniqueSlug } = require('../utils/slugify');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Project content is required']
  },
  technologies: [{
    type: String,
    trim: true,
    maxlength: [30, 'Technology name cannot exceed 30 characters']
  }],
  category: {
    type: String,
    required: [true, 'Project category is required'],
    enum: ['web', 'mobile', 'desktop', 'api', 'other'],
    default: 'web'
  },
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'completed', 'on-hold'],
    default: 'completed'
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  },
  images: [{
    url: { type: String, required: true },
    alt: { type: String, default: '' },
    caption: { type: String, default: '' }
  }],
  links: {
    live: { type: String, default: '' },
    github: { type: String, default: '' },
    demo: { type: String, default: '' }
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: null
  },
  order: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
projectSchema.index({ slug: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ featured: -1, order: 1 });
projectSchema.index({ published: 1, createdAt: -1 });

// Auto-generate slug before save
projectSchema.pre('save', async function(next) {
  if (this.isModified('title')) {
    this.slug = await createUniqueSlug(this.title, this.constructor, this._id);
  }
  next();
});

// Virtual for duration
projectSchema.virtual('duration').get(function() {
  if (!this.endDate) return null;
  
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
});

// Instance method to increment views
projectSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

module.exports = mongoose.model('Project', projectSchema);
