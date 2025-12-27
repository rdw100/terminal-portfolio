// Analytics integration using Application Insights
// Tracks terminal commands and page views
// Full entered arguments are captured for specific commands
// All dynamic pages and special commands are tracked
(function() {
  // SWA injects the variable at runtime
  const connStr = window.APPINSIGHTS_CONNECTION_STRING || "%APPLICATIONINSIGHTS_CONNECTION_STRING%";
  if (!connStr || connStr.includes('%')) {
    console.warn("APPLICATIONINSIGHTS_CONNECTION_STRING not set. Analytics disabled.");
    return;
  }

  // --- Generate session + user IDs ---
  const sessionId = crypto.randomUUID();
  const userId = localStorage.getItem("ai_userId") || crypto.randomUUID();
  localStorage.setItem("ai_userId", userId);

  // --- Minimal App Insights snippet ---
  var appInsights = window.appInsights || function(config) {
    function r(name) { t[name] = function() { var i = arguments; t.queue.push(() => t[name].apply(t,i)) } }
    var t = { config, queue: [] };
    r('trackPageView'); r('trackEvent'); r('trackException');
    return t;
  }({ connectionString: connStr });
  window.appInsights = appInsights;
  appInsights.loadAppInsights && appInsights.loadAppInsights();

  // Track initial page view
  appInsights.trackPageView && appInsights.trackPageView({ properties: { sessionId, userId } });

  // Track global uncaught exceptions
  window.addEventListener("error", e => {
    appInsights.trackException && appInsights.trackException({
      exception: e.error || e.message,
      properties: { sessionId, userId }
    });
  });

  // --- Track terminal commands ---
  const terminalInput = document.getElementById("command");
  if (terminalInput) {
    const origAddEventListener = terminalInput.addEventListener.bind(terminalInput);
    terminalInput.addEventListener = (type, listener, options) => {
      if (type === "keydown") {
        origAddEventListener(type, function(e) {
          if (e.key === "Enter") {
            const rawCmd = terminalInput.value.trim();
            if (rawCmd) {
              const [baseCmd, ...args] = rawCmd.split(/\s+/);
              const eventProps = { command: rawCmd, baseCmd, sessionId, userId, timestamp: new Date().toISOString() };
              if (['coin','projects','socials'].includes(baseCmd)) {
                eventProps.args = args.join(' ');
              }
              appInsights.trackEvent({ name: "CommandExecuted", properties: eventProps });
            }
          }
          listener(e);
        }, options);
      } else {
        origAddEventListener(type, listener, options);
      }
    };
  }

  // --- Wrap dynamic render functions ---
  const pagesToWrap = ['renderWelcome','renderAbout','renderHelp','renderProjects','renderSocials','renderGui','renderLighthouse','renderResume','renderCoin'];
  pagesToWrap.forEach(fnName => {
    const original = window[fnName];
    if (typeof original === 'function') {
      window[fnName] = async function(...args) {
        appInsights.trackPageView && appInsights.trackPageView({ name: fnName, properties: { args: JSON.stringify(args), sessionId, userId } });
        return original.apply(this, args);
      };
    }
  });
})();
