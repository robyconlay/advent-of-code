const fs = require("fs");

const input = fs.readFileSync('input.txt', 'utf8')
    .toString()
    .trim()
    .split('\n');

var unique_digits = input.map(line => {
    var [, line_output] = line.split('|');
    return line_output.trim()
        .split(' ')
        .filter(digit => [2, 3, 4, 7].includes(digit.length))
        .length;
}).reduce((a, b) => a + b);

console.log(`Number of unique digits in output is ${unique_digits}`)

function getDifference(a, b) {
    return a.split('').filter(char => !b.split('').includes(char)).join('');
}

var output_sum = 0;

input.map(line => {
    var [line_input, line_output] = line.split('|');
    line_input = line_input.trim()
        .split(' ')
        .sort((a, b) => a.length - b.length)
        .map(digit_string => digit_string.split('').sort().join(''));

    var decode_dictionary = Array(10);
    decode_dictionary[1] = line_input[0];
    decode_dictionary[4] = line_input[2];
    decode_dictionary[7] = line_input[1];
    decode_dictionary[8] = line_input[9];

    var difference84 = getDifference(decode_dictionary[8], decode_dictionary[4]);

    /*
    if numberSequence Length is 5
        if the numberSequence contains all items from the 1 pattern, the numberSequence must be 3
        if the numberSequence is not 3 and contains difference of 8 and 4, the numberSequence must be 2
        else the numberSequence must be 5

    and 

    if numberSequence Length is 6 
        if the numberSequence contains all items from the 4 pattern, the numberSequence must be 9 
        if the numberSequence is not 9 and contains all items from the 7 pattern, the numberSequence must be 0 
        else the numberSequence must be 6
    */

    for (let index = 3; index <= 9; index++) {
        if (line_input[index].length == 5) {
            var condition3 = decode_dictionary[1].split('').filter(char => line_input[index].includes(char)).length == 2;
            var condition2 = difference84.split('').filter(char => line_input[index].includes(char)).length == 3;
            if (condition3) {
                decode_dictionary[3] = line_input[index];
            } else if (condition2) {
                decode_dictionary[2] = line_input[index];
            } else {
                decode_dictionary[5] = line_input[index];
            }
        } else if (line_input[index].length == 6) {
            var condition9 = decode_dictionary[4].split('').filter(char => line_input[index].includes(char)).length == 4;
            var condition0 = decode_dictionary[7].split('').filter(char => line_input[index].includes(char)).length == 3;
            if (condition9) {
                decode_dictionary[9] = line_input[index];
            } else if (condition0) {
                decode_dictionary[0] = line_input[index];
            } else {
                decode_dictionary[6] = line_input[index];
            }
        }
    }
    output_sum += parseInt(line_output.trim()
        .split(' ')
        .map(digit_string => digit_string.split('')
            .sort()
            .join(''))
        .map(digit_string => {
            return decode_dictionary.indexOf(digit_string).toString()
        })
        .reduce((a, b) => a + b));
});

console.log(`Sum of all output values is ${output_sum}`)