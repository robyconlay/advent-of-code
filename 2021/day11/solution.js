const fs = require("fs");

if (process.argv[2] == undefined) {
    console.log("You should pass a filename");
    process.exit(1);
}

class Octopus {
    flashed = false;

    constructor(energy, row, col) {
        this.energy = energy;
        this.row = row;
        this.col = col;
    }

    energize() {
        if (this.energy < 9) {
            this.energy++;
        } else {
            this.energy = 0;
            this.flashed = true;
        }
    }
}

function addEnergy(octopies) {
    const flashed = [];
    octopies.forEach(row => {
        row.forEach(octopus => {
            octopus.flashed = false;
            octopus.energize();
            if (octopus.flashed)
                flashed.push(octopus);
        })
    });
    return flashed;
}

function resolveFlashes(octopies, queue) {
    let flashCount = 0;
    while (queue.length > 0) {
        const curr = queue.shift();
        for (const neighbor of findNeighbors(octopies, curr)) {
            if (neighbor.flashed)
                continue;
            neighbor.energize();
            if (neighbor.flashed)
                queue.push(neighbor)
        }
        flashCount++;
    }
    return flashCount;
}

function findNeighbors(octopies, curr) {
    const neighbors = [];
    const deltas = [
        { row: -1, col: -1 },
        { row: -1, col: 0 },
        { row: -1, col: 1 },
        { row: 0, col: -1 },
        { row: 0, col: 1 },
        { row: 1, col: -1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
    ];
    for (const delta of deltas) {
        const row = curr.row + delta.row;
        const col = curr.col + delta.col;
        if (octopies[row] == undefined) continue;
        if (octopies[row][col] == undefined) continue;
        neighbors.push(octopies[row][col]);
    }
    return neighbors;
}

const input = fs.readFileSync(process.argv[2], 'utf8')
    .toString()
    .trim()
    .split('\n');

var octopuses = input.map((line, row) => line.trim().split('')
    .map((energy, col) => new Octopus(parseInt(energy), row, col)));

const max_steps = 100;
var flashCount = 0;
var step = 1;

while (true) {
    const flashed = addEnergy(octopuses);
    let flashes = resolveFlashes(octopuses, flashed);
    flashCount += flashes;
    if (step == max_steps)
        console.log(`The number of flashes in 100 steps is ${flashCount}`)
    if (flashes == 100){
        console.log(`All octopie flash at step ${step}`)
        break;
    }
    step++;
}
