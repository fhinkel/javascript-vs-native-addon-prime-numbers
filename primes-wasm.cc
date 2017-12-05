extern int sqrt(int);

bool isPrime(int p) {
    int upper = sqrt(p);
    for(int i = 2; i <= upper; i++) {
        if (p % i == 0 ) {
            return false;
        }
    }
    return true;
}

#ifdef __cplusplus
extern "C" {
#endif


// Return n-th prime
int prime(int n) {
    if (n < 1) {
        return -1;
    }
    int count = 0;
    int result = 1;
    while(count < n) {
        result++;        
        if (isPrime(result)) {
            count++;
        }
    }
    return result;
}

#ifdef __cplusplus
}
#endif

// emcc primes-wasm.cc -o primes1.js -s WASM=1 -s EXPORTED_FUNCTIONS="['_prime']" -s ONLY_MY_CODE=1
// -s SIDE_MODULE=1 causes stack overflow for me