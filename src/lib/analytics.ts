type CtaLocation = 'hero' | 'sidebar' | 'contact' | 'social' | 'nav';

type CtaPayload = {
  action: string;
  location: CtaLocation;
  variant?: string;
  href?: string;
};

type AnalyticsWindow = Window & {
  gtag?: (command: 'event', eventName: string, params: Record<string, string>) => void;
  plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
};

const LOCAL_STORAGE_KEY = 'cv-cta-metrics';

function safeTrackToLocalStorage(payload: CtaPayload): void {
  try {
    const now = new Date().toISOString();
    const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed = existing ? (JSON.parse(existing) as Record<string, { count: number; lastTriggeredAt: string }>) : {};
    const key = `${payload.location}:${payload.action}:${payload.variant ?? 'none'}`;
    const current = parsed[key] ?? { count: 0, lastTriggeredAt: now };
    parsed[key] = { count: current.count + 1, lastTriggeredAt: now };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // Ignore storage failures (private mode, quota, etc.).
  }
}

export function trackCtaClick(payload: CtaPayload): void {
  if (typeof window === 'undefined') {
    return;
  }

  const trackPayload = {
    ...payload,
    variant: payload.variant ?? 'default',
  };

  safeTrackToLocalStorage(trackPayload);

  const analyticsWindow = window as AnalyticsWindow;

  if (typeof analyticsWindow.gtag === 'function') {
    analyticsWindow.gtag('event', 'cv_cta_click', {
      action: trackPayload.action,
      location: trackPayload.location,
      variant: trackPayload.variant,
      href: trackPayload.href ?? '',
    });
  }

  if (typeof analyticsWindow.plausible === 'function') {
    analyticsWindow.plausible('cv_cta_click', {
      props: {
        action: trackPayload.action,
        location: trackPayload.location,
        variant: trackPayload.variant,
      },
    });
  }

  window.dispatchEvent(new CustomEvent('cv:cta-click', { detail: trackPayload }));
}
