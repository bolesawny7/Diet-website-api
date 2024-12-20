"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const environment = require("dotenv");
environment.config();
const app = express();
app.get("/", (req, res) => {
    res.send("hello war");
});
app.listen(process.env.PORT, () => console.log("server is up and running"));
