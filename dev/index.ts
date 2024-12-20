import express = require("express");
import environment = require("dotenv"); environment.config();


const app = express();

app.get("/", (req, res) => {
    res.send("hello war");
});

app.listen(process.env.PORT, () => console.log("server is up and running"));