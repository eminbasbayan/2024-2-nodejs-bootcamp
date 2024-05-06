function helloFn(name) {
  console.log(`Hello, ${name}`);
}

function helloName(callbackFn) {
  const name = "Emin";
  callbackFn(name);
}

helloName(helloFn);
