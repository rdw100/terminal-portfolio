export const Analytics = (() => {
    let appInsights = null;
    let sessionId = null;
    let userId = null;

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

    async function init(connectionString) {
        // Skip telemetry if the connection string is missing or still a placeholder
        if (!connectionString || connectionString.startsWith("__")) {
            console.warn("Telemetry disabled (no valid connection string)");
            return;
        }

        // Lazy-load the App Insights SDK as a global script
        await loadScript("../scripts/vendor/ai.3.gbl.min.js");

        // Persistent user ID
        userId = localStorage.getItem("ai_userId");
        if (!userId) {
            userId = crypto.randomUUID();
            localStorage.setItem("ai_userId", userId);
        }

        // New session per load
        sessionId = crypto.randomUUID();

        // Initialize SDK
        const ai = new Microsoft.ApplicationInsights.ApplicationInsights({
            config: {
                connectionString,
                enableAutoRouteTracking: false,
                disableAjaxTracking: true,
                disableFetchTracking: true,
                disableExceptionTracking: false
            }
        });

        ai.loadAppInsights();
        appInsights = ai;

        // Session start
        trackEvent("SessionStarted");

        // Session end
        window.addEventListener("beforeunload", () => {
            trackEvent("SessionEnded");
        });
    }

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