const EventEmitter = require("node:events");

class PizzaShop extends EventEmitter {
  constructor() {
    super();
    this.orderNumber = 0;
  }

  order(size, topping, quantity) {
    this.orderNumber++;
    this.emit("orderPizza", size, topping, quantity);
  }

  displayOrderNumber() {
    console.log(`Mevcut sipariş numarısı : ${this.orderNumber}`);
  }
}

module.exports = PizzaShop;
