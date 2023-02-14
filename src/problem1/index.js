// Test by running node index.js in CLI.

var sum_to_n_a = function(n) {
    return (n * (n + 1)) / 2;
};

var sum_to_n_b = function(n) {
    if (n === 0) {
        return 0;
    } else {
        return n + sum_to_n_b(n - 1);
    }
};

var sum_to_n_c = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

const n = 5;

console.log("Solution 1: ", sum_to_n_a(n));
console.log("Solution 2: ", sum_to_n_b(n));
console.log("Solution 3: ", sum_to_n_c(n));