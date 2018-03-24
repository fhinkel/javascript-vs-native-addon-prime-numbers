#include <webassembly.h>
#include <math.h>

bool isPrime(int p) {
    int upper = sqrt(p);
    for(int i = 2; i <= upper; i++) {
        if (p % i == 0 ) {
            return false;
        }
    }
    return true;
}

// Return n-th prime
export int prime(int n) {
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
