const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const merkleTree = new MerkleTree(niceList);

  const name = niceList[0];
  // The following name is not on the list
  // const name = 'Shlomi';
  // console.log('name: ', name);

  // The indexOf() method in JavaScript is a built-in function,
  // used on both arrays and strings to find the position (index) of the first occurrence of a specified value
  const index = niceList.indexOf(name);

  const proof = merkleTree.getProof(index);
  // console.log('proof: ', proof);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name, proof,
  });

  console.log({ gift });
}

main();