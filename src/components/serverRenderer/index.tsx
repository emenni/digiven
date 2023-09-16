import { RenderToPipeableStreamOptions, renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../mainApp/App";
import { StrictMode } from "react";

export function render(url: string, opts?: RenderToPipeableStreamOptions) {

    return renderToPipeableStream(
        <StrictMode>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </StrictMode>
        ,
        opts
    );

}