const js = require('./primes.js');
const addon = require('./build/Release/primes.node');

console.log("Hello performance friends.");
console.log();

function sanityCheck(n, expected) {
    if (js.prime(n) !== expected) {
        console.error(`Looks like your JavaScript is not right: ${js.prime(n)}`); 
    }
    if (addon.prime(n) !== expected) {
        console.error(`Looks like your C++ is not right ${addon.prime(n)}`);
    }
}

function run(i) {
    console.log(i);

    console.time('Prime in js');
    let upper = 1000000;
    for(let j = 0; j < upper; j++) {
        js.prime(i);
    }
    console.timeEnd('Prime in js');

    console.time('Prime in addon');
    for(let j = 0; j < upper; j++) {        
        addon.prime(i);
    }
    console.timeEnd('Prime in addon');
}

// Warm up.
const checks = [ 
    [1,2],
    [7,17],
    [10000, 104729],
    [100000, 1299709],
    // [1000000, 15485863],
    // [10000000, 179424673]
];

checks.forEach(function (a) {
    sanityCheck(...a); 
});

// Compute lots of primes.
for(let i = 1; i < 60; i++) {
    run(i);
}

// for(let i = 2; i < 10; i++) {
//     run(i*100);
// }

// for(let i = 1; i < 10; i++) {
//     run(i*1000);
// }

// for(let i = 1; i < 10; i++) {
//     run(i*10000);
// }

// for(let i = 1; i < 10; i++) {
//     run(i*100000);
// }

// run(1000000);


console.log();
console.log('So long and thanks for the fish.');