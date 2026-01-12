/* Registers available commands, their handlers, and 
their associated pages or command metadata. */

import { handleWelcome } from '../../commands/welcome/index.js';
import { handleAbout } from '../../commands/about/index.js';
import { handleProjects } from '../../commands/projects/index.js';
import { handleSocials } from '../../commands/socials/index.js';
import { handleHelp } from '../../commands/help/index.js';
import { handleResume } from '../../commands/resume/index.js';
import { handleTheme } from '../../commands/theme/index.js';
import { handleLighthouse } from '../../commands/lighthouse/index.js';
import { handleGui } from '../../commands/gui/index.js';
import { handleCoin } from '../../commands/coin/index.js';
import { handleClear } from '../../commands/clear/index.js';

export const commandRegistry = {
  // Primary commands with associated pages
  welcome: { handler: handleWelcome, page: "welcome", description: "Displays the welcome message", category: "Navigation" },
  about: { handler: handleAbout, page: "about", description: "Learn about Dusty", category: "Navigation" },
  projects: { handler: handleProjects, page: "projects", description: "View featured GitHub projects", category: "Navigation" },
  socials: { handler: handleSocials, page: "socials", description: "Lists my social media links", category: "Navigation" },
  help: { handler: handleHelp, page: "help", description: "Lists all available commands", category: "System" },
  resume: { handler: handleResume, page: "resume", description: "Displays my resume", category: "Navigation" },
  theme: { handler: handleTheme, page: "theme", description: "Change the terminal theme", category: "System" },
  lighthouse: { handler: handleLighthouse, page: "lighthouse", description: "Check my Lighthouse scores", category: "System" },
  gui: { handler: handleGui, page: "gui", description: "Open the GUI version of my portfolio", category: "Navigation" },
  // Utility commands without associated pages
  coin: { handler: handleCoin, description: "Get current price for selected crypto", category: "Services" },
  clear: { handler: handleClear, description: "Clear the terminal screen", category: "System" },
};

export const availableCommands = Object.keys(commandRegistry);