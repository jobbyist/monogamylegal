import { useState, useEffect } from "react";
import { X, Cookie, Settings2, Shield, BarChart2 } from "lucide-react";

const COOKIE_KEY = "monogamy_cookie_consent";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

interface CookiePrefs {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState<Omit<CookiePrefs, "timestamp" | "necessary">>({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      if (stored) {
        const parsed: CookiePrefs = JSON.parse(stored);
        const age = Date.now() - (parsed.timestamp || 0);
        if (age < THIRTY_DAYS_MS) return; // Still within 30-day window
      }
    } catch {
      // ignore parse errors
    }
    // Show banner after short delay so it doesn't appear before content
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const save = (analytics: boolean, marketing: boolean) => {
    const consent: CookiePrefs = {
      necessary: true,
      analytics,
      marketing,
      timestamp: Date.now(),
    };
    localStorage.setItem(COOKIE_KEY, JSON.stringify(consent));
    setVisible(false);
  };

  const acceptAll = () => save(true, true);
  const rejectNonEssential = () => save(false, false);
  const savePreferences = () => save(prefs.analytics, prefs.marketing);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] cookie-banner-enter"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="bg-card border-t border-border shadow-2xl">
        <div className="max-w-[138rem] mx-auto px-6 py-6">
          {!showPreferences ? (
            /* Default banner */
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[1.4rem] font-semibold text-foreground mb-1">
                    We use cookies to improve your experience
                  </p>
                  <p className="text-[1.3rem] text-muted-foreground leading-[1.6]">
                    We use cookies to personalise content, analyse traffic, and improve our services.
                    You can accept all cookies, reject non-essential cookies, or customise your preferences.
                    Your choices are saved for 30 days.{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="flex items-center gap-2 px-4 py-2 text-[1.3rem] font-medium border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
                >
                  <Settings2 className="w-4 h-4" />
                  Preferences
                </button>
                <button
                  onClick={rejectNonEssential}
                  className="px-4 py-2 text-[1.3rem] font-medium border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
                >
                  Reject Non-Essential
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-2 text-[1.3rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity btn-primary-glossy"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            /* Preferences panel */
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[1.6rem] font-bold text-foreground flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-primary" />
                  Cookie Preferences
                </h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close preferences"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Necessary */}
                <div className="flex items-start justify-between gap-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[1.4rem] font-semibold text-foreground">Necessary</p>
                      <p className="text-[1.3rem] text-muted-foreground mt-0.5">
                        Required for the website to function. Cannot be disabled.
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-[1.2rem] font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      Always On
                    </span>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-start justify-between gap-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <BarChart2 className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[1.4rem] font-semibold text-foreground">Analytics</p>
                      <p className="text-[1.3rem] text-muted-foreground mt-0.5">
                        Help us understand how visitors interact with our website.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={prefs.analytics}
                      onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                    />
                    <div className="w-10 h-6 bg-border rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-4" />
                  </label>
                </div>

                {/* Marketing */}
                <div className="flex items-start justify-between gap-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <Cookie className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[1.4rem] font-semibold text-foreground">Marketing</p>
                      <p className="text-[1.3rem] text-muted-foreground mt-0.5">
                        Used to deliver personalised advertisements and measure their effectiveness.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={prefs.marketing}
                      onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                    />
                    <div className="w-10 h-6 bg-border rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-4" />
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  onClick={rejectNonEssential}
                  className="px-4 py-2 text-[1.3rem] font-medium border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all"
                >
                  Reject Non-Essential
                </button>
                <button
                  onClick={savePreferences}
                  className="px-5 py-2 text-[1.3rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity btn-primary-glossy"
                >
                  Save My Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
