var fs = require("fs");

const input = fs.readFileSync('input.txt', 'utf8')
    .toString()
    .trim()
    .split("\n");

var fuel = input.map(mass => Math.floor(mass / 3) - 2)
    .reduce((a, b) => a + b, 0);

console.log(`Required fuel for modules: ${fuel}`);

function calc_fuel(mass) {
    fuel = Math.floor(mass / 3) - 2;
    console.log(fuel);
    if (fuel < 0)
        return 0;
    else
        return fuel + calc_fuel(fuel);
}
var total_fuel = input.map(mass => calc_fuel(mass))
    .reduce((a, b) => a + b, 0);

console.log(`Required fuel for modules and fuel: ${total_fuel}`);