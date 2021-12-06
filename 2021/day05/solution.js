const fs = require("fs");

var input = fs.readFileSync('input.txt', 'utf8')
    .toString()
    .trim()
    .split('\n');

var floor1 = Array(1000).fill().map(() => Array(1000).fill(0));
var floor2 = Array(1000).fill().map(() => Array(1000).fill(0));

input.forEach(line => {
    line = line.split(' -> ');
    var [x1, y1] = line[0].split(',').map(string => parseInt(string));
    var [x2, y2] = line[1].split(',').map(string => parseInt(string));
    if (x1 == x2 || y1 == y2) { //horizontal or vertical
        for (var x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            for (var y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                floor1[x][y] += 1;
                floor2[x][y] += 1;
            }
        }
    } else { //diagonal
        var x = x1;
        var y = y1;
        while (x <= Math.max(x1, x2) && x >= Math.min(x1, x2) &&
            y <= Math.max(y1, y2) && y >= Math.min(y1, y2)) {
            floor2[x][y] += 1;
            if (x1 < x2)
                x++;
            else
                x--;
            if (y1 < y2)
                y++;
            else
                y--;
        }
    }
})

var floor1_counter = 0;
floor1.forEach(line => {
    floor1_counter += line.filter(number => number > 1).length;
})
console.log(`At least two lines overlap at ${floor1_counter} points`);

var floor2_counter = 0;
floor2.forEach(line => {
    floor2_counter += line.filter(number => number > 1).length;
})
console.log(`At least two lines overlap at ${floor2_counter} points`);