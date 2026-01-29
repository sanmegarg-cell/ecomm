
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.tsx";
import "./styles/index.css";
import { Toaster } from "./app/components/ui/sonner";
  
const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>
);
  
