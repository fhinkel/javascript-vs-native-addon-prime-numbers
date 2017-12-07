const js = require('./primes.js');
const addon = require('./build/Release/primes.node');
const wasm = require('./wasm-api.js');

const { performance } = require('perf_hooks');

function sanityCheck(n, expected) {
    if (js.prime(n) !== expected) {
        console.error(`Looks like your JavaScript is not right: ${js.prime(n)}`); 
    }
    if (addon.prime(n) !== expected) {
        console.error(`Looks like your C++ is not right ${addon.prime(n)}`);
    }
    if (wasm._prime(n) !== expected) {
        console.error(`Looks like your WebAssemby is not right ${wasm.prime(n)}`);
    }
}

function run(i) {
    var js0 = performance.now();
    js.prime(i);
    var js1 = performance.now();

    var addon0 = performance.now();
    addon.prime(i);
    var addon1 = performance.now();

    var wasm0 = performance.now();
    wasm.prime(i);
    var wasm1 = performance.now();

   //console.log(i + "\t" + (js1 - js0) + "\t" + (addon1 - addon0) + "\t" + (wasm1 - wasm0));

    writeStream.write(i + "\t" + (js1 - js0) + "\t" + (addon1 - addon0) + "\t" + (wasm1 - wasm0) + "\n");
}

const fs = require('fs');

let writeStream = fs.createWriteStream('public/wasm.tsv');
writeStream.write('id\tJavaScript\tC++\tWebAssembly\n');


wasm.onRuntimeInitialized = () => {
    console.log("Hello performance friends.");
    console.log();
    wasm.prime = wasm.cwrap('prime', 'number', ['number']);

    // Compute lots of primes.
    for(let i = 1; i < 100; i++) {
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

    // Sanity checks.
    const checks = [ 
        [1,2],
        [2,3],
        [3,5],
        [7,17],
        [10000, 104729],
        // [100000, 1299709],
        // [1000000, 15485863],
        // [10000000, 179424673]
    ];

    // Run the checks at the end, otherwise
    // they turn on JS optimizations before we start running. 
    checks.forEach(function (a) {
        sanityCheck(...a); 
    });

    console.log();
    console.log('So long and thanks for the fish.');

    writeStream.end();
}

 const express = require('express');

 const app = express();
 
 app.use(express.static('public'));
 
 app.listen(3000, () => console.log('Example app listening on port 3000'))