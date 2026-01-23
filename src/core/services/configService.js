/** 
 * Provides configuration settings for the application,
 * including loading and caching the config file. 
 * @returns {Promise<Object>} A promise resolving to the configuration object.
 */
let configCache = null;

export async function getConfig() {
    if (configCache) {
        return configCache;
    }
    const response = await fetch('../src/config/config.json');
    configCache = await response.json();

    return configCache;
}

export function isTelemetryEnabled() {
  return Boolean(configCache && configCache.telemetry);
}