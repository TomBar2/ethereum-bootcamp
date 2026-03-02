const {toHex} = require("ethereum-cryptography/utils");
const { hexToBytes } = require("ethereum-cryptography/utils");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

// Generate private and public key for each user
const utils = require("./utils");

const users = {}
balances = {}

for (let i = 0; i < 3; i++) {
  const {privateKey, address} = utils.generateKeys();

  users[address] = privateKey;
  balances[address] = 100;
}

app.get("/balance/:address", (req, res) => {
  const {address} = req.params;
  const balance = balances[address] || 0;
  res.send({balance});
});

app.post("/send", (req, res) => {
  const {message, signature, recoveryBit} = req.body;

  const publicKeyBytes = utils.recoverKey(message, signature, recoveryBit)
  const isAddress = utils.getAddress(publicKeyBytes)

  const sender = message.sender;
  const recipient = message.recipient;
  const amount = message.amount;

  if (sender === isAddress) {

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({message: "Not enough funds!"});
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({balance: balances[sender]});
    }
  }


});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
