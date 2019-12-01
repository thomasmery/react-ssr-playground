require("@babel/register");
import path from "path";
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "../shared/App";

const app = express();
const port = 3000;
const handleRender = (req, res) => {
  const appHtml = renderToString(<App />);
  res.send(renderFullPage(appHtml));
};
function renderFullPage(appHtml) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>My app</title>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </head>
      <body>
        <div id="root">${appHtml}</div>
      </body>
    </html>
    `;
}
console.log(__dirname);
app.use(express.static(path.join(__dirname, "static")));
app.use(handleRender);

app.listen(port, () => console.log(`Now listening on port ${port}`));
