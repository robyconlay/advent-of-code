var fs = require("fs");

const input = fs.readFileSync('input.txt', 'utf8')
    .toString()
    .trim()
    .split("\n");

var position = 0, depth = 0;

input.map(instruction => {
    instruction = instruction.split(" ");
    instruction[1] = instruction[1] * 1;
    if (instruction[0] == "forward") {
        position += instruction[1]
    } else if (instruction[0] == "down") {
        depth += instruction[1];
    } else {
        depth -= instruction[1];
    }
})
console.log(`depth: ${depth}, position: ${position}, multiplication: ${depth * position}`);

var position = 0, depth = 0, aim = 0;

input.map(instruction => {
    instruction = instruction.split(" ");
    instruction[1] = instruction[1] * 1;
    if (instruction[0] == "forward") {
        position += instruction[1]
        depth += instruction[1] * aim;
    } else if (instruction[0] == "down") {
        aim += instruction[1];
    } else {
        aim -= instruction[1];
    }
})
console.log(`depth: ${depth}, position: ${position}, multiplication: ${depth * position}`);