const SHA256 = require("crypto-js/sha256");
const { MerkleTree } = require("merkletreejs");

class Block {
  constructor(index, previousHash = "") {
    this.index = index;
    this.timestamp = new Date().toISOString;
    this.transactions = [];
    this.previousHash = previousHash;
    this.hash = "";
  }

  addTransaction(tx) {
    this.transactions.push(tx);
  }

  encryptTransactions() {
    const leaves = this.transactions.map((x) => SHA256(x));
    const tree = new MerkleTree(leaves, SHA256);
    const root = tree.getRoot().toString("hex");

    this.transactions = root;
    return root;
  }

  calculateHash() {
    const hash = SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.encryptTransactions())
    ).toString();

    this.hash = hash;
  }
}

module.exports = Block;
