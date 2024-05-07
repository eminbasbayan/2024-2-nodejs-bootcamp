const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((request, response) => {
  const person = {
    firstName: "Emin",
    lastName: "Başbayan",
  };

  response.writeHead(200, { "Content-Type": "text/html" });
  // fs.createReadStream(__dirname + "/index.html").pipe(response);
  const html = fs.readFileSync("./index.html", "utf-8");
  response.end(html);
});

server.listen(3000, () => {
  console.log("Server runnig on port 3000");
});
