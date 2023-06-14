const Blockchain = require("../classes/blockchain");

function createBlockchain() {
  try {
    const blockchain = new Blockchain();
    return blockchain;
  } catch (e) {
    console.log("Tried to create a new block but got: ", e);
  }
}
