const logger = require('./logger');

class Monitor {
  constructor() {
    this.metrics = {
      requests: 0,
      errors: 0,
      startTime: Date.now()
    };
  }

  trackRequest() {
    this.metrics.requests++;
  }

  trackError() {
    this.metrics.errors++;
  }

  getHealthStats() {
    const uptime = Date.now() - this.metrics.startTime;
    const memoryUsage = process.memoryUsage();
    
    return {
      status: 'healthy',
      uptime: Math.floor(uptime / 1000),
      requests: this.metrics.requests,
      errors: this.metrics.errors,
      errorRate: this.metrics.requests > 0 ? (this.metrics.errors / this.metrics.requests) : 0,
      memory: {
        used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        total: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        external: Math.round(memoryUsage.external / 1024 / 1024)
      },
      cpu: process.cpuUsage(),
      timestamp: new Date().toISOString()
    };
  }

  logStats() {
    setInterval(() => {
      const stats = this.getHealthStats();
      logger.info('Health stats', stats);
    }, 60000); // Log every minute
  }
}

module.exports = new Monitor();
