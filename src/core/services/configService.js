import { ensureYaml } from './yamlService.js';

let configCache = null;

export async function getConfig() {
    if (configCache) {
        return configCache;
    }
    await ensureYaml();
    const response = await fetch('../src/config/config.yaml');
    const yamlText = await response.text();

    configCache = jsyaml.load(yamlText);
    return configCache;
}
