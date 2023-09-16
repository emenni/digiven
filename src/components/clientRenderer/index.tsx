import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "../mainApp/App";
import { StrictMode } from "react";

hydrateRoot(
    document.getElementById("root")!,
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);


