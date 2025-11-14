/*
ethereum-cryptography is a wrapper library.
It provides a collection of cryptographic utilities commonly used in Ethereum, such as:
- keccak256
- secp256k1 signing and verification
- etc...
 */

const secp = require("ethereum-cryptography/secp256k1");
const {toHex} = require("ethereum-cryptography/utils");
const {keccak256} = require("ethereum-cryptography/keccak");

// Create a brand-new random private key, and then get its equivalent public key + derive an address
function generateKeys() {

    // Return Uint8Array (an array of 8-but unsigned integers) private key
    const privateKey = secp.utils.randomPrivateKey();
    console.log('private key: ', privateKey);
    console.log('private key (Hex): ', toHex(privateKey));

    // Return an Uint8Array, derived from the private key
    const publicKey = secp.getPublicKey(privateKey);
    const address = getAddress(publicKey);

    return {
        privateKey: toHex(privateKey),
        address: address,
    }
}

// Convert public key to an Ethereum address format
function getAddress(publicKey) {
    // The first byte of the public key indicates the format of the key, whether it is in the compressed format or not,
    // so we take the first byte off it.
    const length = publicKey.length
    const byteSlice = publicKey.slice(1, length);

    // keccak256 returns Uint8Array in the length of 32
    const hashed = keccak256(byteSlice);
    console.log('sliced public key hash using keccak256: ', hashed);

    // Ethereum address format takes the last 20 chars of the hashed public key
    const hashed_length = hashed.length;
    const slicedHash = hashed.slice(hashed_length - 20, hashed_length)

    // Add 0x in the beginning of the address string to match format
    const address = '0x' + toHex(slicedHash);
    console.log('Address: ', address);
    return address;
}

module.exports = {generateKeys};