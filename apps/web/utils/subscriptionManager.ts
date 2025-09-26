/**
 * Centralized subscription management to prevent memory leaks
 * Provides automatic cleanup and subscription tracking
 */

interface ActiveSubscription {
  unsubscribe: () => void;
  timestamp: number;
  description: string;
}

class SubscriptionManager {
  private subscriptions = new Map<string, ActiveSubscription>();
  private maxAge = 5 * 60 * 1000; // 5 minutes
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Start cleanup interval only in browser environment
    if (typeof window !== 'undefined') {
      this.startCleanup();
    }
  }

  /**
   * Add a new subscription with automatic cleanup
   */
  add(key: string, unsubscribe: () => void, description = '') {
    // Clean up existing subscription if exists
    this.remove(key);

    this.subscriptions.set(key, {
      unsubscribe,
      timestamp: Date.now(),
      description,
    });
  }

  /**
   * Remove and unsubscribe a specific subscription
   */
  remove(key: string): boolean {
    const subscription = this.subscriptions.get(key);
    if (subscription) {
      try {
        subscription.unsubscribe();
      } catch (error) {
        console.warn('Error unsubscribing:', key, error);
      }
      this.subscriptions.delete(key);
      return true;
    }
    return false;
  }

  /**
   * Check if a subscription exists
   */
  has(key: string): boolean {
    return this.subscriptions.has(key);
  }

  /**
   * Get subscription info
   */
  get(key: string): ActiveSubscription | undefined {
    return this.subscriptions.get(key);
  }

  /**
   * Clean up old subscriptions
   */
  private cleanup() {
    const now = Date.now();
    const toRemove: string[] = [];

    for (const [key, subscription] of this.subscriptions) {
      if (now - subscription.timestamp > this.maxAge) {
        toRemove.push(key);
      }
    }

    toRemove.forEach(key => {
      console.log(`Cleaning up old subscription: ${key}`);
      this.remove(key);
    });
  }

  /**
   * Start periodic cleanup
   */
  private startCleanup() {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60 * 1000); // Every minute
  }

  /**
   * Stop cleanup and remove all subscriptions
   */
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }

    // Unsubscribe all active subscriptions
    for (const key of this.subscriptions.keys()) {
      this.remove(key);
    }
  }

  /**
   * Get current statistics
   */
  getStats() {
    return {
      activeCount: this.subscriptions.size,
      subscriptions: Array.from(this.subscriptions.keys()).map(key => ({
        key,
        ...this.subscriptions.get(key)!
      }))
    };
  }
}

// Export singleton instance
export const subscriptionManager = new SubscriptionManager();

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    subscriptionManager.destroy();
  });
}