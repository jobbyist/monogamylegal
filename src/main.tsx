import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { validateRuntimeConfig } from "@/lib/config";

validateRuntimeConfig();

createRoot(document.getElementById("root")!).render(<App />);
