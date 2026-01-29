
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.tsx";
import "./styles/index.css";
import { Toaster } from "./app/components/ui/sonner";
import React from "react";
  
const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>
  </React.StrictMode>
);
  
