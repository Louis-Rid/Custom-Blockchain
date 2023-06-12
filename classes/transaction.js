const {
  keccak256,
  ecrecover,
  toChecksumAddress,
  rlp,
  ecsign,
  toRpcSig,
  fromRpcSig,
} = require("ethereumjs-util");

class Transaction {
  constructor(to, signature, nonce, value, data, gasLimit, gasPrice) {
    this.to = to;
    this.signature = signature;
    this.nonce = nonce;
    this.value = value;
    this.data = data;
    this.gasLimit = gasLimit;
    this.gasPrice = gasPrice;
  }

  // Signs transaction
  sign(privateKey) {
    // Encodes transaction data and creates transaction hash
    const encodedTransaction = this.encodedTransaction();
    const transactionHash = keccak256(encodedTransaction);

    // sign transaction with privateKey
    const { v, r, s } = ecsign(transactionHash, privateKey);

    // Convert signature to RPC format
    const rpcSignature = toRpcSig(v, r, s);

    // Set signature of transaction
    this.signature = rpcSignature;
  }

  // Verifies the Signature of the transaction
  verifySignature() {
    // Encodes transaction data and creates transaction hash
    const encodedTransaction = this.encodedTransaction();
    const transactionHash = keccak256(encodedTransaction);

    const { v, r, s } = fromRpcSig(this.signature);

    // Recover PublicKey from signature
    const publicKey = ecrecover(transactionHash, v, r, s);
  }

  // Converts transaction data into a byte array
  encodedTransaction() {
    const encodedTransaction = rlp.encode([
      this.nonce,
      this.gasPrice,
      this.gasLimit,
      this.to,
      this.value,
      this.data,
    ]);

    return encodedTransaction;
  }
}

module.exports = Transaction;
