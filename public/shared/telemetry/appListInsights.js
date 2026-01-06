export const LiteAnalytics = (() => {
    let ai = null;
    let sessionId = null;
    let userId = null;

    async function init(connectionString) {
        if (!connectionString || connectionString.startsWith("__")) {
            console.warn("Telemetry disabled (no valid connection string)");
            return;
        }

        // Load your bundled Lite SDK
        await loadScript("/scripts/vendor/appinsights-lite.bundle.js");

        // Persistent user ID
        userId = localStorage.getItem("ai_userId");
        if (!userId) {
            userId = crypto.randomUUID();
            localStorage.setItem("ai_userId", userId);
        }

        // New session per load
        sessionId = crypto.randomUUID();

        // Initialize Lite SDK (no loadAppInsights, no nested config)
        ai = new Microsoft.ApplicationInsights({
            connectionString,
            disableExceptionTracking: false
        });

        // Track session start
        trackEvent("SessionStarted");

        // Track session end
        window.addEventListener("beforeunload", () => {
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
        if (!ai) return;
        ai.trackTrace({
            message: name,
            properties: { sessionId, userId, ...properties }
        });
    }

    function trackPage(name, properties = {}) {
        if (!ai) return;
        ai.trackTrace({
            message: `PageView:${name}`,
            properties: { sessionId, userId, ...properties }
        });
    }

    function trackException(error, properties = {}) {
        if (!ai) return;
        ai.trackException({
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