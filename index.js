const fs = require("node:fs").promises;
// const fs = require("node:fs/promises");

// fs.readFile("./file.txt", "utf-8")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err))
//   .finally(() => console.log("işlem tamamlandı!"));

const readFile = async () => {
  try {
    const data = await fs.readFile("./file.txt");
    console.log(data);
    return "Emin";
  } catch (err) {
    console.log(err);
  } finally {
    console.log("işlem tamamlandı");
  }
};

readFile()
  .then((data) => {
    return data;
  })
  .then((data) => console.log(data));

console.log("async");
