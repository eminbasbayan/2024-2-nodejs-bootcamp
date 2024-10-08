const path = require("node:path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const errorHandler = require("./middleware/errorHandler");
const reqHandler = require("./middleware/reqHandler");
const verifyJWT = require("./middleware/verifyJWT.js");

require("dotenv").config();

const mongoDbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDb!");
  } catch (err) {
    console.log(err);
  }
};

const whiteList = [
  "https://www.google.com.tr",
  "https://bilgisayargenetigi.com",
  "http://localhost:3000",
  "http://127.0.0.1:5500",
  "null"
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
app.use("/stripe", require("./routes/stripe.js"));
app.use("/iyzico", require("./routes/iyzico.js"));


// app.use(verifyJWT);
app.use("/products", require("./routes/api/products.js"));

app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server runnig on port ${port}`);
  mongoDbConnect();
});
