const chalk = require("chalk");

const print = (color, identifier, message) =>
  console.log(chalk.inverse[color].bold(`${identifier || ""}==>`, message));

const success = (message, identifier) =>
  print((color = "green"), identifier, message);

const warning = (message, identifier) =>
  print((color = "red"), identifier, message);

const info = (message, identifier) =>
  console.log(`${identifier || ""}==>`, message);

module.exports = { success, warning, info };
