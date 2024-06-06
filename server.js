const path = require("node:path");
const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const app = express();
const errorHandler = require("./middleware/errorHandler");
const reqHandler = require("./middleware/reqHandler");
const verifyJWT = require("./middleware/verifyJWT.js");

const whiteList = [
  "https://www.google.com.tr",
  "https://bilgisayargenetigi.com",
  "http://localhost:3000",
  "http://127.0.0.1:5500",
];

app.use(reqHandler);

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

// Middleware for cookies
app.use(cookieParser());

// Cross Origin Resource Sharing (CORS)
app.use(cors(corsOptions));

// form verilerini ayrıştırmak için middleware
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", require("./routes/route.js"));
app.use("/register", require("./routes/register.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/logout", require("./routes/logout.js"));
app.use("/refresh", require("./routes/refresh.js"));

app.use(verifyJWT);
app.use("/products", require("./routes/api/products.js"));

app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server runnig on port ${port}`);
});
