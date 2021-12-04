var fs = require("fs");

const input = fs.readFileSync('input.txt', 'utf8')
    .toString()
    .trim()
    .split("\n");

var position = 0, depth = 0;

input.map(instruction => {
    instruction = instruction.split(" ");
    let units = instruction[1] * 1;
    switch (instruction[0]) {
        case "forward":
            position += units;
            break;
        case "down":
            depth += units;
            break;
        case "up":
            depth -= units;
            break;
        default:
            break;
    }
})
console.log(`depth: ${depth}, position: ${position}, multiplication: ${depth * position}`);

var position = 0, depth = 0, aim = 0;

input.map(instruction => {
    instruction = instruction.split(" ");
    let units = instruction[1] * 1;
    switch (instruction[0]) {
        case "forward":
            position += units;
            depth += units * aim;
            break;
        case "down":
            aim += units;
            break;
        case "up":
            aim -= units;
            break;
        default:
            break;
    }
})
console.log(`depth: ${depth}, position: ${position}, multiplication: ${depth * position}`);