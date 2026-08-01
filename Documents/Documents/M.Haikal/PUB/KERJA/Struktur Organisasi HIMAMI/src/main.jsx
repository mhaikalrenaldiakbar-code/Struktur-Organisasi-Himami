import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import Lenis from "lenis";

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  easing: (t) => 1 - Math.pow(1 - t, 4),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
