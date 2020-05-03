import React from "react";
import ReactDOM from "react-dom";
import "./i18n";
import App from "./App";
import { ErrorBoundary, GlobalError } from "./components";

ReactDOM.render(
  <ErrorBoundary component={(error, info) => <GlobalError error={error} info={info} />}>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);
