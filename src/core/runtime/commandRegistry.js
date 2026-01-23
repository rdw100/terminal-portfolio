/** 
 * Maps command names to their respective modules and metadata.
 * Each command entry includes a loader function for dynamic import,
 * an optional page identifier, a description, and a category. 
 * @param {Object} commandRegistry - The registry of all available commands.
 * @property {Function} loader - Function to dynamically import the command module.
 * @property {string} [page] - Optional page identifier for commands that render pages.
 * @property {string} description - Description of the command for help listings.
 * @property {string} category - Category under which the command falls.
 * @returns {Object} The command registry object. 
 */
export const commandRegistry = {
  about: {
    loader: () => import('../../commands/about/index.js'),
    page: "about",
    description: "Type <b>about</b> to learn about Dusty.",
    category: "Navigation"
  },
  projects: {
    loader: () => import('../../commands/projects/index.js'),
    page: "projects",
    description: "Type <b>projects</b> to view GitHub projects.",
    category: "Navigation"
  },
  socials: {
    loader: () => import('../../commands/socials/index.js'),
    page: "socials",
    description: "Type <b>socials</b> to list media links.",
    category: "Navigation"
  },
  resume: {
    loader: () => import('../../commands/resume/index.js'),
    page: "resume",
    description: "Type <b>resume</b> to display resume.",
    category: "Navigation"
  },
  theme: {
    loader: () => import('../../commands/theme/index.js'),
    page: "theme",
    description: "Type <b>theme list</b> to view terminal themes.",
    category: "System"
  },
  lighthouse: {
    loader: () => import('../../commands/lighthouse/index.js'),
    page: "lighthouse",
    description: "Type <b>lighthouse</b> for Lighthouse scores.",
    category: "System"
  },
  gui: {
    loader: () => import('../../commands/gui/index.js'),
    page: "gui",
    description: "Type <b>gui</b> to open the GUI version this site.",
    category: "Navigation"
  },
  coin: {
    loader: () => import('../../commands/coin/index.js'),
    description: "Type <b>coin</b> to get current price for selected crypto.",
    category: "Services"
  },
  clear: {
    loader: () => import('../../commands/clear/index.js'),
    description: "Type <b>clear</b> to clear the terminal screen.",
    category: "System"
  },
  welcome: {
    loader: () => import('../../commands/welcome/index.js'),
    page: "welcome",
    description: "Type <b>welcome</b> to display the welcome message.",
    category: "Navigation"
  },
  help: {
    loader: () => import('../../commands/help/index.js'),
    page: "help",
    description: "Type <b>help</b> to list all available commands.",
    category: "System"
  },
};