import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NotFound } from "./NotFound";
import "./styles.css";

const root = document.getElementById("root");

if (!root) throw new Error("Missing app root element.");

createRoot(root).render(
  <StrictMode>
    <NotFound />
  </StrictMode>,
);
