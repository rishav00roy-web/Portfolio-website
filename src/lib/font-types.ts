/**
 * Font loading optimization type definitions
 * Implements Requirements 2.3, 3.5 - TypeScript interfaces for font configuration and optimization
 */

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type FontStyle = 'normal' | 'italic';
export type FontDisplay = 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
export type FontFormat = 'woff2' | 'woff' | 'ttf' | 'otf' | 'eot';

/**
 * Font format configuration with file information
 */
export interface FontFormatConfig {
  /** Font format type */
  type: FontFormat;
  /** Path to the font file */
  path: string;
  /** File size in bytes */
  size: number;
  /** Browser support level (1-10, higher = better support) */
  supportLevel: number;
}

/**
 * Complete font configuration interface
 */
export interface FontConfig {
  /** Font family name */
  family: string;
  /** Font weight */
  weight: FontWeight;
  /** Font style */
  style: FontStyle;
  /** Font display strategy */
  display: FontDisplay;
  /** Whether this font should be preloaded */
  preload: boolean;
  /** Whether this font is critical for above-the-fold content */
  critical: boolean;
  /** Available font formats in order of preference */
  formats: FontFormatConfig[];
  /** Fallback font stack */
  fallbacks: string[];
  /** Font subset characters (for optimization) */
  subset?: string;
  /** Unicode ranges covered by this font */
  unicodeRange?: string;
}

/**
 * Font usage tracking interface
 */
export interface FontUsage {
  /** File where the font is used */
  file: string;
  /** Font families used in this file */
  fonts: string[];
  /** Whether this usage is critical for first paint */
  critical: boolean;
  /** Whether this font is used above the fold */
  aboveFold: boolean;
  /** CSS selectors using this font */
  selectors: string[];
}

/**
 * Font metrics for layout consistency
 */
export interface FontMetrics {
  /** Font family name */
  family: string;
  /** Ascent measurement */
  ascent: number;
  /** Descent measurement */
  descent: number;
  /** Line gap */
  lineGap: number;
  /** Cap height */
  capHeight: number;
  /** x-height */
  xHeight: number;
  /** Average character width */
  avgWidth: number;
  /** Maximum advance width */
  maxWidth: number;
}

/**
 * Browser font capabilities detection
 */
export interface FontCapabilities {
  /** Supported font formats */
  supportedFormats: FontFormat[];
  /** Whether font loading API is available */
  fontLoadingAPI: boolean;
  /** Whether font display is supported */
  fontDisplaySupported: boolean;
  /** Whether unicode-range is supported */
  unicodeRangeSupported: boolean;
  /** Whether variable fonts are supported */
  variableFontsSupported: boolean;
  /** Connection type for optimization decisions */
  connectionType: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown';
}

/**
 * Font preloading priority levels
 */
export interface FontPriority {
  /** Font family name */
  family: string;
  /** Priority level (1-10, higher = more important) */
  priority: number;
  /** Whether this font blocks rendering */
  blocking: boolean;
  /** Load timing strategy */
  timing: 'immediate' | 'defer' | 'lazy';
}

/**
 * Resource hint configuration
 */
export interface ResourceHint {
  /** Hint type */
  rel: 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch';
  /** Resource URL */
  href: string;
  /** Resource type */
  as?: 'font' | 'style';
  /** MIME type */
  type?: string;
  /** Crossorigin setting */
  crossorigin?: 'anonymous' | 'use-credentials';
}

/**
 * Font loading performance metrics
 */
export interface PerformanceMetrics {
  /** Largest Contentful Paint time in milliseconds */
  lcp: number;
  /** Cumulative Layout Shift score */
  cls: number;
  /** Font loading times by family name */
  fontLoadTimes: Map<string, number>;
  /** Number of network requests for fonts */
  networkRequests: number;
  /** Cache hit rate percentage (0-100) */
  cacheHitRate: number;
  /** First Contentful Paint time */
  fcp: number;
  /** Total blocking time for fonts */
  totalBlockingTime: number;
}

/**
 * Font optimization options
 */
export interface FontOptimizationOptions {
  /** Whether to convert to WOFF2 */
  convertToWoff2: boolean;
  /** Whether to create font subsets */
  createSubsets: boolean;
  /** Characters to include in subset */
  subsetChars?: string;
  /** Whether to optimize file sizes */
  optimizeSize: boolean;
  /** Quality level for optimization (1-10) */
  quality: number;
  /** Whether to generate fallback metrics */
  generateFallbacks: boolean;
}

/**
 * Font file information interface
 */
export interface FontFile {
  /** Absolute path to font file */
  path: string;
  /** Font format */
  format: FontFormat;
  /** File size in bytes */
  size: number;
  /** Font family name extracted from file */
  family: string;
  /** Font weight */
  weight: FontWeight;
  /** Font style */
  style: FontStyle;
  /** Font metrics if available */
  metrics?: FontMetrics;
  /** Whether file is optimized */
  optimized: boolean;
}

/**
 * Font loading state interface
 */
export interface FontLoadingState {
  /** Whether font is currently loading */
  loading: boolean;
  /** Whether font has loaded successfully */
  loaded: boolean;
  /** Whether font loading failed */
  error: boolean;
  /** Error message if loading failed */
  errorMessage?: string;
  /** Loading time in milliseconds */
  loadTime?: number;
  /** Font family that loaded */
  family: string;
}

/**
 * Font cleanup results interface
 */
export interface FontCleanupResult {
  /** Font files that were removed */
  removedFiles: string[];
  /** CSS declarations that were removed */
  removedDeclarations: string[];
  /** Bytes saved from cleanup */
  bytesSaved: number;
  /** Unused fonts that were found */
  unusedFonts: string[];
  /** Font loading mechanisms that were consolidated */
  consolidatedMechanisms: string[];
}