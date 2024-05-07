// 1- fs modülünü kullanarak, belirli bir dizindeki bir dosyayı okuyun. Bu dosya, basit bir metin dosyası olabilir.

// 2- Dosyanın içeriğini konsola yazdırın.
// path modülünü kullanarak, dosyanın tam yolunu (absolute path) hesaplayın ve bu yolu konsola yazdırın.

// 3- Dosyanın adını ve uzantısını ayırarak konsola yazdırın.

const fs = require("node:fs");
const path = require("node:path");

// Dosya yolu
const dosyaYolu = path.join(__dirname, "file.txt");

// Dosya okuma
fs.readFile(dosyaYolu, "utf-8", (err, data) => {
  if (err) {
    console.log("Dosya okunurken bir hata oluştu:", hata);
    return;
  }
  console.log("Dosya içeriği:", data);
});

// Tam yolu
console.log("Tam dosya yolu:", dosyaYolu);

// Dosya adı ve uzantısı
console.log("Dosya adı:", path.basename(dosyaYolu));
console.log("Dosya uzantısı:", path.extname(dosyaYolu));

