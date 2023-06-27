const { SHA256 } = require("crypto-js");
const Block = require("./block");
const { MerkleTree, getRoot, getLeaves } = require("merkletreejs");

class Blockchain {
  constructor() {
    this.chain = [this.createIndexBlock()];
    this.tree = "";
  }

  createIndexBlock() {
    const indexBlock = new Block(0, "Genesis Block", "0");

    // Calculate Merkle Tree
    const leaves = [indexBlock].map((x) => SHA256(x));
    const tree = new MerkleTree(leaves, SHA256);
    this.tree = tree;

    return indexBlock;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // This expects a new instance of the Block class
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.calculateHash();
    this.chain.push(newBlock);

    // Calculate new Merkle Tree
    const leaves = this.chain.map((x) => SHA256(x));
    const tree = new MerkleTree(leaves, SHA256);
    this.tree = tree;
  }

  isChainValid(blockIndex) {
    try {
      const tree = this.tree;
      const root = tree.getRoot();
      const leaves = tree.getLeaves();
      const proof = tree.getProof(leaves[blockIndex]);
      const verified = tree.verify(proof, leaves[blockIndex], root);
      console.log(verified);
      return verified;
    } catch (e) {
      console.log("Tried to check if chain is valid but got: ", e);
    }
  }
}

module.exports = Blockchain;
