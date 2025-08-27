const express = require('express');
const { isConnected, getConnectionInfo } = require('../config/database');
const config = require('../config');

const router = express.Router();

// GET /api/health
router.get('/', (req, res) => {
  const dbConnected = isConnected();
  const dbInfo = getConnectionInfo();
  
  const healthData = {
    status: dbConnected ? 'OK' : 'DEGRADED',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.NODE_ENV,
    services: {
      database: {
        status: dbConnected ? 'connected' : 'disconnected',
        ...dbInfo
      },
      server: {
        status: 'running',
        port: config.PORT,
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
        }
      }
    }
  };
  
  // Return 503 if database is not connected
  const statusCode = dbConnected ? 200 : 503;
  res.status(statusCode).json(healthData);
});

module.exports = router;
