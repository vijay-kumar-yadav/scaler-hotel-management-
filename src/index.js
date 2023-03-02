import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "rsuite/dist/rsuite.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
