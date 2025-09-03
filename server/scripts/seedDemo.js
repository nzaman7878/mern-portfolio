#!/usr/bin/env node

const mongoose = require('mongoose');
const config = require('../config');
const User = require('../models/User');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const TimelineItem = require('../models/TimelineItem');
const logger = require('../utils/logger');

const seedDemo = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info('Connected to MongoDB for demo seeding');
    
    // Get admin user
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      logger.error('No admin user found. Run: npm run seed:admin');
      process.exit(1);
    }
    
    // Sample skills
    const skills = [
      { name: 'JavaScript', category: 'frontend', proficiency: 9, featured: true },
      { name: 'React', category: 'frontend', proficiency: 8, featured: true },
      { name: 'Node.js', category: 'backend', proficiency: 8, featured: true },
      { name: 'MongoDB', category: 'database', proficiency: 7 },
      { name: 'Docker', category: 'devops', proficiency: 6 }
    ];
    
    for (const skill of skills) {
      skill.createdBy = admin._id;
      await Skill.findOneAndUpdate(
        { name: skill.name },
        skill,
        { upsert: true, new: true }
      );
    }
    
    logger.info('✅ Demo data seeded successfully!');
    
  } catch (error) {
    logger.error('❌ Failed to seed demo data:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

if (require.main === module) {
  seedDemo();
}
