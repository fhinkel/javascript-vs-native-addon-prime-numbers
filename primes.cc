#include <node_api.h>
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

napi_value Method(napi_env env, napi_callback_info info) {
    napi_status status;

    size_t argc = 1;
    int number = 0;
    napi_value argv[1];
    status = napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);
    if (status != napi_ok) return nullptr;

    status = napi_get_value_int32(env, argv[0], &number);
    if (status != napi_ok) return nullptr;

    int res = primes::prime(env, number);
    napi_value prime;
    status = napi_create_int32(env, res, &prime);
    if (status != napi_ok) return nullptr;

    return prime;
}

napi_value init(napi_env env, napi_value exports) {
    napi_status status;
    napi_value fn;

    status = napi_create_function(env, nullptr, 0, Method, nullptr, &fn);
    if (status != napi_ok) return nullptr;

    status = napi_set_named_property(env, exports, "prime", fn);
    if (status != napi_ok) return nullptr;
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init)

} // End namespace prime