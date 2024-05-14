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

// Middleware to parse JSON bodies
app.use(express.json());

// read
app.get("/", (req, res) => {
  res.json(users);
});

// create
app.post("/", (req, res) => {
  const newUser = req.body;
  users = [...users, newUser];
  res.json(users);
});

// update
app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  users = users.map((user) => {
    if (user.id === Number(id)) {
      return { ...user, name };
    }
    return user;
  });
  res.json(users);
});

// delete
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  users = users.filter((user) => user.id !== Number(id));
  res.status(204).json(users);
});

app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server runnig on port ${port}`);
});
