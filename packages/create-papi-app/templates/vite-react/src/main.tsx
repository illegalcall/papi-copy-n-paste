import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Subscribe } from "@react-rxjs/core";
import { hasConnected$ } from "@/lib/chain";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <Subscribe source$={hasConnected$}>
    <StrictMode>
      <App />
    </StrictMode>
  </Subscribe>,
);
