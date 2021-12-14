const fs = require("fs");

if (process.argv[2] == undefined) {
    console.log("You should pass a filename");
    process.exit(1);
}

const input = fs.readFileSync(process.argv[2], 'utf8')
    .toString()
    .trim()
    .replace(/\r/g, '')
    .split('\n\n')

var paper = []
input[0].split('\n').forEach(coords => {
    var [x, y] = coords.split(',').map(value => parseInt(value))

    if (paper[x] == undefined)
        paper[x] = new Array();
    paper[x].push(y);
})

paper.forEach(line => line.sort())

var instructions = input[1].split('\n').map(fold => fold.replace('fold along', '').trim())

var first_sum = -1;

instructions.forEach(ins => {
    var [axis, coord] = ins.split('=');
    coord = parseInt(coord);
    if (axis == 'x') {
        for (let i = 1; i <= coord; i++) {
            if (paper[coord - i] == undefined)
                paper[coord - i] = new Array()
            if (paper[coord + i] == undefined)
                paper[coord + i] = new Array()
            paper[coord - i] = [...new Set([...paper[coord - i], ...paper[coord + i]])];
        }
        paper.length = coord;
    }
    if (axis == 'y') {
        paper = paper.map(col =>
            [...new Set(col.map(el => (el > coord ? (2 * coord) - el : el)))]
        )
    }
    if (first_sum == -1)
        first_sum = paper.slice().map(col => col.length).reduce((a, b) => a + b)
})
console.log('The number of visible dots is ' + first_sum + '\n')

const total_rows = Math.max(...paper.map(col => Math.max(...col))) + 1

for (let row = 0; row < total_rows; row++) {
    for (let col = 0; col < paper.length; col++) {
        if (paper[col].includes(row))
            process.stdout.write('#')
        else
            process.stdout.write('.')
    }
    console.log()
}

