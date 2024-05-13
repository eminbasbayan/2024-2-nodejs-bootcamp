const express = require("express");
const app = express();
const path = require("node:path");

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/products", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "views", "products.html"));
});

app.get("/new-page.html", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page", (req, res) => {
  res.redirect(301, "/new-page.html");
});

app.get("/api/customers", (req, res) => {
  res.status(200).json([
    {
      name: "Emin Başbayan",
      address: {
        country: "Turkey",
        city: "İstanbul",
      },
    },
  ]);
});

app.use((req, res) => {
  res.status(404).send("Page not found!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server runnig on port ${port}`);
});
