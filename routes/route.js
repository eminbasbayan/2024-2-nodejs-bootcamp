const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const filePath = "data.json";

const readData = () => {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
};

const writeData = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

// index.html dosyasını işleyen route
router.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "views", "index.html"));
});

// form verilerini işleyen route
router.post("/submit-form", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  res.send(`Username: ${username}, Password: ${password}`);
});

//! CRUD

// read
router.get("/api/users/get-all", (req, res) => {
  const data = readData();
  res.json(data);
});

// create
router.post("/api/users/create", (req, res) => {
  const newUser = req.body;
  let users = readData();
  users = [...users, newUser];
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  res.status(201).json(users);
});

// update
router.put("/api/users/:id", (req, res) => {
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
router.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  let users = readData();
  users = users.filter((user) => user.id !== Number(id));
  writeData(users);
  res.status(204).json(users);
});

module.exports = router;
