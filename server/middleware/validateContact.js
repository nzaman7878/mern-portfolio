const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

// Strict rate limiting for contact form
const contactRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 submissions per hour per IP
  message: {
    success: false,
    message: 'Too many contact form submissions. Please wait an hour before trying again.',
    retryAfter: 3600
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Custom key generator to also consider user agent
  keyGenerator: (req) => {
    return `${req.ip}-${req.get('User-Agent') || 'unknown'}`.substring(0, 100);
  }
});

// Honeypot rate limiting (for spam bots)
const honeypotRateLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 1, // Only 1 attempt per day if honeypot is filled
  message: {
    success: false,
    message: 'Suspicious activity detected.'
  },
  skip: (req) => !req.body.website, // Skip if honeypot field is empty
});

// Validation rules
const contactValidationRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\-\.\']+$/)
    .withMessage('Name contains invalid characters'),

  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 254 })
    .withMessage('Email address is too long'),

  body('subject')
    .trim()
    .isLength({ min: 5, max: 150 })
    .withMessage('Subject must be between 5 and 150 characters')
    .matches(/^[a-zA-Z0-9\s\-\.\,\!\?\:]+$/)
    .withMessage('Subject contains invalid characters'),

  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
    // Allow basic punctuation and newlines
    .matches(/^[a-zA-Z0-9\s\-\.\,\!\?\:\;\(\)\[\]\'\"\n\r@#$%&*+=<>\/\\]+$/)
    .withMessage('Message contains invalid characters'),

  body('phone')
    .optional()
    .trim()
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Please provide a valid phone number'),

  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters')
    .matches(/^[a-zA-Z0-9\s\-\.\&\,]+$/)
    .withMessage('Company name contains invalid characters'),

  // Honeypot field (should be empty)
  body('website')
    .isEmpty()
    .withMessage('Spam detected'),
];

// Spam detection middleware
const spamDetection = (req, res, next) => {
  const { name, email, subject, message } = req.body;
  
  // Check for spam indicators
  const spamPatterns = [
    /\b(viagra|cialis|lottery|winner|congratulations)\b/i,
    /\b(click here|visit now|buy now)\b/i,
    /\b(100% free|guaranteed|no obligation)\b/i,
    /(http:\/\/|https:\/\/|www\.)/g // Multiple URLs
  ];

  const textToCheck = `${name} ${subject} ${message}`.toLowerCase();
  
  for (const pattern of spamPatterns) {
    if (pattern.test(textToCheck)) {
      return res.status(400).json({
        success: false,
        message: 'Message appears to be spam and was not sent.'
      });
    }
  }

  // Check for excessive repetition
  const words = textToCheck.split(/\s+/);
  const wordCount = {};
  let maxRepetition = 0;

  words.forEach(word => {
    if (word.length > 3) { // Only check meaningful words
      wordCount[word] = (wordCount[word] || 0) + 1;
      maxRepetition = Math.max(maxRepetition, wordCount[word]);
    }
  });

  if (maxRepetition > 5) {
    return res.status(400).json({
      success: false,
      message: 'Message appears to be spam due to excessive repetition.'
    });
  }

  next();
};

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

module.exports = {
  contactRateLimit,
  honeypotRateLimit,
  contactValidationRules,
  spamDetection,
  handleValidationErrors
};
