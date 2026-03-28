import { Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import monogamyLogo from "@/assets/monogamy-logo.png";

const Footer = () => {
  const { theme, setTheme } = useTheme();

  const linkClass = "text-[1.4rem] text-muted-foreground hover:text-foreground transition-colors";

  return (
    <footer className="border-t border-border mt-24">
      <div className="py-12 px-6 md:px-[calc(18vw-10rem)]">
        <div className="max-w-[138rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Brand */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <img src={monogamyLogo} alt="Monogamy" className="dark:invert" style={{ width: "150px", height: "auto" }} />
              <p className="text-[1.4rem] text-muted-foreground max-w-[30rem]">
                Your on-demand legal team — without the overhead. Connect with vetted attorneys across every practice area.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-lg">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4483-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503c-1.6112-.7416-3.4053-1.1516-5.3138-1.1516s-3.7026.41-5.3138 1.1516L4.4272 5.8657a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-5.7185-9.4396"/>
                  </svg>
                  <span className="text-[1.2rem] font-medium">Coming Soon to Google Play</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-lg">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="text-[1.2rem] font-medium">Coming Soon to App Store</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-lg">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.5 2c-1.82 0-3.53.5-5 1.35C2.99 4.76 2 6.8 2 9c0 2.2.99 4.24 2.5 5.65A7.28 7.28 0 003 18c0 3.31 2.69 6 6 6h6c3.31 0 6-2.69 6-6 0-1.17-.33-2.26-.91-3.18C21.17 13.45 22 11.88 22 10c0-3.31-2.69-6-6-6-1.77 0-3.36.77-4.46 2-.37.43-.71.9-1.01 1.4-.3-.5-.64-.97-1.01-1.4C8.36 4.77 6.77 4 5 4c-.83 0-1.64.16-2.38.44C2.85 3.85 3.09 3.5 3.4 3.2 4.32 2.42 5.46 2 6.67 2H9.5z"/>
                  </svg>
                  <span className="text-[1.2rem] font-medium">PWA Available</span>
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <button onClick={() => setTheme("light")} className={`text-[1.3rem] font-medium transition-colors ${theme === "light" ? "text-foreground underline underline-offset-4" : "text-muted-foreground"}`}>Light</button>
                <button onClick={() => setTheme("dark")} className={`text-[1.3rem] font-medium transition-colors ${theme === "dark" ? "text-foreground underline underline-offset-4" : "text-muted-foreground"}`}>Dark</button>
                <button onClick={() => setTheme("system")} className={`text-[1.3rem] font-medium transition-colors ${theme === "system" ? "text-foreground underline underline-offset-4" : "text-muted-foreground"}`}>Auto</button>
              </div>
            </div>

            {/* Platform */}
            <nav className="flex flex-col gap-3">
              <h4 className="text-[1.3rem] font-semibold uppercase tracking-wider text-foreground mb-1">Platform</h4>
              <Link to="/practice-areas" className={linkClass}>Practice Areas</Link>
              <Link to="/how-it-works" className={linkClass}>How It Works</Link>
              <Link to="/pricing" className={linkClass}>Pricing</Link>
              <Link to="/partners" className={linkClass}>For Lawyers</Link>
              <Link to="/faq" className={linkClass}>FAQ</Link>
            </nav>

            {/* Company */}
            <nav className="flex flex-col gap-3">
              <h4 className="text-[1.3rem] font-semibold uppercase tracking-wider text-foreground mb-1">Company</h4>
              <Link to="/about" className={linkClass}>About</Link>
              <Link to="/stream" className={linkClass}>Stream</Link>
              <Link to="/contact" className={linkClass}>Contact</Link>
              <Link to="/privacy" className={linkClass}>Privacy</Link>
              <Link to="/terms" className={linkClass}>Terms</Link>
            </nav>

            {/* Connect */}
            <nav className="flex flex-col gap-3">
              <h4 className="text-[1.3rem] font-semibold uppercase tracking-wider text-foreground mb-1">Connect</h4>
              <a href="https://linkedin.com/company/monogamylegal" target="_blank" rel="noopener noreferrer" className={linkClass}>LinkedIn</a>
              <a href="https://facebook.com/monogamy.legal" target="_blank" rel="noopener noreferrer" className={linkClass}>Facebook</a>
              <a href="https://whatsapp.com/channel/0029Vb7wLlMI7BeLb4viJx37" target="_blank" rel="noopener noreferrer" className={linkClass}>Community</a>
              <a href="mailto:hello@monogamy.legal" className={linkClass}>hello@monogamy.legal</a>
              <p className="text-[1.3rem] text-muted-foreground mt-2">© Monogamy {new Date().getFullYear()}</p>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
