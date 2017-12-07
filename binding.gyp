{
    "targets": [
        {
            "target_name": "primes",
            "sources": [ "primes.cc"],
            "include_dirs": ["<!@(node -p \"require('node-addon-api').include\")"],
            "dependencies": ["<!(node -p \"require('node-addon-api').gyp\")"],
            "defines": [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ]
        }
    ]
 
}