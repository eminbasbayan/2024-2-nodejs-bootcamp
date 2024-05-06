const PizzaShop = require("./pizza-shop.js");
const DrinkMachine = require("./drink-machine.js");

const pizzaShop = new PizzaShop();
const drinkMachine = new DrinkMachine();

pizzaShop.on("orderPizza", (size, topping, quantity) => {
  console.log(
    `${quantity} adet ${size} boyutunda pizza sipariş verildi. İçindekiler: ${topping}`
  );
  drinkMachine.serveDrink(size);
});

pizzaShop.order("large", "mantar", 5);
pizzaShop.order("small", "mısır", 2);
pizzaShop.displayOrderNumber();
