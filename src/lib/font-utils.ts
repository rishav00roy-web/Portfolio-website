/**
 * Font utility functions
 * Implements Requirements 2.3, 3.5 - Core font loading utilities and helpers
 */

import type {
  FontConfig,
  FontFile,
  FontFormat,
  FontWeight,
  FontStyle,
  FontUsage,
  FontLoadingState,
  ResourceHint,
  FontPriority
} from './font-types';

/**
 * Font file analyzer utility
 */
export class FontAnalyzer {
  /**
   * Analyze font file and extract metadata
   */
  public static async analyzeFontFile(filePath: string): Promise<FontFile> {
    try {
      // In a real implementation, this would read the font file and extract metadata
      // For now, we'll extract information from the file path and name
      const filename = filePath.split('/').pop() || '';
      const format = FontAnalyzer.extractFormatFromPath(filePath);
      const { family, weight, style } = FontAnalyzer.parseFontFilename(filename);
      
      // Mock file size - in real implementation, this would be actual file size
      const size = await FontAnalyzer.getFileSize(filePath);

      return {
        path: filePath,
        format,
        size,
        family,
        weight,
        style,
        optimized: format === 'woff2'
      };
    } catch (error) {
      throw new Error(`Failed to analyze font file ${filePath}: ${error}`);
    }
  }

  /**
   * Extract font format from file path
   */
  private static extractFormatFromPath(path: string): FontFormat {
    const extension = path.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'woff2':
        return 'woff2';
      case 'woff':
        return 'woff';
      case 'ttf':
        return 'ttf';
      case 'otf':
        return 'otf';
      case 'eot':
        return 'eot';
      default:
        throw new Error(`Unsupported font format: ${extension}`);
    }
  }

  /**
   * Parse font filename to extract family, weight, and style
   */
  private static parseFontFilename(filename: string): {
    family: string;
    weight: FontWeight;
    style: FontStyle;
  } {
    const nameWithoutExt = filename.split('.')[0];
    
    // Extract weight
    let weight: FontWeight = 400; // Default to regular
    const weightMatch = nameWithoutExt.match(/(thin|light|regular|medium|semibold|bold|extrabold|black|[1-9]00)/i);
    if (weightMatch) {
      const weightStr = weightMatch[1].toLowerCase();
      switch (weightStr) {
        case 'thin':
          weight = 100;
          break;
        case 'light':
          weight = 300;
          break;
        case 'regular':
          weight = 400;
          break;
        case 'medium':
          weight = 500;
          break;
        case 'semibold':
          weight = 600;
          break;
        case 'bold':
          weight = 700;
          break;
        case 'extrabold':
          weight = 800;
          break;
        case 'black':
          weight = 900;
          break;
        default:
          // Handle numeric weights like "300", "400", etc.
          const numericWeight = parseInt(weightStr);
          if (numericWeight >= 100 && numericWeight <= 900) {
            weight = numericWeight as FontWeight;
          }
      }
    }

    // Extract style
    const style: FontStyle = nameWithoutExt.toLowerCase().includes('italic') ? 'italic' : 'normal';

    // Extract family name (remove weight and style indicators)
    const family = nameWithoutExt
      .replace(/(thin|light|regular|medium|semibold|bold|extrabold|black|italic|\d{3})/gi, '')
      .replace(/[-_]/g, ' ')
      .trim();

    return { family, weight, style };
  }

  /**
   * Get file size (mock implementation)
   */
  private static async getFileSize(filePath: string): Promise<number> {
    // In a real implementation, this would fetch the actual file size
    // For now, return estimated sizes based on known fonts
    const filename = filePath.split('/').pop() || '';
    
    if (filename.includes('Kenoky')) {
      return filename.includes('.woff2') ? 28000 : 40000;
    }
    if (filename.includes('Coffekan')) {
      return filename.includes('.woff2') ? 32000 : 45000;
    }
    
    // Default estimation
    return 35000;
  }
}

/**
 * Font usage scanner utility
 */
export class FontUsageScanner {
  /**
   * Scan project files for font usage
   */
  public static async scanFontUsage(projectPath: string): Promise<FontUsage[]> {
    const usage: FontUsage[] = [];
    
    // Mock implementation - in reality would scan CSS files and components
    // This represents the fonts we know are being used based on the project
    usage.push({
      file: 'src/app/layout.tsx',
      fonts: ['Kenoky', 'Sora', 'JetBrains Mono'],
      critical: true,
      aboveFold: true,
      selectors: ['.font-kenoky', 'body', 'h1', 'h2', 'h3']
    });

    usage.push({
      file: 'src/components/Header.tsx',
      fonts: ['Kenoky', 'Coffekan'],
      critical: true,
      aboveFold: true,
      selectors: ['.header-title', '.nav-item']
    });

    usage.push({
      file: 'src/components/CodeBlock.tsx',
      fonts: ['JetBrains Mono'],
      critical: false,
      aboveFold: false,
      selectors: ['code', 'pre', '.code-block']
    });

    return usage;
  }

  /**
   * Identify unused font files
   */
  public static async identifyUnusedFonts(
    fontFiles: FontFile[],
    usage: FontUsage[]
  ): Promise<string[]> {
    const usedFonts = new Set<string>();
    
    // Collect all used font families
    usage.forEach(u => {
      u.fonts.forEach(font => usedFonts.add(font.toLowerCase()));
    });

    // Find unused font files
    const unusedFiles = fontFiles
      .filter(file => !usedFonts.has(file.family.toLowerCase()))
      .map(file => file.path);

    return unusedFiles;
  }
}

/**
 * Resource hint generator utility
 */
export class ResourceHintGenerator {
  /**
   * Generate preload hints for critical fonts
   */
  public static generatePreloadHints(configs: FontConfig[]): ResourceHint[] {
    return configs
      .filter(config => config.preload && config.critical)
      .flatMap(config => {
        // Create preload hint for the best format (first in array)
        const bestFormat = config.formats[0];
        if (!bestFormat) return [];

        return [{
          rel: 'preload' as const,
          href: bestFormat.path,
          as: 'font' as const,
          type: this.getMimeTypeForFormat(bestFormat.type),
          crossorigin: 'anonymous' as const
        }];
      });
  }

  /**
   * Generate prefetch hints for non-critical fonts
   */
  public static generatePrefetchHints(configs: FontConfig[]): ResourceHint[] {
    return configs
      .filter(config => !config.critical)
      .flatMap(config => {
        const bestFormat = config.formats[0];
        if (!bestFormat) return [];

        return [{
          rel: 'prefetch' as const,
          href: bestFormat.path,
          as: 'font' as const,
          type: this.getMimeTypeForFormat(bestFormat.type)
        }];
      });
  }

  /**
   * Generate preconnect hints for external font services
   */
  public static generatePreconnectHints(): ResourceHint[] {
    return [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous'
      }
    ];
  }

  /**
   * Get MIME type for font format
   */
  private static getMimeTypeForFormat(format: FontFormat): string {
    switch (format) {
      case 'woff2':
        return 'font/woff2';
      case 'woff':
        return 'font/woff';
      case 'ttf':
        return 'font/ttf';
      case 'otf':
        return 'font/otf';
      case 'eot':
        return 'application/vnd.ms-fontobject';
      default:
        return 'font/woff2';
    }
  }
}

/**
 * Font priority calculator utility
 */
export class FontPriorityCalculator {
  /**
   * Calculate loading priorities for fonts based on usage
   */
  public static calculatePriorities(
    configs: FontConfig[],
    usage: FontUsage[]
  ): FontPriority[] {
    return configs.map(config => {
      const fontUsage = usage.find(u => 
        u.fonts.some(f => f.toLowerCase() === config.family.toLowerCase())
      );

      let priority = 1; // Base priority
      let timing: 'immediate' | 'defer' | 'lazy' = 'lazy';
      let blocking = false;

      if (fontUsage) {
        if (fontUsage.critical && fontUsage.aboveFold) {
          priority = 10;
          timing = 'immediate';
          blocking = true;
        } else if (fontUsage.critical) {
          priority = 8;
          timing = 'immediate';
          blocking = false;
        } else if (fontUsage.aboveFold) {
          priority = 6;
          timing = 'defer';
          blocking = false;
        } else {
          priority = 3;
          timing = 'lazy';
          blocking = false;
        }
      }

      // Boost priority for preload fonts
      if (config.preload) {
        priority = Math.min(10, priority + 2);
      }

      return {
        family: config.family,
        priority,
        blocking,
        timing
      };
    });
  }
}

/**
 * Font validation utilities
 */
export class FontValidator {
  /**
   * Validate font configuration
   */
  public static validateFontConfig(config: FontConfig): boolean {
    try {
      // Check required fields
      if (!config.family || !config.weight || !config.style) {
        return false;
      }

      // Check weight is valid
      if (config.weight < 100 || config.weight > 900 || config.weight % 100 !== 0) {
        return false;
      }

      // Check style is valid
      if (!['normal', 'italic'].includes(config.style)) {
        return false;
      }

      // Check display is valid
      if (!['auto', 'block', 'swap', 'fallback', 'optional'].includes(config.display)) {
        return false;
      }

      // Check formats exist and are valid
      if (!config.formats || config.formats.length === 0) {
        return false;
      }

      // Check fallbacks exist
      if (!config.fallbacks || config.fallbacks.length === 0) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate font file
   */
  public static validateFontFile(fontFile: FontFile): boolean {
    try {
      // Check required fields
      if (!fontFile.path || !fontFile.format || !fontFile.family) {
        return false;
      }

      // Check file size is reasonable
      if (fontFile.size <= 0 || fontFile.size > 5000000) { // 5MB max
        return false;
      }

      // Check weight and style
      if (fontFile.weight < 100 || fontFile.weight > 900) {
        return false;
      }

      if (!['normal', 'italic'].includes(fontFile.style)) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Font loading state manager
 */
export class FontLoadingStateManager {
  private static states = new Map<string, FontLoadingState>();

  /**
   * Set font loading state
   */
  public static setState(family: string, state: Partial<FontLoadingState>): void {
    const currentState = this.states.get(family) || {
      loading: false,
      loaded: false,
      error: false,
      family
    };

    this.states.set(family, { ...currentState, ...state });
  }

  /**
   * Get font loading state
   */
  public static getState(family: string): FontLoadingState {
    return this.states.get(family) || {
      loading: false,
      loaded: false,
      error: false,
      family
    };
  }

  /**
   * Get all loading states
   */
  public static getAllStates(): FontLoadingState[] {
    return Array.from(this.states.values());
  }

  /**
   * Clear all states
   */
  public static clearStates(): void {
    this.states.clear();
  }

  /**
   * Check if all fonts are loaded
   */
  public static areAllFontsLoaded(): boolean {
    const states = Array.from(this.states.values());
    return states.length > 0 && states.every(state => state.loaded && !state.error);
  }
}

// Export utility functions for common operations
export const fontUtils = {
  analyzeFontFile: FontAnalyzer.analyzeFontFile,
  scanFontUsage: FontUsageScanner.scanFontUsage,
  identifyUnusedFonts: FontUsageScanner.identifyUnusedFonts,
  generatePreloadHints: ResourceHintGenerator.generatePreloadHints,
  generatePrefetchHints: ResourceHintGenerator.generatePrefetchHints,
  generatePreconnectHints: ResourceHintGenerator.generatePreconnectHints,
  calculatePriorities: FontPriorityCalculator.calculatePriorities,
  validateFontConfig: FontValidator.validateFontConfig,
  validateFontFile: FontValidator.validateFontFile,
  setFontState: FontLoadingStateManager.setState,
  getFontState: FontLoadingStateManager.getState,
  getAllFontStates: FontLoadingStateManager.getAllStates,
  clearFontStates: FontLoadingStateManager.clearStates,
  areAllFontsLoaded: FontLoadingStateManager.areAllFontsLoaded
};