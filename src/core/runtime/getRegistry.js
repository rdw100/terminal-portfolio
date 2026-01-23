/** 
 * Retrieves the command registry, loading it dynamically if not already loaded. 
 * @returns {Promise<Object>} A promise resolving to the command registry object.
 */
let registry = null;

export async function getRegistry() {
  if (registry) return registry;

  const mod = await import('./commandRegistry.js');
  registry = mod.commandRegistry;
  return registry;
}
