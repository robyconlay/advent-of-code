const fs = require("fs");

if (process.argv[2] == undefined) {
    console.log("You should pass a filename");
    process.exit(1);
}

const input = fs.readFileSync(process.argv[2], 'utf8')
    .toString()
    .trim()
    .split('\n\n')

var template = input[0].trim().split('')
var ins_rules = {}
input[1].split('\n').forEach(rule => {
    const [pair, el] = rule.split(' -> ')
    ins_rules[pair] = el;
})

const max_steps = 40;

for (let step = 0; step < max_steps; step++) {
    console.log("Step " + step)
    var to_be_inserted = []
    for (let i = 0; i < template.length - 1; i++) {
        const pair_temp = [...template[i], ...template[i + 1]].join('');
        to_be_inserted.push(ins_rules[pair_temp])
    }
    to_be_inserted.forEach((el, idx) => {
        template.splice((idx * 2) + 1, 0, el)
    });
}

var count = {}
template.forEach(el => {
    if (count[el] == undefined)
        count[el] = 0;
    count[el]++
})

var max = 0, min = Number.POSITIVE_INFINITY;
for (let [key, value] of Object.entries(count)) {
    max = Math.max(max, value);
    min = Math.min(min, value)
}

console.log(max - min)
