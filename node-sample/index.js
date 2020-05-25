const http = require("http");
const url = require("url");
const fs = require("fs");

http.createServer((req, res) => {
    const filePath = url.parse(req.url, true).pathname === "/"
        ? "./index.html"
        : `.${url.parse(req.url, true).pathname}`;
    console.log(filePath);
    fs.readFile(filePath, (err, file) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return fs.readFile("./404.html", (err, file) => {
                if (err) {
                    throw err;
                } else {
                    res.write(file);
                    return res.end();
                }
            });
        } else {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(file);
            return res.end();
        }
    });
}).listen(8080);