/*
ethereum-cryptography is a wrapper library.
It provides a collection of cryptographic utilities commonly used in Ethereum, such as:
- keccak256
- secp256k1 signing and verification
- etc...
 */

const {toHex, hexToBytes, utf8ToBytes} = require("ethereum-cryptography/utils");
const {keccak256} = require("ethereum-cryptography/keccak");
const secp = require("ethereum-cryptography/secp256k1");


// Create a brand-new random private key, and then get its equivalent public key + derive an address
function generateKeys() {

    // Return Uint8Array (an array of 8-but unsigned integers) private key
    const privateKey = secp.utils.randomPrivateKey();
    // toHex returns a String
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

    // Ethereum address format takes the last 20 chars of the hashed public key
    const hashed_length = hashed.length;
    const slicedHash = hashed.slice(hashed_length - 20, hashed_length)

    // Add 0x in the beginning of the address string to match format
    const address = '0x' + toHex(slicedHash);
    console.log('Address: ', address);
    console.log('\n');
    return address;
}

function hashMessage(message) {
    const str = JSON.stringify(message);
    const bytes = utf8ToBytes(str);
    return keccak256(bytes) // Returns Uint8Array
}

function recoverKey(message, signatureHex, recoveryBit) {
    const hashedMessaged = hashMessage(message);
    const signatureBytes  = hexToBytes(signatureHex)
    return secp.recoverPublicKey(hashedMessaged, signatureBytes, recoveryBit);  // Returns Uint8Array
}

module.exports = {generateKeys, hashMessage, recoverKey, getAddress};