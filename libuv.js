/* console.log("başlangıç");
for (let i = 0; i < 9000000000; i++) {}
console.log("bitiş"); */

/* ************ */

console.log("başlangıç");
setTimeout(() => {
  for (let i = 0; i < 9000000000; i++) {}
}, 1000);
console.log("bitiş");
