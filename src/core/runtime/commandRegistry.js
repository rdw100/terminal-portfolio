function lazy(parts) {
  return () => {
    const path = parts.join('');
    return new Function("p", "return import(p)")(path);
  };
}

export const commandRegistry = {
  about: {
    loader: lazy(['../../commands/about/index.js']),
    page: "about",
    description: "Type <b>about</b> to learn about Dusty.",
    category: "Navigation"
  },
  projects: {
    loader: lazy(['../../commands/projects/index.js']),
    page: "projects",
    description: "Type <b>projects</b> to view GitHub projects.",
    category: "Navigation"
  },
  socials: {
    loader: lazy(['../../commands/socials/index.js']),
    page: "socials",
    description: "Type <b>socials</b> to list media links.",
    category: "Navigation"
  },
  resume: {
    loader: lazy(['../../commands/resume/index.js']),
    page: "resume",
    description: "Type <b>resume</b> to display resume.",
    category: "Navigation"
  },
  theme: {
    loader: lazy(['../../commands/theme/index.js']),
    page: "theme",
    description: "Type <b>theme list</b> to view terminal themes.",
    category: "System"
  },
  lighthouse: {
    loader: lazy(['../../commands/lighthouse/index.js']),
    page: "lighthouse",
    description: "Type <b>lighthouse</b> for Lighthouse scores.",
    category: "System"
  },
  gui: {
    loader: lazy(['../../commands/gui/index.js']),
    page: "gui",
    description: "Type <b>gui</b> to open the GUI version this site.",
    category: "Navigation"
  },
  coin: {
    loader: lazy(['../../commands/coin/index.js']),
    description: "Type <b>coin</b> to get current price for selected crypto.",
    category: "Services"
  },
  clear: {
    loader: lazy(['../../commands/clear/index.js']),
    description: "Type <b>clear</b> to clear the terminal screen.",
    category: "System"
  },
  welcome: {
    loader: lazy(['../../commands/welcome/index.js']),
    page: "welcome",
    description: "Type <b>welcome</b> to display the welcome message.",
    category: "Navigation"
  },
  help: {
    loader: lazy(['../../commands/help/index.js']),
    page: "help",
    description: "Type <b>help</b> to list all available commands.",
    category: "System"
  },
};

export const availableCommands = Object.keys(commandRegistry);
