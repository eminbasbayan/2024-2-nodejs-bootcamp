const fs = require("node:fs");

//! Senkron dosya okuma
// const txtFile = fs.readFileSync("./file.txt", "utf-8");
// console.log(txtFile.toString());

//! Asenkron dosya okuma
// fs.readFile("./file.txt", (err, data) => {
//   setTimeout(() => {
//     if (err) {
//       console.log("Dosya okunurken bir hata oluştu:", err);
//     } else {
//       console.log(data.toString());
//     }
//   }, 3000);
// });
// console.log("async");

//! Senkron dosya içine yazı yazma işlemi
// fs.writeFileSync("./file2.txt", "Hello World!");

//! Asenkron dosya içine yazı yazma işlemi
// fs.writeFile("./file3.txt", "Emin Başbayan", (err) => {
//   if (err) {
//     console.log("Dosya işleminde bir hata oluştu:", err);
//   }else{
//     console.log("Dosya işlemi başarılı!");
//   }
// });

//! Dosya içine yazı ekleme (asenkron)
// fs.writeFile("./file3.txt", "BilGen Yazılım Akademi", { flag: "a" }, (err) => {
//   if (err) {
//     console.log("Dosya işleminde bir hata oluştu:", err);
//   } else {
//     console.log("Dosya işlemi başarılı!");
//   }
// });

//! Dosya silme işlemi
fs.unlink("./file3.txt", (err) => {
  if (err) {
    console.log("Dosya silinemedi:", err);
    return;
  }
  console.log("Dosya başarıyla silindi!");
});
