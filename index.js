const EventEmitter = require("node:events");

// Yeni bir event yayıncısı (emitter) oluştur
const eventEmitter = new EventEmitter();

// Özel bir event dinleyicisi ekleyin
eventEmitter.on("hello", () => {
  console.log("Hello World!");
});

// "hello" eventini tetikle
eventEmitter.emit("hello");
