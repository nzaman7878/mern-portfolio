const mongoose = require('mongoose');
const config = require('./index');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    const options = {
      // Remove deprecated options that are now defaults in Mongoose 6+
      // useNewUrlParser and useUnifiedTopology are no longer needed
    };
    
    const conn = await mongoose.connect(config.MONGODB_URI, options);
    
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    
    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed through app termination');
        process.exit(0);
      } catch (error) {
        logger.error('Error during MongoDB shutdown:', error);
        process.exit(1);
      }
    });
    
    return conn;
  } catch (error) {
    logger.error('MongoDB connection failed:', error.message);
    
    // Exit process with failure in production
    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
    
    // In development, continue without DB (for testing)
    logger.warn('Continuing without database connection in development mode');
    return null;
  }
};

// Check database connection status
const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Get connection info
const getConnectionInfo = () => {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  return {
    state: states[state] || 'unknown',
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.name
  };
};

module.exports = {
  connectDB,
  isConnected,
  getConnectionInfo
};
