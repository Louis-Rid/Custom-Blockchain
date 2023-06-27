const Blockchain = require("../classes/blockchain");
const Block = require("../classes/block");
const createTransaction = require("./createTransaction");
const createBlock = require("./createBlock");
require("dotenv").config();

function createBlockchain() {
  try {
    const blockchain = new Blockchain();
    return blockchain;
  } catch (e) {
    console.log("Tried to create a new blockchain but got: ", e);
  }
}

const privateKey = process.env.PRIVATE_KEY;

// Creates Blockchain
const blockchain = createBlockchain();

// Creates Block and Transaction
const block = createBlock(1, blockchain.getLatestBlock());
const transaction = createTransaction("123", privateKey, 2, 1, "", 2, 2);

// Adds Transaction to block
block.addTransaction(transaction);

// Adds block it to blockchain
blockchain.addBlock(block);

// Gets block that was just added
const newBlock = blockchain.getLatestBlock();

// Expects block index
blockchain.isChainValid(1);
