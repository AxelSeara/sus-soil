import React, { useEffect, useMemo, useState } from 'react';

const CONSENT_KEY = 'siteCookieConsentV2';

function readConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

function writeConsent(next) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
}

export default function CookiePreferenceCenter() {
  const [consent, setConsent] = useState(null);
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const current = readConsent();
    setConsent(current);
    setOpen(!current);
  }, []);

  useEffect(() => {
    setAnalytics(!!consent?.analytics);
    setMarketing(!!consent?.marketing);
  }, [consent]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('open-cookie-settings', onOpen);
    return () => window.removeEventListener('open-cookie-settings', onOpen);
  }, []);

  const save = (next) => {
    writeConsent(next);
    setConsent(next);
    setOpen(false);
  };

  const allowAnalytics = useMemo(() => !!consent?.analytics, [consent]);

  useEffect(() => {
    if (!allowAnalytics) return;
    if (window.__metricoolLoaded) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://tracker.metricool.com/resources/be.js';
    script.onload = () => {
      if (window.beTracker?.t) {
        window.beTracker.t({ hash: '5b4b7628993fcc0e3178513fdf7bf6e8' });
        window.__metricoolLoaded = true;
      }
    };
    document.head.appendChild(script);
  }, [allowAnalytics]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1200] flex items-end bg-black/35 backdrop-blur-[2px] md:items-center md:justify-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
        className="w-full max-h-[90vh] overflow-y-auto rounded-t-2xl border-t border-brown/20 bg-[#f4faf5] p-4 shadow-[0_-14px_40px_rgba(25,38,31,0.16)] md:max-w-2xl md:rounded-2xl md:border md:p-6"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 id="cookie-title" className="text-lg font-semibold text-brown">Your privacy choices</h3>
            <p className="mt-1 text-sm text-brown/85">Choose whether SUS-SOIL may use optional cookies.</p>
          </div>
          {consent ? (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border border-brown/20 px-2 py-1 text-sm text-brown hover:bg-lightGreen/25"
            >
              Close
            </button>
          ) : null}
        </div>

        <div className="grid gap-2 rounded-xl border border-brown/15 bg-white/70 p-3 text-sm mb-4">
          <label className="flex items-center justify-between gap-3 rounded-lg p-2">
            <span className="text-brown/90">Strictly necessary (always active)</span>
            <input type="checkbox" checked disabled aria-label="Strictly necessary cookies are always active" />
          </label>
          <label className="flex items-center justify-between gap-3 rounded-lg p-2 hover:bg-lightGreen/15">
            <span className="text-brown/90">Analytics</span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              aria-label="Enable analytics cookies"
            />
          </label>
          <label className="flex items-center justify-between gap-3 rounded-lg p-2 hover:bg-lightGreen/15">
            <span className="text-brown/90">Marketing / social tracking</span>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              aria-label="Enable marketing cookies"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:justify-end">
          <button
            type="button"
            onClick={() =>
              save({
                necessary: true,
                analytics,
                marketing,
                updatedAt: new Date().toISOString(),
              })
            }
            className="rounded-full bg-brown px-4 py-2 text-sm font-semibold text-white hover:bg-brown/90"
          >
            Save preferences
          </button>
          <button
            type="button"
            onClick={() =>
              save({
                necessary: true,
                analytics: false,
                marketing: false,
                updatedAt: new Date().toISOString(),
              })
            }
            className="rounded-full border border-brown/20 px-4 py-2 text-sm font-semibold text-brown hover:bg-lightGreen/20"
          >
            Reject optional cookies
          </button>
          <button
            type="button"
            onClick={() =>
              save({
                necessary: true,
                analytics: true,
                marketing: true,
                updatedAt: new Date().toISOString(),
              })
            }
            className="rounded-full border border-brown/20 px-4 py-2 text-sm font-semibold text-brown hover:bg-lightGreen/20"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
