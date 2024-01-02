import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { DataProvider } from "./Components/Provider/DataProvider";

ReactDOM.createRoot(document.getElementById("root"))
.render(
  <React.StrictMode>
    <DataProvider>
      <App/>
    </DataProvider>
  </React.StrictMode>
)
