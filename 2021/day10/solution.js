const fs = require("fs");
const filename = process.argv[2];

const input = fs.readFileSync(filename, 'utf8')
    .toString()
    .trim()
    .split('\n');

var illegal_score = 0;
var autocomplete_scores = [];
var chunks = [];

var closing_chars = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
}

var illegal_chars = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}

var autocomplete_chars = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
}

// var check_chunk = char => {
//     console.log(char, char in closing_chars, closing_chars[char])
//     if ((char in closing_chars) != undefined){
//         var cc = chunks.pop()
//         console.log(cc, cc == closing_chars[char])
//         return cc == closing_chars[char]
//     }
//     else {
//         chunks.push(char);
//         return true;
//     }
// }

var check_chunk = char => {
    // console.log(char, char in closing_chars, closing_chars[char])

    if (char == ')') {
        return chunks.pop() == '('
    } else if (char == '>') {
        return chunks.pop() == '<'
    } else if (char == ']') {
        return chunks.pop() == '['
    } else if (char == '}') {
        return chunks.pop() == '{'
    } else {
        chunks.push(char);
        return true;
    }
}


input.map(line => {
    var found = false;
    line.trim().split("").forEach(char => {
        if (!found && !check_chunk(char)) {
            illegal_score += illegal_chars[char];
            found = true;
        }
    });

    if (!found) {
        var missing_score = 0;
        while (chunks.length > 0) {
            missing_score *= 5;
            missing_score += autocomplete_chars[chunks.pop()];
        }
        autocomplete_scores.push(missing_score);
    }
    chunks = []
})

console.log("The total syntax error score for those errors is", illegal_score);

console.log("The middle score of the autocomplete tools is", autocomplete_scores.sort((a, b) => b - a)[Math.floor(autocomplete_scores.length / 2)])

