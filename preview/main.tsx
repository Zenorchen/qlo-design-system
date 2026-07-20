import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Preview from "./Preview";
import "../src/tokens/tokens.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Preview />
  </StrictMode>,
);
