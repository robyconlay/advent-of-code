var fs = require("fs");

const input = fs.readFileSync('input.txt', 'utf8')
    .toString()
    .trim()
    .split("\n");

var total = 1;

for (let i = 0; i < input.length - 1; i++) {
    total += (input[i] < input[i + 1]);
}
console.log(`The number of times a depth measurement increases is ${total}`);

total_window = 0;
window = null;

input.forEach((value, i) => {
    if (i + 2 < input.length) {
        new_window = parseInt(input[i]) + parseInt(input[i + 1]) + parseInt(input[i + 2]);
        if (window != null)
            total_window += window < new_window;
        window = new_window;
    }
});

console.log(`The number of times the sum of measurements in this sliding window increases is ${total_window}`);