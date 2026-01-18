// src/core/runtime/getRegistry.js
let registry = null;

export async function getRegistry() {
  if (registry) return registry;

  const mod = await import('./commandRegistry.js');
  registry = mod.commandRegistry;
  return registry;
}
