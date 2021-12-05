const fs = require("fs");

var input = fs.readFileSync('input.txt', 'utf8')
    .toString()
    .split('\n');

called_numbers = input[0].split(',').map(number => parseInt(number));
input = input.splice(1).filter(line => line != '' && line != ' ');

var boards = [];
while (input.length >= 4) {
    boards.push(
        input.splice(0, 5)
            .map(row =>
                row.split(' ')
                    .filter(number => number != '')
                    .map(number => parseInt(number))
            )
    );
}

var check_board = board => {
    for (let i = 0; i < 5; i++) {//check col
        let col_counter = 0, row_counter = 0;
        for (let j = 0; j < 5; j++) {
            col_counter += board[i][j];
            row_counter += board[j][i];
        }
        if (col_counter == -5 || row_counter == -5)
            return true;
    }
    return false;
}

var victory = false;
var first_winning_number, first_winning_board;
var last_winning_number, last_winning_board;

called_numbers.forEach(call => {
    boards = boards.map(board =>
        board.map(row =>
            row.map(number => number == call ? -1 : number)
        )
    );
    boards.forEach(new_board => {
        if (check_board(new_board)) {
            if (!victory) {
                first_winning_number = call;
                first_winning_board = new_board;
                victory = true;
            }
            if (boards.length == 1) {
                last_winning_number = call;
                last_winning_board = new_board;
            }
            boards = boards.filter(board => board != new_board);
        }
    })
})

var first_unmarked_sum = 0;
var last_unmarked_sum = 0;

first_winning_board.forEach(row => {
    row.forEach(value => {
        if (value != -1)
            first_unmarked_sum += value;
    })
})

last_winning_board.forEach(row => {
    row.forEach(value => {
        if (value != -1)
            last_unmarked_sum += value;
    })
})

console.log("First winning board:")
console.log(first_winning_board)
console.log("First winning number: " + first_winning_number)
console.log("Sum of all unmarked numbers: " + first_unmarked_sum)
console.log(`If you choose that board the final score will be ${first_unmarked_sum * first_winning_number}`)

console.log("\nLast winning board:")
console.log(last_winning_board)
console.log("Last winning number: " + last_winning_number)
console.log("Sum of all unmarked numbers: " + last_unmarked_sum)
console.log(`If you choose that board the final score will be ${last_unmarked_sum * last_winning_number}`)