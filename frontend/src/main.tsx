import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
      <Toaster />
    </AppContextProvider>
  </BrowserRouter>
);
