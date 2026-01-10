let yamlReady = false;

export async function ensureYaml() {
  if (yamlReady) return;

  await import('../vendor/js-yaml.min.js');
  yamlReady = true;
}
