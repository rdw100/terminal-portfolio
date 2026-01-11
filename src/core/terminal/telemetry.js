/* Telemetry module for tracking user interactions and events
   using Application Insights. */
export const Telemetry = (() => {
  let appInsights = null;
  let sessionId = null;
  let userId = null;

  async function init(connectionString) {
    if (!connectionString || connectionString.startsWith("__")) {
      console.warn("Telemetry disabled (no valid connection string)");
      return;
    }

    await loadScript("./vendor/ai.3.gbl.min.js");

    // Persistent user ID
    userId = localStorage.getItem("ai_userId");
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem("ai_userId", userId);
    }

    // New session per load
    sessionId = crypto.randomUUID();

    const ai = new Microsoft.ApplicationInsights.ApplicationInsights({
      config: {
        connectionString,

        // Disable all auto-collection
        disableAjaxTracking: true,
        disableFetchTracking: true,
        disableCorrelationHeaders: true,
        enableAutoRouteTracking: false,
        enableRequestHeaderTracking: false,
        enableResponseHeaderTracking: false,
        enableAutoDependencyTracking: false,

        // Disable unload-triggered behavior
        disableExceptionTracking: true,
        disablePerfTracking: true,
        disablePageViewPerformance: true,
        disableFlushOnBeforeUnload: true,
        disableFlushOnUnload: true,

        disableTelemetry: false,
        disableInstrumentationKeyValidation: true
      }
    });

    ai.loadAppInsights();
    appInsights = ai;

    trackEvent("SessionStarted");

    window.addEventListener("pagehide", () => {
      trackEvent("SessionEnded");
    });
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // --- Public API ---

  function trackEvent(name, properties = {}) {
    if (!appInsights) return;
    appInsights.trackEvent({
      name,
      properties: { sessionId, userId, ...properties }
    });
  }

  function trackPage(name, properties = {}) {
    if (!appInsights) return;
    appInsights.trackPageView({
      name,
      properties: { sessionId, userId, ...properties }
    });
  }

  function trackException(error, properties = {}) {
    if (!appInsights) return;
    appInsights.trackException({
      exception: error,
      properties: { sessionId, userId, ...properties }
    });
  }

  return {
    init,
    trackEvent,
    trackPage,
    trackException
  };
})();