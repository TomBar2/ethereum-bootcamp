const axios = require('axios');
require('dotenv').config();

const ALCHEMY_URL = process.env.ALCHEMY_URL;

// axios.post(ALCHEMY_URL, {
//   jsonrpc: "2.0",
//   id: 1,
//   method: "eth_feeHistory",
//   params: ["0x5","latest",[20,30]]
// }).then((response) => {
//   console.log(response.data.result);
// });

const blockNumber = await client.getBlockNumber();
console.log("Current block number:", blockNumber);