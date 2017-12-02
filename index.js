const js = require('./primes.js');
const addon = require('./build/Release/primes.node');

console.log("Hello performance friends.");
console.log();

// Sanity check.
if (js.prime(7) !== 17) {
    console.error(`Looks like your JavaScript is not right: ${js.prime(7)}`);
}
if (addon.prime(7) !== 17) {
    console.error(`Looks like your JavaScript is not right ${addon.prime(7)}`);
}


console.time('Prime in js');
js.prime(7)
console.timeEnd('Prime in js');

console.time('Prime in addon');
addon.prime(7)
console.timeEnd('Prime in addon');

console.log();
console.log('So long and thanks for the fish.');