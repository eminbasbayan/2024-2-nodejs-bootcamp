const express = require("express");
const fs = require("fs");
const app = express();
const path = require("node:path");

// Middleware to parse JSON bodies
app.use(express.json());

const filePath = "data.json";

const readData = () => {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
};

const writeData = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

// read
app.get("/", (req, res) => {
  const data = readData();
  res.json(data);
});

// create
app.post("/", (req, res) => {
  const newUser = req.body;
  let users = readData();
  users = [...users, newUser];
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  res.status(201).json(users);
});

// update
app.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  let users = readData();
  users = users.map((user) =>
    user.id === Number(id) ? { ...user, ...updatedData } : user
  );
  writeData(users);
  res.json(users);
});

// delete
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  let users = readData();
  users = users.filter((user) => user.id !== Number(id));
  writeData(users);
  res.status(204).json(users);
});

app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server runnig on port ${port}`);
});
