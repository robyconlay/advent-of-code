const fs = require("fs");

const input = fs.readFileSync('input.txt', 'utf8')
    .toString()
    .trim()
    .split(',')
    .map(number => parseInt(number));

var sum_previous = number => {
    if (number > 1)
        return number + sum_previous(number - 1);
    return number;
}

var best_cost1 = Number.POSITIVE_INFINITY;
var best_cost2 = Number.POSITIVE_INFINITY;
for (let index = Math.min(...input); index < Math.max(...input); index++) {
    var cost1 = 0, cost2 = 0;
    cost1 += input.map(position =>
        Math.abs(position - index)
    ).reduce((a, b) => a + b);
    cost2 += input.map(position =>
        sum_previous(Math.abs(position - index))
    ).reduce((a, b) => a + b);
    best_cost1 = Math.min(best_cost1, cost1);
    best_cost2 = Math.min(best_cost2, cost2);
}

console.log("How much fuel must they spend to align to that position?", best_cost1)
console.log("How much fuel must they spend to align to that position?", best_cost2)
