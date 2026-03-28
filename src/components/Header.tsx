import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import monogamyLogo from "@/assets/monogamy-logo.png";
import LoginModal from "@/components/LoginModal";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-background transition-shadow duration-300 ${
          isScrolled ? "shadow-[0_0_calc(1.125*16px)_rgba(0,0,0,0.15)]" : ""
        }`}
        style={{ height: "72px" }}
      >
        <div className="h-full px-6 md:px-[calc(18vw-10rem)]">
          <div className="flex items-center justify-between h-full max-w-[138rem] mx-auto">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={monogamyLogo} alt="Monogamy" className="h-[28px] dark:invert" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-[1.5rem] font-medium text-foreground hover:text-muted-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => setLoginOpen(true)}
                className="text-[1.5rem] font-medium px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity btn-primary-glossy"
              >
                Log In / Sign Up
              </button>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="md:hidden flex items-center gap-2 p-2 text-foreground hover:text-muted-foreground transition-colors"
                  aria-label="Open menu"
                >
                  <span className="text-[1.8rem] font-medium leading-none">Menu</span>
                  <div className="w-10 flex flex-col gap-[6px] items-center justify-center mt-[3px]">
                    <span className="w-[18px] h-[2px] bg-current block"></span>
                    <span className="w-[18px] h-[2px] bg-current block"></span>
                  </div>
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-[400px] p-0 flex flex-col h-full bg-background"
              >
                <div className="flex items-center justify-end px-6 py-6">
                  <SheetClose asChild>
                    <button className="text-[1.6rem] text-foreground hover:opacity-60 transition-opacity">
                      Close
                    </button>
                  </SheetClose>
                </div>

                <div className="flex flex-col justify-between h-full px-6 pb-[40px]">
                  <div className="flex flex-[0_1_100%] flex-col justify-between pt-16 text-right">
                    <ul className="space-y-2">
                      {navLinks.map((item, i) => (
                        <li key={item.to}>
                          <SheetClose asChild>
                            <Link
                              to={item.to}
                              className="text-[3rem] inline-block font-semibold text-foreground hover:text-primary transition-colors"
                              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "backwards" }}
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-12 space-y-3">
                      <li>
                        <SheetClose asChild>
                          <button
                            onClick={() => setLoginOpen(true)}
                            className="text-[1.6rem] font-semibold text-primary hover:text-foreground transition-colors"
                          >
                            Log In / Sign Up
                          </button>
                        </SheetClose>
                      </li>
                      <li>
                        <a href="https://linkedin.com/company/monogamylegal" target="_blank" rel="noopener noreferrer" className="text-[1.6rem] text-muted-foreground hover:text-foreground transition-colors">
                          LinkedIn
                        </a>
                      </li>
                      <li>
                        <a href="https://facebook.com/monogamy.legal" target="_blank" rel="noopener noreferrer" className="text-[1.6rem] text-muted-foreground hover:text-foreground transition-colors">
                          Facebook
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Header;
