import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "./assets/fonts/rainyhearts.ttf";
import { ContextProvider } from "./context/context-provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
