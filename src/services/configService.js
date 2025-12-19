let configCache = null;

export async function getConfig() {
  if (configCache) {
    return configCache;
  }

  const response = await fetch('../../build/config/config.yaml');
  const yamlText = await response.text();

  configCache = jsyaml.load(yamlText);
  return configCache;
}
