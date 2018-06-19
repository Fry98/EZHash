const crypto = require('crypto');

module.exports = function(setup){
  return new Cryptonite(setup);
}

class Cryptonite{
  constructor(setup){
    this.algo = 'sha512';
    this.iters = 100000;
    this.sLen = 16;
    this.hLen = 64;
    if(setup){
      if(setup.algo){
        this.algo = setup.algo;
      }
      if(setup.iterations){
        this.iters = setup.iterations;
      }
      if(setup.saltLength){
        this.sLen = setup.saltLength;
      }
      if(setup.hashLength){
        this.hLen = setup.hashLength;
      }
    }
  }
  hashPass(password){
    const salt = crypto.randomBytes(this.sLen).toString('hex');
    return new Promise((resolve,reject)=>{
      crypto.pbkdf2(password,salt,this.iters,this.hLen,this.algo,(err,derKey)=>{
        derKey = derKey.toString('hex');
        resolve([salt, derKey].join('$'));
      });
    });
  }
  verifyPass(password,encStr){
    const salt = encStr.split('$')[0];
    const checkHash = encStr.split('$')[1];
    return new Promise((resolve,reject)=>{
      crypto.pbkdf2(password,salt,this.iters,this.hLen,this.algo,(err,derKey)=>{
        derKey = derKey.toString('hex');
        resolve(checkHash===derKey);
      });
    });
  }
  hashPassSync(password){
    const salt = crypto.randomBytes(this.sLen).toString('hex');
    const hash = crypto.pbkdf2Sync(password,salt,this.iters,this.hLen,this.algo).toString('hex');
    return [salt, hash].join('$');
  }
  verifyPassSync(password,encStr){
    const salt = encStr.split('$')[0];
    const checkHash = encStr.split('$')[1];
    const hash = crypto.pbkdf2Sync(password,salt,this.iters,this.hLen,this.algo).toString('hex');
    return hash===checkHash;
  }
};