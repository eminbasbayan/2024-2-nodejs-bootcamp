const express = require("express");
const app = express();
const path = require("node:path");

let users = [
  { id: 1, name: "Ahmet", age: 25, email: "ahmet@example.com" },
  { id: 2, name: "Ayşe", age: 30, email: "ayse@example.com" },
  { id: 3, name: "Mehmet", age: 28, email: "mehmet@example.com" },
  { id: 4, name: "Fatma", age: 22, email: "fatma@example.com" },
  { id: 5, name: "Ali", age: 35, email: "ali@example.com" },
];

app.get("/", (req, res) => {
  res.json(users);
});

app.post("/", (req, res) => {
  const newUser = {
    id: 6,
    name: "Emin",
    age: 26,
    email: "eminbasbayan@bilgentech.com",
  };
  users = [...users, newUser];
  res.json(users);
});
  
app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server runnig on port ${port}`);
});
