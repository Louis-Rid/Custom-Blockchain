const Block = require("./block");

class Blockchain {
  constructor() {
    this.chain = [this.createIndexBlock()];
  }

  createIndexBlock() {
    return new Block(0, "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // This expects a new instance of the Block class
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      // Checks if the current blocks hash equals the blocks hash recalculated
      // If they do not this would indicate some thing in this block has been changed
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      // Checks if the previous blocks hash equals the stored value in the current block
      // If they do not this would indicate a previous block in the chain has been changed
      else if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      } else {
        return true;
      }
    }
  }
}

module.exports = Blockchain;
