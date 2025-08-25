import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeLanguage } from "./i18n/lang";

// Initialize language before React renders to prevent FOUC
initializeLanguage();

createRoot(document.getElementById("root")!).render(<App />);
