import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { NotFound } from "./NotFound";
import "./styles.css";

const root = document.getElementById("root");

if (!root) throw new Error("Missing app root element.");

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const isHome = path === "/" || path === "/index.html";

createRoot(root).render(
  <StrictMode>
    {isHome ? <App /> : <NotFound />}
  </StrictMode>,
);
