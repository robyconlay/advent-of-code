const fs = require("fs");

const input = fs.readFileSync('input.txt', 'utf8')
    .toString()
    .trim();

var fishes = Array(9).fill(0);

input.split(',')
    .map(age => parseInt(age))
    .forEach(age => {
        fishes[age]++;
    });

var sum80;
for (let day = 0; day < 256; day++) {
    if (day == 80) {
        sum80 = fishes.slice().reduce((a, b) => a + b);
    }
    var temp = fishes.shift();
    fishes[6] += temp;
    fishes.push(temp);
}

var sum256 = fishes.reduce((a, b) => a + b);

console.log(`After 80 days there will be ${sum80} lanternfishes`)
console.log(`After 256 days there will be ${sum256} lanternfishes`)