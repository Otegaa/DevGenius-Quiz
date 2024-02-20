import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "App";
import { QuizProvider } from "contexts/QuizContext";
import { AuthProvider } from "contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <QuizProvider>
        <App />
      </QuizProvider>
    </AuthProvider>
  </React.StrictMode>,
);
