const fs = require("fs");

if (process.argv[2] == undefined) {
    console.log("You should pass a filename");
    process.exit(1);
}

const input = fs.readFileSync(process.argv[2], 'utf8')
    .toString()
    .trim()
    .replace(/\r/g, '')
    .split('\n\n');

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    equals(point) {
        return this.x == point.x && this.y == point.y
    }
}
var paper = input[0].split('\n').map(coords => {
    var [x, y] = coords.split(',').map(value => parseInt(value))
    return new Point(x, y);
})

var remove_dup = () => {
    paper.forEach((point1, idx1) =>
        paper.forEach((point2, idx2) => {
            if (point1.equals(point2) && idx1 != idx2)
                paper.splice(idx2, 1)
        })
    )
}

var instructions = input[1].split('\n').map(fold => fold.replace('fold along', '').trim())

instructions.forEach((ins, id) => {
    var [axis_name, axis_value] = ins.split('=');
    axis_value = parseInt(axis_value);
    if (axis_name == 'x') {
        paper.forEach(point => {
            if (point.x > axis_value)
                point.x = (axis_value * 2) - point.x;
        })
    }
    if (axis_name == 'y') {
        paper.forEach(point => {
            if (point.y > axis_value)
                point.y = (axis_value * 2) - point.y;
        })
    }
    remove_dup()
    if (id == 0)
        console.log('The number of visible dots is ' + paper.length)
})

const max_x = paper.reduce((acc, point) => Math.max(acc, point.x), 0) + 1
const max_y = paper.reduce((acc, point) => Math.max(acc, point.y), 0) + 1

for (let y = 0; y < max_y; y++) {
    for (let x = 0; x < max_x; x++) {
        if (paper.filter(point => point.x == x && point.y == y).length > 0)
            process.stdout.write('#')
        else
            process.stdout.write('.')
    }
    console.log()
}