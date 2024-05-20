const path = require("node:path");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

const whiteList = [
  "https://www.google.com.tr",
  "https://bilgisayargenetigi.com",
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

const filePath = "data.json";

const readData = () => {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
};

const writeData = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

//! CRUD

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
