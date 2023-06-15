const {
  keccak256,
  ecrecover,
  toChecksumAddress,
  rlp,
  ecsign,
  toRpcSig,
  fromRpcSig,
  pubToAddress,
  bufferToHex,
  privateToAddress
} = require("ethereumjs-util");

class Transaction {
  constructor(to, from, nonce, value, data, gasLimit, gasPrice) {
    this.to = to;
    this.from = from;
    this.nonce = nonce;
    this.value = value;
    this.data = data;
    this.gasLimit = gasLimit;
    this.gasPrice = gasPrice;
    this.signature = "";
  }

  // Signs transaction
  sign() {
    // Encodes transaction data and creates transaction hash
    const encodedTransaction = this.encodedTransaction();
    const transactionHash = keccak256(encodedTransaction);

    // sign transaction with privateKey
    const signablePrivateKey = new Uint8Array(Buffer.from(this.from, "hex"));
    const { v, r, s } = ecsign(transactionHash, signablePrivateKey);

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
    
    // Recover address from signature
    const { v, r, s } = fromRpcSig(this.signature);
    const sigComponentsBuffer = ecrecover(transactionHash, v, r, s);
    const addressBuffer = pubToAddress(sigComponentsBuffer);
    const address = bufferToHex(addressBuffer);

    // Derive address from private key
    const privateKeyBuffer = new Buffer.from(this.from, "hex");
    const signerAddressBuffer = privateToAddress(privateKeyBuffer);
    const signerAddress = bufferToHex(signerAddressBuffer);

    if (address === signerAddress) {
      return true;
    } else {
      return false;
    }
  }

  // Converts transaction data into a byte array
  encodedTransaction() {
    const encodedTransaction = rlp.encode([
      this.nonce,
      this.from,
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
