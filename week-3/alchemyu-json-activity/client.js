// This client file is an independent file, taken from Alchemy's Ethereum API Quickstart
// https://www.alchemy.com/docs/reference/ethereum-api-quickstart

import 'dotenv/config';
import {createPublicClient, http} from 'viem';
import {mainnet} from 'viem/chains';

const ALCHEMY_URL = process.env.ALCHEMY_URL;

const client = createPublicClient({
  chain: mainnet,
  transport: http(ALCHEMY_URL),
});

const blockNumber = await client.getBlockNumber();
console.log("Current block number:", blockNumber);

const balance = await client.getBalance({ address: "0xab5801a7d398351b8be11c439e05c5b3259aec9b" });
console.log("Balance (ETH):", Number(balance) / 1e18);