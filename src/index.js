module.exports = function solveSudoku(matrix) {

    const matrixCopy = matrix.slice();

    return solveSudokuRecursive(matrixCopy);

};

function solveSudokuRecursive(puzzle) {

    const puzzleCopy = puzzle.slice();

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if(puzzle[row][col] === 0) {

                for(let number = 1; number <= 9; number++) {

                    if (isAllowed(puzzleCopy, row, col, number)) {
                        puzzleCopy[row][col] = number;
                        const result = solveSudokuRecursive(puzzle);
                        if (result) {
                            return result;
                        } else {
                            puzzleCopy[row][col] = 0;
                        }
                    }
                }

                return null;
            }
        }
    }
    return puzzleCopy;
}

function isAllowed(puzzle, rowIndex, colIndex, number) {
    const row = puzzle[rowIndex];
    const column = columnToArray(puzzle, colIndex);
    const square = squareToArray(puzzle, colIndex, rowIndex);
    const notAllowed = row.concat(column, square);

    return !notAllowed.includes(number);
}

function columnToArray(puzzle, idx) {
    return puzzle.map((row) => row[idx]) //мапим элементы по горизонтали, возвращаем массив-строку индексов?
}

function squareToArray(puzzle, x, y) {
    x = Math.floor(x / 3) * 3;
    y = Math.floor(y / 3) * 3;

    const arr = [];

    for (let i = x; i < x + 3; i++) {
        for (let j = y; j < y + 3; j++) {
            arr.push(puzzle[j][i]);
        }
    }

    return arr;
}


