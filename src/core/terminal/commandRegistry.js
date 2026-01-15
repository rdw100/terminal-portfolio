/* Registers available commands, their handlers, and 
their associated pages or command metadata. Uses dynamic-imports. */
export const commandRegistry = {
  boot: {
    loader: () => import('../../commands/boot/index.js'),
    description: "Type <b>boot</b> to warm-up system.",
    category: "System"
  },
  welcome: {
    loader: () => import('../../commands/welcome/index.js'),
    page: "welcome",
    description: "Type <b>welcome</b> to display the welcome message.",
    category: "Navigation"
  },
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
  help: {
    loader: () => import('../../commands/help/index.js'),
    page: "help",
    description: "Type <b>help</b> to list all available commands.",
    category: "System"
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

  // Utility commands
  coin: {
    loader: () => import('../../commands/coin/index.js'),
    description: "Type <b>coin</b> to get current price for selected crypto.",
    category: "Services"
  },
  clear: {
    loader: () => import('../../commands/clear/index.js'),
    description: "Type <b>clear</b> to clear the terminal screen.",
    category: "System"
  }
};

export const availableCommands = Object.keys(commandRegistry);