/* Registry of available commands and their handlers */

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
  welcome: { handler: handleWelcome },
  about: { handler: handleAbout },
  projects: { handler: handleProjects },
  socials: { handler: handleSocials },
  help: { handler: handleHelp },
  resume: { handler: handleResume },
  theme: { handler: handleTheme },
  lighthouse: { handler: handleLighthouse }, 
  gui: { handler: handleGui },
  coin: { handler: handleCoin },
  clear: { handler: handleClear },
};