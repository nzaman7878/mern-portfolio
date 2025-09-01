const mongoose = require('mongoose');
const validator = require('validator');

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [150, 'Subject cannot exceed 150 characters'],
    minlength: [5, 'Subject must be at least 5 characters long']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters'],
    minlength: [10, 'Message must be at least 10 characters long']
  },
  phone: {
    type: String,
    trim: true,
    default: '',
    validate: {
      validator: function(v) {
        // Optional field, but if provided, should be valid
        if (!v) return true;
        return validator.isMobilePhone(v, 'any');
      },
      message: 'Please provide a valid phone number'
    }
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters'],
    default: ''
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied', 'archived'],
    default: 'unread'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  source: {
    type: String,
    enum: ['contact-form', 'email', 'linkedin', 'other'],
    default: 'contact-form'
  },
  ipAddress: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [20, 'Tag cannot exceed 20 characters']
  }],
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
    default: ''
  },
  replied: {
    type: Boolean,
    default: false
  },
  repliedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Indexes
contactMessageSchema.index({ status: 1, createdAt: -1 });
contactMessageSchema.index({ priority: -1, createdAt: -1 });
contactMessageSchema.index({ email: 1 });
contactMessageSchema.index({ createdAt: -1 });

// Instance method to mark as read
contactMessageSchema.methods.markAsRead = function() {
  if (this.status === 'unread') {
    this.status = 'read';
    return this.save();
  }
};

// Instance method to mark as replied
contactMessageSchema.methods.markAsReplied = function() {
  this.status = 'replied';
  this.replied = true;
  this.repliedAt = new Date();
  return this.save();
};

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
