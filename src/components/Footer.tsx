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
              <img src={monogamyLogo} alt="Monogamy" className="h-[24px] w-fit dark:invert" />
              <p className="text-[1.4rem] text-muted-foreground max-w-[30rem]">
                Premium legal services at your fingertips. Connect with top-rated attorneys across every practice area for just $19.99/month.
              </p>
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
              <Link to="/faq" className={linkClass}>FAQ</Link>
            </nav>

            {/* Company */}
            <nav className="flex flex-col gap-3">
              <h4 className="text-[1.3rem] font-semibold uppercase tracking-wider text-foreground mb-1">Company</h4>
              <Link to="/about" className={linkClass}>About</Link>
              <Link to="/contact" className={linkClass}>Contact</Link>
              <Link to="/privacy" className={linkClass}>Privacy Policy</Link>
              <Link to="/terms" className={linkClass}>Terms & Conditions</Link>
            </nav>

            {/* Connect */}
            <nav className="flex flex-col gap-3">
              <h4 className="text-[1.3rem] font-semibold uppercase tracking-wider text-foreground mb-1">Connect</h4>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={linkClass}>LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={linkClass}>Twitter</a>
              <a href="mailto:hello@monogamy.law" className={linkClass}>hello@monogamy.law</a>
              <p className="text-[1.3rem] text-muted-foreground mt-2">© Monogamy {new Date().getFullYear()}</p>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
