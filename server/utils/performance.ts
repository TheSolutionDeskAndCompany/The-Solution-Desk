
import { logger } from './logger';

export class PerformanceMonitor {
  private static timers = new Map<string, number>();
  
  static start(label: string): void {
    this.timers.set(label, Date.now());
  }
  
  static end(label: string): number {
    const startTime = this.timers.get(label);
    if (!startTime) {
      logger.warn(`Performance timer '${label}' was not started`);
      return 0;
    }
    
    const duration = Date.now() - startTime;
    this.timers.delete(label);
    
    logger.info(`Performance: ${label} took ${duration}ms`);
    return duration;
  }
  
  static async measure<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.start(label);
    try {
      const result = await fn();
      this.end(label);
      return result;
    } catch (error) {
      this.end(label);
      throw error;
    }
  }
}
