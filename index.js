const EventEmitter = require("node:events");

// Yeni bir event yayıncısı (emitter) oluştur
const eventEmitter = new EventEmitter();

eventEmitter.on("orderPizza", (size, topping, quantity) => {
  console.log(
    `${quantity} adet ${size} boyutunda pizza pişiriliyor. İçindekiler: ${topping}`
  );
});

// large ise: ücretsiz içecek servisi kazandınız.
eventEmitter.on("orderPizza", (size)=>{
    if(size === "large"){
        console.log("Ücretsiz içecek servisi kazandınız.");
    }
})

eventEmitter.emit("orderPizza", "large", "mantar, sucuk, sosis, mısır", 5);
