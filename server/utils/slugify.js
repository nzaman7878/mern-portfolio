const slugify = require('slugify');

/**
 * Generate a URL-friendly slug from text
 * @param {string} text - Text to slugify
 * @param {Object} options - Slugify options
 * @returns {string} URL-friendly slug
 */
const createSlug = (text, options = {}) => {
  const defaultOptions = {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  };
  
  return slugify(text, { ...defaultOptions, ...options });
};

/**
 * Generate unique slug by checking database
 * @param {string} text - Text to slugify
 * @param {Object} Model - Mongoose model to check against
 * @param {string} excludeId - ID to exclude from check (for updates)
 * @returns {Promise<string>} Unique slug
 */
const createUniqueSlug = async (text, Model, excludeId = null) => {
  let baseSlug = createSlug(text);
  let slug = baseSlug;
  let counter = 1;
  
  while (await slugExists(slug, Model, excludeId)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
};

/**
 * Check if slug exists in database
 * @param {string} slug - Slug to check
 * @param {Object} Model - Mongoose model
 * @param {string} excludeId - ID to exclude from check
 * @returns {Promise<boolean>} True if slug exists
 */
const slugExists = async (slug, Model, excludeId = null) => {
  const query = { slug };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }
  
  const existing = await Model.findOne(query);
  return !!existing;
};

module.exports = {
  createSlug,
  createUniqueSlug,
  slugExists
};
