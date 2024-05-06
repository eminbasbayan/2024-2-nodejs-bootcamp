const path = require("node:path");

// console.log(path.basename(__filename));
// console.log(path.basename(__dirname));

// console.log(path.extname(__filename));
// console.log(path.extname(__dirname));

// console.log(path.parse(__filename));
// console.log(path.format(path.parse(__filename)));

// console.log(__filename);
// console.log(__dirname);

// console.log(
//   path.join(__dirname, "folder1", "folder2", "folder3", "index.html")
// );

console.log(path.join("/folder1", "folder2", "folder3", "index.html"));
console.log(path.join("/folder1", "//folder2", "folder3", "index.html"));
console.log(path.join("/folder1", "//folder2", "folder3", "../index.html"));
