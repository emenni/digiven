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
          "'sha256-xWGOGGMGQQ+IV0Om4xzgbDHXUh/+L1c375p0Pb6vF9A='",
          "'sha256-9HGruJg4WccHXas5I1NmLn7tI1TDh6N26o6+/dy8sm4='",
          "'sha256-oM0kKtU+nugIwjuYHkXXVoKGVNhC/DCUnIVdSVBMkaQ='",
          "'self'",
          "*.digiven.com.br",
          "https://fonts.gstatic.com", // Google Fonts.
          "https://fonts.googleapis.com",
          "*.googletagmanager.com",
        ],
        fontSrc: [
          "https://fonts.gstatic.com", // Google Fonts.
          "https://fonts.googleapis.com", // Google Fonts.
        ], // Google Fonts.],
        scriptSrc: [
          "'self'", // Default policy for specifiying valid sources for fonts loaded using "@font-face": allow all content coming from origin (without subdomains).
          "'sha256-BWquNnQWVe3EInFog1hCP/nLb+4we1OJQ/tt7xbBDmM='",
          "'sha256-Jn0I4txezjIOaW1HEFk/Fp1FnrAJ0TBoiiFNAvyDYpY='",
          "*.digiven.com.br",
          "https://fonts.gstatic.com", // Google Fonts.
          "https://fonts.googleapis.com", // Google Fonts.
          "*.googletagmanager.com",
        ],
        connectSrc: [
          "*.google-analytics.com",
          "*.google.com.br",
          "*.google.com",
        ],
        objectSrc: ["'none'"],
        imgSrc: ["data:", "*.googletagmanager.com", "*.gstatic.com"],
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
  res.setHeader("content-type", "text/html");

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
