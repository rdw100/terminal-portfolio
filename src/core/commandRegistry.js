/* Registers available commands, their handlers, and 
their associated pages or command metadata. */

import { handleWelcome } from '../commands/welcome/index.js';
import { handleAbout } from '../commands/about/index.js';
import { handleProjects } from '../commands/projects/index.js';
import { handleSocials } from '../commands/socials/index.js';
import { handleHelp } from '../commands/help/index.js';
import { handleResume } from '../commands/resume/index.js';
import { handleTheme } from '../commands/theme/index.js';
import { handleLighthouse } from '../commands/lighthouse/index.js';
import { handleGui } from '../commands/gui/index.js';
import { handleCoin } from '../commands/coin/index.js';
import { handleClear } from '../commands/clear/index.js';

export const commandRegistry = {
  // Primary commands with associated pages
  welcome:   { handler: handleWelcome,   page: "welcome" },
  about:     { handler: handleAbout,     page: "about" },
  projects:  { handler: handleProjects,  page: "projects" },
  socials:   { handler: handleSocials,   page: "socials" },
  help:      { handler: handleHelp,      page: "help" },
  resume:    { handler: handleResume,    page: "resume" },
  theme:     { handler: handleTheme,     page: "theme" },
  lighthouse:{ handler: handleLighthouse,page: "lighthouse" },
  gui:       { handler: handleGui,       page: "gui" },
  // Utility commands without associated pages
  coin:      { handler: handleCoin },
  clear:     { handler: handleClear },
};

export const availableCommands = Object.keys(commandRegistry);