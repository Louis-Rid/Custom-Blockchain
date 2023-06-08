const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, data, previousHash = "") {
    this.index = index;
    this.timestamp = new Date().toISOString;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

module.exports = Block;