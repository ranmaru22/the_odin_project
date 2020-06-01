const http = require("http");
const url = require("url");
const fs = require("fs");
const express = require("express");

const app = express();
const router = express.Router();

app.use(router);
app.use(express.static("public"));

router.get("/about", (req, res) => {
    res.redirect("about.html");
});

router.get("/contact-me", (req, res) => {
    res.redirect("contact-me.html");
});

// 404 handler
app.use((req, res) => {
    res.redirect("404.html");
});

app.listen(8080);

// http.createServer((req, res) => {
//     const filePath = url.parse(req.url, true).pathname === "/"
//         ? "index"
//         : url.parse(req.url, true).pathname;
//     fs.readFile(`./${filePath}.html`, (err, file) => {
//         if (err) {
//             res.writeHead(404, { "Content-Type": "text/html" });
//             return fs.readFile("./404.html", (err, file) => {
//                 if (err) {
//                     throw err;
//                 } else {
//                     res.write(file);
//                     return res.end();
//                 }
//             });
//         } else {
//             res.writeHead(200, { "Content-Type": "text/html" });
//             res.write(file);
//             return res.end();
//         }
//     });
// }).listen(8080);