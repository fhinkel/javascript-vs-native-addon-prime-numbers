#include <napi.h>
#include <math.h>

namespace primes {

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
int prime(napi_env env, int n) {
    if (n < 1) {
        napi_throw_error(env, nullptr, "n too small");
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

Napi::Value Method(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    int number = info[0].ToNumber().Int32Value();
    int res = primes::prime(env, number);
    return Napi::Number::New(env, res);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "prime"),
                Napi::Function::New(env, Method));
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)

} // End namespace prime