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
}

module.exports = Transaction;
