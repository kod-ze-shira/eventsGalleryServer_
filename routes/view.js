const express = require("express");
const router = express.Router();
const path = require("path");
const request = require("request");


router.get("/*", (req, res) => {
    console.log("view12")
    // res.write('<h1>welcome to events gallery</h1>')
    res.sendFile(path.join(__dirname, "../build/index.html"));
});


module.exports = router;


