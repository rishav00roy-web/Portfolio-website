/**
 * Font optimization utilities
 * Implements Requirements 2.3, 3.5 - Font format detection, conversion, and optimization
 */

import type {
  FontConfig,
  FontFile,
  FontFormat,
  FontOptimizationOptions,
  FontCapabilities,
  FontMetrics,
  FontFormatConfig
} from './font-types';

/**
 * Font format optimizer class
 */
export class FontOptimizer {
  private static instance: FontOptimizer;

  private constructor() {}

  public static getInstance(): FontOptimizer {
    if (!FontOptimizer.instance) {
      FontOptimizer.instance = new FontOptimizer();
    }
    return FontOptimizer.instance;
  }

  /**
   * Detect font format from file extension or MIME type
   */
  public detectFontFormat(filePath: string, mimeType?: string): FontFormat {
    if (mimeType) {
      switch (mimeType) {
        case 'font/woff2':
          return 'woff2';
        case 'font/woff':
          return 'woff';
        case 'font/ttf':
        case 'application/font-sfnt':
          return 'ttf';
        case 'font/otf':
          return 'otf';
        case 'application/vnd.ms-fontobject':
          return 'eot';
      }
    }

    // Fallback to file extension detection
    const extension = filePath.split('.').pop()?.toLowerCase();
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
   * Get browser support level for font format (1-10 scale)
   */
  public getFormatSupportLevel(format: FontFormat): number {
    switch (format) {
      case 'woff2':
        return 10; // Best support, smallest size
      case 'woff':
        return 8; // Good support
      case 'ttf':
        return 6; // Universal support but larger
      case 'otf':
        return 5; // Good support but larger
      case 'eot':
        return 3; // Legacy IE support only
      default:
        return 1;
    }
  }

  /**
   * Get MIME type for font format
   */
  public getFormatMimeType(format: FontFormat): string {
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
        throw new Error(`Unknown font format: ${format}`);
    }
  }

  /**
   * Generate optimized font configuration
   */
  public optimizeFontConfig(
    fontFile: FontFile,
    options: FontOptimizationOptions
  ): FontConfig {
    const formats: FontFormatConfig[] = [];
    
    // Add WOFF2 format with highest priority if available or convertible
    if (fontFile.format === 'woff2' || options.convertToWoff2) {
      formats.push({
        type: 'woff2',
        path: this.getOptimizedPath(fontFile.path, 'woff2'),
        size: Math.round(fontFile.size * 0.7), // WOFF2 typically 30% smaller
        supportLevel: this.getFormatSupportLevel('woff2')
      });
    }

    // Add WOFF fallback
    formats.push({
      type: 'woff',
      path: this.getOptimizedPath(fontFile.path, 'woff'),
      size: Math.round(fontFile.size * 0.8), // WOFF typically 20% smaller than TTF
      supportLevel: this.getFormatSupportLevel('woff')
    });

    // Add original format as final fallback
    formats.push({
      type: fontFile.format,
      path: fontFile.path,
      size: fontFile.size,
      supportLevel: this.getFormatSupportLevel(fontFile.format)
    });

    // Sort formats by support level (best first)
    formats.sort((a, b) => b.supportLevel - a.supportLevel);

    return {
      family: fontFile.family,
      weight: fontFile.weight,
      style: fontFile.style,
      display: 'swap', // Always use swap for better performance
      preload: this.shouldPreloadFont(fontFile),
      critical: this.isCriticalFont(fontFile),
      formats,
      fallbacks: this.generateFallbackStack(fontFile.family),
      subset: options.createSubsets ? options.subsetChars : undefined,
      unicodeRange: options.createSubsets ? this.generateUnicodeRange(options.subsetChars) : undefined
    };
  }

  /**
   * Generate fallback font stack with similar metrics
   */
  public generateFallbackStack(fontFamily: string): string[] {
    // Common fallback stacks based on font characteristics
    const fallbacks: Record<string, string[]> = {
      'Kenoky': [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Helvetica Neue',
        'Arial',
        'sans-serif'
      ],
      'Coffekan': [
        'Georgia',
        'Times New Roman',
        'serif'
      ],
      'JetBrains Mono': [
        'Monaco',
        'Menlo',
        'Consolas',
        'monospace'
      ],
      'Sora': [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'sans-serif'
      ]
    };

    return fallbacks[fontFamily] || [
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'sans-serif'
    ];
  }

  /**
   * Calculate estimated font metrics for layout consistency
   */
  public calculateFontMetrics(fontFile: FontFile): FontMetrics {
    // Default metrics based on common font characteristics
    // In a real implementation, these would be extracted from the font file
    const baseMetrics: Record<string, Partial<FontMetrics>> = {
      'Kenoky': {
        ascent: 800,
        descent: 200,
        lineGap: 0,
        capHeight: 700,
        xHeight: 500,
        avgWidth: 500,
        maxWidth: 1000
      },
      'Coffekan': {
        ascent: 900,
        descent: 250,
        lineGap: 0,
        capHeight: 680,
        xHeight: 450,
        avgWidth: 450,
        maxWidth: 900
      }
    };

    const base = baseMetrics[fontFile.family] || {
      ascent: 850,
      descent: 200,
      lineGap: 0,
      capHeight: 700,
      xHeight: 500,
      avgWidth: 500,
      maxWidth: 1000
    };

    return {
      family: fontFile.family,
      ascent: base.ascent || 850,
      descent: base.descent || 200,
      lineGap: base.lineGap || 0,
      capHeight: base.capHeight || 700,
      xHeight: base.xHeight || 500,
      avgWidth: base.avgWidth || 500,
      maxWidth: base.maxWidth || 1000
    };
  }

  /**
   * Generate @font-face CSS declarations
   */
  public generateFontFaceCSS(config: FontConfig): string {
    const srcDeclarations = config.formats
      .map(format => {
        const mimeType = this.getFormatMimeType(format.type);
        return `url("${format.path}") format("${format.type}")`;
      })
      .join(',\n    ');

    let css = `@font-face {
  font-family: "${config.family}";
  src: ${srcDeclarations};
  font-weight: ${config.weight};
  font-style: ${config.style};
  font-display: ${config.display};`;

    if (config.unicodeRange) {
      css += `\n  unicode-range: ${config.unicodeRange};`;
    }

    css += '\n}';

    return css;
  }

  /**
   * Create font subset characters from common usage
   */
  public createBasicSubset(): string {
    // Common characters for English websites
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:!?\'"-()[]{}/@&#*+=%<>';
  }

  /**
   * Generate unicode range for subset
   */
  private generateUnicodeRange(chars?: string): string {
    if (!chars) {
      return 'U+0020-007F'; // Basic Latin
    }

    // For simplicity, return basic Latin range
    // In a real implementation, this would analyze the character set
    return 'U+0020-007F';
  }

  /**
   * Get optimized file path for different formats
   */
  private getOptimizedPath(originalPath: string, targetFormat: FontFormat): string {
    const pathParts = originalPath.split('/');
    const filename = pathParts.pop() || '';
    const nameWithoutExt = filename.split('.').slice(0, -1).join('.');
    
    pathParts.push(`${nameWithoutExt}.${targetFormat}`);
    return pathParts.join('/');
  }

  /**
   * Determine if font should be preloaded
   */
  private shouldPreloadFont(fontFile: FontFile): boolean {
    // Preload custom fonts that are likely to be used above the fold
    const criticalFonts = ['Kenoky', 'Coffekan'];
    return criticalFonts.includes(fontFile.family);
  }

  /**
   * Determine if font is critical for first paint
   */
  private isCriticalFont(fontFile: FontFile): boolean {
    // Mark custom fonts as critical
    const criticalFonts = ['Kenoky', 'Coffekan'];
    return criticalFonts.includes(fontFile.family);
  }
}

/**
 * Browser capability detection utilities
 */
export class FontCapabilityDetector {
  private static instance: FontCapabilityDetector;

  private constructor() {}

  public static getInstance(): FontCapabilityDetector {
    if (!FontCapabilityDetector.instance) {
      FontCapabilityDetector.instance = new FontCapabilityDetector();
    }
    return FontCapabilityDetector.instance;
  }

  /**
   * Detect browser font capabilities
   */
  public detectCapabilities(): FontCapabilities {
    if (typeof window === 'undefined') {
      // Server-side fallback
      return {
        supportedFormats: ['woff2', 'woff', 'ttf'],
        fontLoadingAPI: false,
        fontDisplaySupported: true,
        unicodeRangeSupported: true,
        variableFontsSupported: false,
        connectionType: 'unknown'
      };
    }

    return {
      supportedFormats: this.detectSupportedFormats(),
      fontLoadingAPI: 'fonts' in document,
      fontDisplaySupported: this.isFontDisplaySupported(),
      unicodeRangeSupported: this.isUnicodeRangeSupported(),
      variableFontsSupported: this.areVariableFontsSupported(),
      connectionType: this.getConnectionType()
    };
  }

  /**
   * Detect supported font formats
   */
  private detectSupportedFormats(): FontFormat[] {
    const formats: FontFormat[] = [];
    
    // WOFF2 detection
    if (this.supportsFormat('woff2')) {
      formats.push('woff2');
    }
    
    // WOFF detection
    if (this.supportsFormat('woff')) {
      formats.push('woff');
    }
    
    // TTF is universally supported
    formats.push('ttf');
    
    // OTF detection
    if (this.supportsFormat('otf')) {
      formats.push('otf');
    }
    
    // EOT for IE
    if (this.supportsFormat('eot')) {
      formats.push('eot');
    }
    
    return formats;
  }

  /**
   * Check if specific font format is supported
   */
  private supportsFormat(format: FontFormat): boolean {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return false;
    
    try {
      ctx.font = `12px test-${format}`;
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check font-display support
   */
  private isFontDisplaySupported(): boolean {
    return CSS.supports('font-display', 'swap');
  }

  /**
   * Check unicode-range support
   */
  private isUnicodeRangeSupported(): boolean {
    return CSS.supports('unicode-range', 'U+0020-007F');
  }

  /**
   * Check variable fonts support
   */
  private areVariableFontsSupported(): boolean {
    return CSS.supports('font-variation-settings', '"wght" 300');
  }

  /**
   * Get connection type for optimization decisions
   */
  private getConnectionType(): FontCapabilities['connectionType'] {
    if ('connection' in navigator) {
      const connection = (navigator as unknown as { connection?: { effectiveType?: FontCapabilities['connectionType'] } }).connection;
      return connection?.effectiveType || 'unknown';
    }
    return 'unknown';
  }
}

// Export singleton instances
export const fontOptimizer = FontOptimizer.getInstance();
export const fontCapabilityDetector = FontCapabilityDetector.getInstance();