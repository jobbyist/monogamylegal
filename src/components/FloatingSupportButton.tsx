import { appConfig } from "@/lib/config";

const FloatingSupportButton = () => {
  const handleSupportClick = () => {
    if (!appConfig.calComUrl) {
      return;
    }

    window.open(appConfig.calComUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      aria-label="AI chatbot support"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onClick={handleSupportClick}
    >
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-[2.8rem] font-bold shadow-[0_12px_28px_rgba(0,0,0,0.25)] before:absolute before:inset-0 before:rounded-full before:bg-primary/40 before:animate-ping before:content-['']">
        <span className="relative">?</span>
      </span>
      <span className="rounded-full bg-card/95 px-4 py-2 text-[1.4rem] font-semibold text-foreground shadow-md border border-border">
        Support
      </span>
    </button>
  );
};

export default FloatingSupportButton;
