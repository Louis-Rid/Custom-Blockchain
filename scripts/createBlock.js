require("dotenv").config();
const Block = require("../classes/block");

function newBlock(index, previousHash) {
  const privateKey = process.env.PRIVATE_KEY;

  try {
    const block = new Block(index, previousHash);
    return block;
  } catch (e) {
    console.log("Tried to create Block but got: ", e);
  }
}

module.exports = newBlock;
