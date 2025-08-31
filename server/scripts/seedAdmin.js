#!/usr/bin/env node

const mongoose = require('mongoose');
const config = require('../config');
const User = require('../models/User');
const logger = require('../utils/logger');
const { generatePassword } = require('../utils/hashPassword');

const seedAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(config.MONGODB_URI);
    logger.info('Connected to MongoDB for seeding');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      logger.info('Admin user already exists:', existingAdmin.username);
      process.exit(0);
    }
    
    // Generate admin credentials
    const adminPassword = process.env.ADMIN_PASSWORD || generatePassword(12);
    
    // Create admin user
    const adminUser = new User({
      username: process.env.ADMIN_USERNAME || 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@portfolio.dev',
      password: adminPassword,
      firstName: process.env.ADMIN_FIRST_NAME || 'Portfolio',
      lastName: process.env.ADMIN_LAST_NAME || 'Admin',
      role: 'admin'
    });
    
    await adminUser.save();
    
    logger.info('✅ Admin user created successfully!');
    logger.info('📧 Email:', adminUser.email);
    logger.info('👤 Username:', adminUser.username);
    logger.info('🔑 Password:', adminPassword);
    
    if (!process.env.ADMIN_PASSWORD) {
      logger.warn('⚠️  Auto-generated password shown above. Save it securely!');
      logger.info('💡 To set a custom password, use: ADMIN_PASSWORD=yourpassword npm run seed:admin');
    }
    
  } catch (error) {
    logger.error('❌ Failed to seed admin user:', error.message);
    
    if (error.code === 11000) {
      logger.error('Duplicate key error. User might already exist.');
    }
    
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

// Run if called directly
if (require.main === module) {
  seedAdmin();
}

module.exports = seedAdmin;
