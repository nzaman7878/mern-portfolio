const mongoose = require('mongoose');

const timelineItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Timeline title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [80, 'Company name cannot exceed 80 characters'],
    default: ''
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters'],
    default: ''
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  type: {
    type: String,
    required: [true, 'Timeline type is required'],
    enum: ['education', 'experience', 'project', 'achievement', 'certification', 'other'],
    default: 'experience'
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    default: null // null means ongoing
  },
  current: {
    type: Boolean,
    default: false
  },
  skills: [{
    type: String,
    trim: true,
    maxlength: [30, 'Skill name cannot exceed 30 characters']
  }],
  achievements: [{
    type: String,
    maxlength: [200, 'Achievement cannot exceed 200 characters']
  }],
  links: [{
    title: { type: String, required: true },
    url: { type: String, required: true }
  }],
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  },
  order: {
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
timelineItemSchema.index({ startDate: -1 });
timelineItemSchema.index({ type: 1, startDate: -1 });
timelineItemSchema.index({ featured: -1, startDate: -1 });
timelineItemSchema.index({ published: 1 });

// Virtual for duration
timelineItemSchema.virtual('duration').get(function() {
  const start = new Date(this.startDate);
  const end = this.endDate ? new Date(this.endDate) : new Date();
  
  const diffTime = Math.abs(end - start);
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  
  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
  }
  
  const years = Math.floor(diffMonths / 12);
  const remainingMonths = diffMonths % 12;
  
  let duration = `${years} year${years > 1 ? 's' : ''}`;
  if (remainingMonths > 0) {
    duration += ` ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
  }
  
  return duration;
});

// Pre-save middleware to handle current flag
timelineItemSchema.pre('save', function(next) {
  if (this.current) {
    this.endDate = null;
  }
  next();
});

module.exports = mongoose.model('TimelineItem', timelineItemSchema);
