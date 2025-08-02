// Cleanup utilities for production optimization
import { logger } from './logger';

export class ProductionOptimizer {
  
  // Remove debug statements from production builds
  static removeDebugStatements(content: string): string {
    return content
      .replace(/console\.(log|debug|info)\([^)]*\);?\s*/g, '')
      .replace(/\/\/ TODO:.*$/gm, '')
      .replace(/\/\/ FIXME:.*$/gm, '');
  }

  // Optimize imports by removing unused ones
  static optimizeImports(content: string): string {
    const lines = content.split('\n');
    const usedImports = new Set<string>();
    
    // Scan for used imports in the file
    lines.forEach(line => {
      // Simple pattern matching for used identifiers
      const matches = line.match(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g);
      if (matches) {
        matches.forEach(match => usedImports.add(match));
      }
    });

    // Filter import lines to remove unused imports
    return lines
      .map(line => {
        if (line.trim().startsWith('import') && line.includes('{')) {
          // Parse named imports
          const importMatch = line.match(/import\s*{([^}]+)}\s*from/);
          if (importMatch) {
            const namedImports = importMatch[1]
              .split(',')
              .map(imp => imp.trim())
              .filter(imp => usedImports.has(imp));
            
            if (namedImports.length === 0) {
              return '// Unused import removed';
            }
            
            return line.replace(
              /import\s*{[^}]+}/,
              `import { ${namedImports.join(', ')} }`
            );
          }
        }
        return line;
      })
      .join('\n');
  }

  // Fix loose equality operators
  static fixLooseEquality(content: string): string {
    return content
      .replace(/(\w+)\s*==\s*(\w+)/g, '$1 === $2')
      .replace(/(\w+)\s*!=\s*(\w+)/g, '$1 !== $2');
  }

  // Optimize file for production
  static optimizeFile(content: string): string {
    let optimized = content;
    
    optimized = this.removeDebugStatements(optimized);
    optimized = this.fixLooseEquality(optimized);
    optimized = this.optimizeImports(optimized);
    
    logger.info('File optimized for production');
    return optimized;
  }
}

// Production health check utilities
export class HealthChecker {
  
  static checkCodeQuality(filepath: string, content: string): {
    issues: string[];
    score: number;
  } {
    const issues: string[] = [];
    
    // Check for console statements
    if (content.includes('console.log')) {
      issues.push('Contains debug console statements'); 
    }
    
    // Check for loose equality
    const looseEqualityCount = (content.match(/\s(==|!=)\s/g) || []).length;
    if (looseEqualityCount > 0) {
      issues.push(`Contains ${looseEqualityCount} loose equality operators`);
    }
    
    // Check for TODO comments
    const todoCount = (content.match(/\/\/\s*(TODO|FIXME)/gi) || []).length;
    if (todoCount > 0) {
      issues.push(`Contains ${todoCount} TODO/FIXME comments`);
    }
    
    // Check for long lines
    const longLines = content.split('\n').filter(line => line.length > 120);
    if (longLines.length > 0) {
      issues.push(`Contains ${longLines.length} lines over 120 characters`);
    }
    
    // Calculate quality score (0-100)
    const maxIssues = 10;
    const score = Math.max(0, 100 - (issues.length / maxIssues) * 100);
    
    return { issues, score };
  }
  
  static generateHealthReport(files: Array<{path: string, content: string}>): {
    overallScore: number;
    totalIssues: number;
    fileReports: Array<{path: string, score: number, issues: string[]}>;
  } {
    const fileReports = files.map(file => ({
      path: file.path,
      ...this.checkCodeQuality(file.path, file.content)
    }));
    
    const totalIssues = fileReports.reduce((sum, report) => sum + report.issues.length, 0);
    const overallScore = fileReports.reduce((sum, report) => sum + report.score, 0) / files.length;
    
    return {
      overallScore: Math.round(overallScore),
      totalIssues,
      fileReports
    };
  }
}