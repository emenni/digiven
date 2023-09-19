import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { render } from "./dist/server/index.js";
import helmet from "helmet";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 8080;

const html = fs
  .readFileSync(path.resolve(__dirname, "./dist/client/index.html"))
  .toString();

const parts = html.split("not rendered");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "*.digiven.com.br",
          "https://fonts.gstatic.com", // Google Fonts.
          "https://fonts.googleapis.com",
        ],
        fontSrc: [
          "https://fonts.gstatic.com", // Google Fonts.
          "https://fonts.googleapis.com", // Google Fonts.
        ], // Google Fonts.],
        scriptSrc: [
          "'self'", // Default policy for specifiying valid sources for fonts loaded using "@font-face": allow all content coming from origin (without subdomains).
          "'sha256-BWquNnQWVe3EInFog1hCP/nLb+4we1OJQ/tt7xbBDmM='",
          "*.digiven.com.br",
          "https://fonts.gstatic.com", // Google Fonts.
          "https://fonts.googleapis.com", // Google Fonts.
        ],
        objectSrc: ["'none'"],
        imgSrc: ["data:"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

app.use(
  "/assets",
  express.static(path.resolve(__dirname, "./dist/client/assets"))
);

app.use((req, res, next) => {
  // let cspHeader = res.getHeader("Content-Security-Policy").toString() || "";
  // cspHeader += " script-src-attr 'unsafe-inline'";

  res.setHeader("content-type", "text/html");
  // res.setHeader("Content-Security-Policy", cspHeader);

  res.write(parts[0]);
  const stream = render(req.url, {
    onShellReady() {
      stream.pipe(res);
    },
    onShellError() {
      // do error handling
    },
    onAllReady() {
      // last thing to write
      res.write(parts[1]);
      res.end();
    },
    onError(err) {
      console.error(err);
    },
  });
  next();
});
app.listen(PORT);
