#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int prime(int a, int b) {
  return a + b;
}

// emcc adder.c -o adder.js -s WASM=1 -s SIDE_MODULE=1 -s ONLY_MY_CODE=1