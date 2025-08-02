import winston from 'winston';

const isDevelopment = process.env.NODE_ENV === 'development';

// Create logger configuration
const loggerConfig = {
  level: isDevelopment ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    ...(isDevelopment ? [winston.format.colorize(), winston.format.simple()] : [])
  ),
  defaultMeta: { service: 'systoro-api' },
  transports: [
    new winston.transports.Console({
      format: isDevelopment 
        ? winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        : winston.format.json()
    })
  ]
};

// Add file logging in production
if (!isDevelopment) {
  (loggerConfig.transports as any[]).push(
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  );
}

export const logger = winston.createLogger(loggerConfig);

// Create analytics event logger
export const analyticsLogger = {
  track: (event: string, properties: Record<string, any>, userId?: string) => {
    logger.info('Analytics Event', {
      event,
      properties,
      userId,
      timestamp: new Date().toISOString(),
      type: 'analytics'
    });
  },

  identify: (userId: string, traits: Record<string, any>) => {
    logger.info('User Identification', {
      userId,
      traits,
      timestamp: new Date().toISOString(),
      type: 'identify'
    });
  },

  page: (userId: string, page: string, properties: Record<string, any> = {}) => {
    logger.info('Page View', {
      userId,
      page,
      properties,
      timestamp: new Date().toISOString(),
      type: 'page'
    });
  }
};