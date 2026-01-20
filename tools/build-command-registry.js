// tools/build-command-registry.js
const fs = require('fs');
const path = require('path');

console.log("Running build-command-registry.js...");

try {
  const registryPath = path.resolve('src/core/runtime/commandRegistry.js');
  const outputDir = path.resolve('src/content');
  const outputPath = path.join(outputDir, 'commandRegistry.json');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Load the registry source code
  const registrySource = fs.readFileSync(registryPath, 'utf8');

  // Extract the registry object literal using a simple regex
  const match = registrySource.match(/export const commandRegistry\s*=\s*({[\s\S]*?});/);

  if (!match) {
    throw new Error("Unable to locate commandRegistry in commandRegistry.js");
  }

  const registryLiteral = match[1];

  // Evaluate the object literal safely
  const registry = eval(`(${registryLiteral})`);

  // Build a clean JSON snapshot
  const snapshot = {};

  for (const [name, meta] of Object.entries(registry)) {
    snapshot[name] = {
      description: meta.description || "",
      category: meta.category || "Other"
    };
  }

  fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2), 'utf8');

  console.log(`Generated: ${outputPath}`);
} catch (err) {
  console.error("Build failed:", err);
}
