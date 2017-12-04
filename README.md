# Speed up your Node.js App with Native Addons. What’s faster, C++ or JavaScript?

This example compares JavaScript to C++ in Node.js for computing prime numbers. 

JavaScript is a ridiculously fast scripting language thanks to modern JavaScript engines. But how fast is JavaScript compared to C++? This repository contains an example that computes prime numbers in Node both with JavaScript and with a native C++ addon.


## Usage

```
git clone git@github.com:fhinkel/javascript-vs-native-addon-prime-numbers.git
npm install
npm start
```

Experiment with this example yourself. Just remember to run `npm install` to recompile the addon if you change any C++ code. 

## Results

**If your Node app’s sole purpose is to compute prime numbers and you don’t want to use a fast lookup table, please rely on this benchmark 100%. For anything else, this benchmark is probably useless.**

The JavaScript and the C++ implementation use the same algorithm. Calling into the addon and running the computations in C++ is faster than staying in JavaScript except for small prime numbers, i.e., the first 25 prime numbers.

### Computing the first 1,000,000 prime numbers without warm up
![Computing the first 1,000,000 prime numbers with Node 9.2.](https://fhinkel.github.io/javascript-vs-native-addon-prime-numbers/WithOpt.png)

### Computing prime numbers without adaptive optimizations
![Computing prime numbers without adaptive optimizations.](https://fhinkel.github.io/javascript-vs-native-addon-prime-numbers/WithoutOpt.png)

### Data
[Spreadsheet with data](https://docs.google.com/spreadsheets/d/1VhhGmq7DWJEpW4zOtK2g1BRjQeiYo0DrQcQrIBH_la8/edit?usp=sharing). 

## License
MIT
