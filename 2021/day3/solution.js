const fs = require("fs");
require('colors');

const input = fs.readFileSync('input.txt', 'utf8')
    .toString()
    .trim()
    .split("\n");

var count = [];
const bit_count = input[0].length;
for (let i = 0; i < bit_count; i++) {
    count[i] = [];
    count[i][0] = 0;
    count[i][1] = 0;
}

input.forEach(number => {
    number = number.split('');
    number.forEach((bit, i) => {
        count[i][bit]++;
    });
});

var gamma_rate = 0, epsilon_rate = 0;
var binary_gamma = "", binary_epsilon = "";

for (let i = 0; i < bit_count; i++) {
    if (count[i][0] > count[i][1]) {
        binary_gamma += "0";
        binary_epsilon += "1";
    } else {
        binary_gamma += "1";
        binary_epsilon += "0";
    }
}

console.log('Gamma rate = ' + `${binary_gamma} (${parseInt(binary_gamma, 2)})`.blue +
    ', epsilon rate = ' + `${binary_epsilon} (${parseInt(binary_epsilon, 2)})`.blue);
console.log('The power consumption of the submarine is ' + `${parseInt(binary_gamma, 2) * parseInt(binary_epsilon, 2)}`.yellow);

var count = [];
var binary_oxygen = "", binary_co2 = "";

for (let i = 0; i < bit_count; i++) {
    count[i] = [];
    count[i][0] = 0;
    count[i][1] = 0;
}

input.forEach(number => {
    count[0][number[0]]++;
});
if (count[0][0] > count[0][1]) {
    binary_oxygen += "0";
    binary_co2 += "1";
} else {
    binary_oxygen += "1";
    binary_co2 += "0";
}

for (let i = 1; i < bit_count; i++) {
    input.forEach(number => {
        if (number.startsWith(binary_oxygen)) {
            //console.log(number + " starts with " + binary_oxygen);
            count[i][number[i]]++;
        }
    });
    if (count[i][0] > count[i][1]) {
        binary_oxygen += "0";
    } else { //<=
        binary_oxygen += "1";
    }
    //console.log(count[i][0], count[i][1], binary_oxygen);
}

for (let i = 1; i < bit_count; i++) {
    input.forEach(number => {
        if (number.startsWith(binary_co2)) {
            count[i][number[i]]++;
        }
    });
    if (count[i][0] <= count[i][1]) {
        binary_co2 += "0";
    } else { //>=
        binary_co2 += "1";
    }
}

console.log('Oxygen generator rating = ' + `${binary_oxygen} (${parseInt(binary_oxygen, 2)})`.blue +
    ', CO2 scrubber rating = ' + `${binary_co2} (${parseInt(binary_co2, 2)})`.blue);
console.log('The life support rating of the submarine is ' + `${parseInt(binary_oxygen, 2) * parseInt(binary_co2, 2)}`.yellow);
