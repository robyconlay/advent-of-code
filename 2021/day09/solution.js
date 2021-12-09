const fs = require("fs");

const input = fs.readFileSync('input.txt', 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map(line => line.trim().split('').map(value => parseInt(value)));

var risk_sum = 0;
var biggest_basins = new Array(3).fill(0);

var calc_basin_size = (i, j) => {
    if (input[i] != undefined && input[i][j] != undefined && input[i][j] < 9) {
        input[i][j] = 9;
        return 1 + calc_basin_size(i + 1, j) + calc_basin_size(i - 1, j) + calc_basin_size(i, j + 1) + calc_basin_size(i, j - 1);
    }
    return 0;
}

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
        var min = Math.min(input[i + 1] !== undefined ? input[i + 1][j] : 1000,
            input[i - 1] !== undefined ? input[i - 1][j] : 1000,
            input[i][j + 1] !== undefined ? input[i][j + 1] : 1000,
            input[i][j - 1] !== undefined ? input[i][j - 1] : 1000);

        if (input[i][j] < min) {
            risk_sum += input[i][j] + 1;
            var basin_size = calc_basin_size(i, j);
            if (basin_size > biggest_basins[2]) {
                biggest_basins[2] = basin_size;
                biggest_basins.sort((a, b) => b - a);
            }
        }
    }
}

console.log(`The sum of the risk levels of all low points on your heightmap is ${risk_sum}`)
console.log(`The multiplication of the 3 biggest basins (${biggest_basins.toString()}) is ${biggest_basins.reduce((a, b) => a * b)}`);