'use strict';

exports.ready = require('webassembly')
    .load('primes.wasm')
    .then((wasm) => {
        const wasmPrime = wasm.exports.prime;
        exports.prime = function prime(n) {
            if (n < 1) {
                throw Error("n too small: " + n);
            }
            return wasmPrime(n);
        };
    });
