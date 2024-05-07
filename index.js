const buffer = new Buffer("BilGen");

buffer.write("Emin");

console.log(buffer);
// console.log(buffer.toString("hex"));
// console.log(buffer.toString("ascii"));
console.log(buffer.toString());
console.log(buffer.toJSON());