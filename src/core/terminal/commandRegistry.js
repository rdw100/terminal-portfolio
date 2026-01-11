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
  welcome: { handler: handleWelcome, page: "welcome", description: "Displays the welcome message" },
  about: { handler: handleAbout, page: "about", description: "Displays information about me" },
  projects: { handler: handleProjects, page: "projects", description: "Lists my GitHub projects" },
  socials: { handler: handleSocials, page: "socials", description: "Lists my social media links" },
  help: { handler: handleHelp, page: "help", description: "Lists all available commands" },
  resume: { handler: handleResume, page: "resume", description: "Displays my resume" },
  theme: { handler: handleTheme, page: "theme", description: "Change the terminal theme" },
  lighthouse: { handler: handleLighthouse, page: "lighthouse", description: "Check my Lighthouse scores" },
  gui: { handler: handleGui, page: "gui", description: "Open the GUI version of my portfolio" },
  // Utility commands without associated pages
  coin: { handler: handleCoin, description: "Flip a crypto coin" },
  clear: { handler: handleClear, description: "Clear the terminal screen" },
};

export const availableCommands = Object.keys(commandRegistry);