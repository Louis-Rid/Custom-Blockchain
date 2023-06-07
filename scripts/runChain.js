const Blockchain = require("../classes/blockchain");
const Block = require("../classes/block");

const blockchain = new Blockchain();

blockchain.addBlock(new Block(1, { amount: 4 }));
blockchain.addBlock(new Block(2, { amount: 8 }));

console.log("Blockchain is valid:", blockchain.isChainValid());
console.log(JSON.stringify(blockchain, null, 2));
