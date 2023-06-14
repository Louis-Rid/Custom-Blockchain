require("dotenv").config();
const Blockchain = require("../classes/blockchain");
const Block = require("../classes/block");
const Transaction = require("../classes/transaction");

function run() {
  const privateKey = process.env.PRIVATE_KEY;

  try {
    const transaction = new Transaction("123", privateKey, "1", 1, "123", 1, 1);
    transaction.sign();
    transaction.verifySignature();
  } catch (e) {
    console.log("Tried to run chain but got: ------:", e);
  }
}

run();
