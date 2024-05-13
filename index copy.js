const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((request, response) => {
  if (request.url === "/") {
    const name = "Arda";
    response.writeHead(200, { "Content-Type": "text/html" });
    let html = fs.readFileSync("./index.html", "utf-8");
    html = html.replace("{{name}}", name);
    response.end(html);
  } else if (request.url === "/products") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Products Page");
  } else if (request.url === "/api") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        firsName: "Emin",
        lastName: "Başbayan",
      })
    );
  } else {
    response.writeHead(404);
    response.end("Page not found!");
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server runnig on port ${PORT}`);
});
