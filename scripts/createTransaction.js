require("dotenv").config();
const Transaction = require("../classes/transaction");

function newTransaction(to, from, nonce, value, data, gasLimit, gasPrice) {
  const privateKey = process.env.PRIVATE_KEY;

  try {
    const transaction = new Transaction(
      to,
      from,
      nonce,
      value,
      data,
      gasLimit,
      gasPrice
    );
    return transaction;
  } catch (e) {
    console.log("Tried to run chain but got: ------:", e);
  }
}
