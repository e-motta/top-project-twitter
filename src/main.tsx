import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import AuthProvider from "./firebase/AuthContext";
import "./index.css";
import UsernameProvider from "./service/UsernameContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <UsernameProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </UsernameProvider>
    </AuthProvider>
  </React.StrictMode>
);
