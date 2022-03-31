import App from "App";
import React from "react";
import reactDom from "react-dom/client";
import "styles/index.scss";

/**
 * This is the entry point of your React application where the root element is in the public/index.html.
 * We call this a “root” DOM node because everything inside it will be managed by React DOM.
 * Applications built with just React usually have a single root DOM node.
 * More: https://reactjs.org/docs/rendering-elements.html
 */
const root = reactDom.createRoot(document.getElementById("root"));
root.render(<App />);
