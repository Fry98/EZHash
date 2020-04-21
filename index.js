const crypto = require('crypto');

module.exports = createInstance;

function createInstance(setup) {
  return new EZHash(setup);
}

class EZHash {
  constructor({
    algo = 'sha512',
    iters = 100000,
    sLen = 16,
    hLen = 64
  } = {}){
    this.algo = algo;
    this.iters = iters;
    this.sLen = sLen;
    this.hLen = hLen;
  }

  hashPass(password) {
    const salt = crypto.randomBytes(this.sLen).toString('hex');
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, this.iters, this.hLen, this.algo, (err, derKey) => {
        derKey = derKey.toString('hex');
        resolve([salt, derKey].join('$'));
      });
    });
  }

  verifyPass(password,encStr) {
    const [salt, checkHash] = encStr.split('$');
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, this.iters, this.hLen, this.algo, (err, derKey) => {
        derKey = derKey.toString('hex');
        resolve(checkHash === derKey);
      });
    });
  }

  hashPassSync(password) {
    const salt = crypto.randomBytes(this.sLen).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, this.iters, this.hLen, this.algo).toString('hex');
    return [salt, hash].join('$');
  }

  verifyPassSync(password,encStr) {
    const [salt, checkHash] = encStr.split('$');
    const hash = crypto.pbkdf2Sync(password, salt, this.iters, this.hLen, this.algo).toString('hex');
    return hash === checkHash;
  }
}
