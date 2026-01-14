/* Registers available commands, their handlers, and 
their associated pages or command metadata. */
export const commandRegistry = {
  welcome: {
    loader: () => import('../../commands/welcome/index.js'),
    page: "welcome",
    description: "Displays the welcome message",
    category: "Navigation"
  },
  about: {
    loader: () => import('../../commands/about/index.js'),
    page: "about",
    description: "Learn about Dusty",
    category: "Navigation"
  },
  projects: {
    loader: () => import('../../commands/projects/index.js'),
    page: "projects",
    description: "View featured GitHub projects",
    category: "Navigation"
  },
  socials: {
    loader: () => import('../../commands/socials/index.js'),
    page: "socials",
    description: "Lists my social media links",
    category: "Navigation"
  },
  help: {
    loader: () => import('../../commands/help/index.js'),
    page: "help",
    description: "Lists all available commands",
    category: "System"
  },
  resume: {
    loader: () => import('../../commands/resume/index.js'),
    page: "resume",
    description: "Displays my resume",
    category: "Navigation"
  },
  theme: {
    loader: () => import('../../commands/theme/index.js'),
    page: "theme",
    description: "Change the terminal theme",
    category: "System"
  },
  lighthouse: {
    loader: () => import('../../commands/lighthouse/index.js'),
    page: "lighthouse",
    description: "Check my Lighthouse scores",
    category: "System"
  },
  gui: {
    loader: () => import('../../commands/gui/index.js'),
    page: "gui",
    description: "Open the GUI version of my portfolio",
    category: "Navigation"
  },

  // Utility commands
  coin: {
    loader: () => import('../../commands/coin/index.js'),
    description: "Get current price for selected crypto",
    category: "Services"
  },
  clear: {
    loader: () => import('../../commands/clear/index.js'),
    description: "Clear the terminal screen",
    category: "System"
  }
};

export const availableCommands = Object.keys(commandRegistry);