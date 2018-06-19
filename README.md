# EZHash
**EZHash** is a simple to use module that allows you to encrypt and verify passwords using hashing function `PBKDF2` and **Node** built-in module `crypto`. **EZHash** provides both sync and async option for hashing and verification.

## Installation
```sh
$ npm i ezhash
```
## Usage
**EZHash** module is imported into your project like this:
```js
const EZHash = require('ezhash')();
```
You can also pass in optional setting values like this:
```js
const EZHash = require('ezhash')({
  // (Values listed below are the default ones)  
  hashLength: 64, // Determines length of the hash in bytes
  saltLength: 16, // Determines length of the salt in bytes
  iterations: 100000, // Determines how many times the password will be hashed
  algo: 'sha512' // Determines which hashing algorithm will be used
});
```

After importing the module you can utilise these functions:
```js
EZHash.hashPass('password'); // Returns a Promise that resolves with a derived key produced by PBKDF2
EZHash.verifyPass('password', derivedKey); // Returns a Promise that resolves with a boolean which determines whether the password matches the key
EZHash.hashPassSync('password'); // Returns a derived key produced by PBKDF2
EZHash.verifyPassSync('password', derivedKey); // Returns a boolean that determines whether the password matches the key
```

## License
**MIT**