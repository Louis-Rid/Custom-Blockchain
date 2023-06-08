const Blockchain = require("../classes/blockchain");
const Block = require("../classes/block");
const Transaction = require("../classes/transaction");

// const blockchain = new Blockchain();

// blockchain.addBlock(new Block(1, { amount: 4 }));
// blockchain.addBlock(new Block(2, { amount: 8 }));

// console.log("Blockchain is valid:", blockchain.isChainValid());
// console.log(JSON.stringify(blockchain, null, 2));

const transaction = new Transaction("123", "123", "1", 1, "123", 1, 1);
const privateKey = new Uint8Array([
  10, 20, 30, 40, 50, 60, 70, 80, 10, 20, 30, 40, 50, 60, 70, 80, 10, 20, 30,
  40, 50, 60, 70, 80, 10, 20, 30, 40, 50, 60, 70, 80,
]);
transaction.sign(privateKey);
transaction.verifySignature();
