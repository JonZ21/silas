import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BibleProvider } from "./contexts/BibleContext.jsx";
import { SidebarProvider } from "./contexts/SidebarContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BibleProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </BibleProvider>
  </React.StrictMode>
);
