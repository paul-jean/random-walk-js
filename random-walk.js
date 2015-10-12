/**
 * Write a function random_walk(n) that runs a one-dimensional random walk.
 * Algorithm:
 * - start at position x = 0
 * - each step, decide to move right (+1) or left (-1)
 * - add the step direction to the coordinate at the previous time step
 * - eg
 * - t = 0, x = 0 (always)
 * - t = 1, direction = -1 => x = 0 + -1 = -1
 * - t = 2, direction = -1 => x = -1 + -1 = -2
 * - t = 3, direction = +1 => x = -2 + 1 = -1
 * - ...
 * - t = n, x = 10 (say)
 * @param n {Number} - number of steps to run, n >= 0
 * @return {Object} - an array of positions x(t), starting from x = 0:
 * eg [0, 1, 2, 1, 0, -1, -2, -1, 0, 1]
 */
var random_walk = function(n) {
    // compute the direction for each move
    var directions = [];
    for (var i = 0; i < n; i++) {
        if (Math.random() < 0.5) directions.push(-1);
        else directions.push(1);
    }
    // start at position x = 0
    var positions = [0];
    for (i = 0; i < n; i++) {
        positions.push(positions[i] + directions[i]);
    }
    // eg n = 3, directions = [-1, 1, 1]
    // i    directions[i]   positions
    // 0    -1              [0, -1]
    // 1    +1              [0, -1, 0]
    // 2    +1              [0, -1, 0, 1]
    return positions;
};


/**
 * Write a function plot_walk(array) that takes an array of positions x,
 * and plots the progress of the random walk to the terminal.
 * @param array {Object} - array of positions starting from zero: [0, ...]
 * @return null
 */
var plot_walk = function(walk_arr) {
    // associate a dot on the screen with the position of the random walk
    // let time flow downwards on the screen
    // the screen has some max width: M characters wide
    // the center is x = 0
    // to the right is x = M/2
    // to the left is x = -M/2
    // what if x > M/2? wrap it around to the left
    // what if x < -M/2? wrap it around to right
    // let a single line be
    // x
    // -10         0         10
    //   ----------------o---------------------
    var steps = walk_arr.length;
    if (steps === 0) return null;
    var left_edge = -20;
    var right_edge = 20;
    var x, line;
    // given a position x(t), plot a line for that time step:
    for (var t = 0; t < steps; t ++) {
        x = walk_arr[t];
        if (x < left_edge || x > right_edge) {
            console.log('walk out of bounds!');
            return null;
        }
        line = '';
        for (var i = left_edge; i < x; i ++) {
            line += '-';
        }
        line += 'o';
        for (; i < right_edge; i ++) {
            line += '-';
        }
        console.log(line);
    }
    return;
    // TODO:
    // if -M/2 <= x <= +M/2
    //  - append '-' characters from i = -M/2 to i = x - 1
    //  - append 'o' at i = x
    //  - append '-' characters up to i = +M/2
    
    // if x < -M/2
    //  - wrap around to the right
    //  - (x - M/2) chars from the right edge
    // if x > M/2
    //  - wrap around the to left
    //  - (x - M/2) chars from the left edge
};

var walk1 = random_walk(20);
console.log('walk 1:');
console.log(walk1);
console.log('walk plot 1:');
plot_walk(walk1);

var walk2 = random_walk(20);
console.log('walk 2:');
console.log(walk2);
console.log('walk plot 2:');
plot_walk(walk2);
