/**
 * Safe logging utility that only logs in development
 * Prevents performance issues and console noise in production
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log('[PAPI]', ...args);
    }
  },

  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn('[PAPI WARN]', ...args);
    }
  },

  error: (...args: unknown[]) => {
    // Always log errors, but with controlled formatting
    console.error('[PAPI ERROR]', ...args);
  },

  debug: (...args: unknown[]) => {
    if (isDevelopment && process.env.DEBUG_PAPI) {
      console.debug('[PAPI DEBUG]', ...args);
    }
  },

  // For critical operations that need production logging
  production: (...args: unknown[]) => {
    console.log('[PAPI PROD]', ...args);
  }
};