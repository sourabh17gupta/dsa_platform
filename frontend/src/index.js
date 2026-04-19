import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {Provider} from "react-redux";
import {store} from "./Redux/store";
import {store1} from "./Redux/store1";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store} store1={store1}>
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>
  </Provider>
);
