import { Preset } from '@react-router/dev/config';

/**
 * Official Hydrogen Preset for React Router 7.12.x
 *
 * Provides optimal React Router configuration for Hydrogen applications on Oxygen.
 * Enables validated performance optimizations while ensuring CLI compatibility.
 *
 * React Router 7.12.x Feature Support Matrix for Hydrogen 2025.7.0
 *
 * +----------------------------------+----------+----------------------------------+
 * | Feature                          | Status   | Notes                            |
 * +----------------------------------+----------+----------------------------------+
 * | CORE CONFIGURATION                                                              |
 * +----------------------------------+----------+----------------------------------+
 * | appDirectory: 'app'              | Enabled  | Core application structure       |
 * | buildDirectory: 'dist'           | Enabled  | Build output configuration       |
 * | ssr: true                        | Enabled  | Server-side rendering            |
 * +----------------------------------+----------+----------------------------------+
 * | PERFORMANCE FLAGS                                                               |
 * +----------------------------------+----------+----------------------------------+
 * | v8_middleware                    | Enabled  | Required for Hydrogen context    |
 * | v8_splitRouteModules             | Enabled  | Route code splitting             |
 * | unstable_optimizeDeps            | Enabled  | Build performance optimization   |
 * +----------------------------------+----------+----------------------------------+
 * | ROUTE DISCOVERY                                                                 |
 * +----------------------------------+----------+----------------------------------+
 * | routeDiscovery: { mode: 'lazy' } | Default  | Lazy route loading               |
 * | routeDiscovery: { mode: 'init' } | Allowed  | Eager route loading              |
 * +----------------------------------+----------+----------------------------------+
 * | UNSUPPORTED FEATURES                                                            |
 * +----------------------------------+----------+----------------------------------+
 * | basename: '/path'                | Blocked  | CLI infrastructure limitation    |
 * | prerender: ['/routes']           | Blocked  | Plugin incompatibility           |
 * | serverBundles: () => {}          | Blocked  | Manifest incompatibility         |
 * | buildEnd: () => {}               | Blocked  | CLI bypasses hook execution      |
 * | unstable_subResourceIntegrity    | Blocked  | CSP nonce/hash conflict          |
 * | v8_viteEnvironmentApi            | Blocked  | CLI fallback detection used      |
 * +----------------------------------+----------+----------------------------------+
 *
 * @version 2025.7.0
 */
declare function hydrogenPreset(): Preset;

export { hydrogenPreset };
