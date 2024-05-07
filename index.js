const http = require("node:http");

const server = http.createServer((request, response) => {
  const person = {
    firstName: "Emin",
    lastName: "Başbayan",
  };

  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(person));
});

server.listen(3000, () => {
  console.log("Server runnig on port 3000");
});
