import { appInsights } from '../../telemetry/appInsights.js';

export function trackCommand(cmd) {
  appInsights.trackEvent({ name: "command", properties: { cmd } });
}

export function trackError(err) {
  appInsights.trackException({ exception: err });
}

export function trackPage(page) {
  appInsights.trackPageView({ name: page });
}