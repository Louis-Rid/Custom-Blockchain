require("dotenv").config();
const Blockchain = require("../classes/blockchain");
const Block = require("../classes/block");
const Transaction = require("../classes/transaction");
const privateKey = process.env.PRIVATE_KEY;

const transaction = new Transaction("123", "123", "1", 1, "123", 1, 1);
const signablePrivateKey = new Uint8Array(Buffer.from(privateKey, "hex"));

transaction.sign(signablePrivateKey);
transaction.verifySignature();
