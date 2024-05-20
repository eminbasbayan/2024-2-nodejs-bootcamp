const path = require("node:path");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const errorHandler = require("./middleware/errorHandler");
const logEvents = require("./middleware/logEvents");

const whiteList = [
  "https://www.google.com.tr",
  "https://bilgisayargenetigi.com",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Bu adrese izin verilmedi!"));
    }
  },
};

// Middleware to parse JSON bodies
app.use(express.json());

// Cross Origin Resource Sharing (CORS)
app.use(cors(corsOptions));

// form verilerini ayrıştırmak için middleware
app.use(express.urlencoded({ extended: false }));

const filePath = "data.json";

const readData = () => {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
};

const writeData = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

// index.html dosyasını işleyen route
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
});

// form verilerini işleyen route
app.post("/submit-form", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  res.send(`Username: ${username}, Password: ${password}`);
});

//! CRUD

// read
app.get("/api/users/get-all", (req, res) => {
  const data = readData();
  res.json(data);
});

// create
app.post("/api/users/create", (req, res) => {
  const newUser = req.body;
  let users = readData();
  users = [...users, newUser];
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  res.status(201).json(users);
});

// update
app.put("/api/users/:id", (req, res) => {
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
app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  let users = readData();
  users = users.filter((user) => user.id !== Number(id));
  writeData(users);
  res.status(204).json(users);
});

app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server runnig on port ${port}`);
});
