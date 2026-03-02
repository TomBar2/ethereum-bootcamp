import {useState} from "react";
import server from "./server";

import {keccak256} from "ethereum-cryptography/keccak";
import {toHex, utf8ToBytes} from "ethereum-cryptography/utils";
import {sign} from "ethereum-cryptography/secp256k1";


function hashMessage(message) {
    const str = JSON.stringify(message);
    const bytes = utf8ToBytes(str);
    return keccak256(bytes) // Returns Uint8Array
}


async function signMessage(message, privateKey) {
    const messageHash = hashMessage(message);
    const [signature, recoveryBit] = await sign(messageHash, privateKey, {recovered: true});
    return {signature, recoveryBit};
}


function Transfer({address, setBalance}) {
    const [sendAmount, setSendAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const [privateKey, setPrivateKey] = useState("");

    const setValue = (setter) => (evt) => setter(evt.target.value);

    async function transfer(evt) {
        evt.preventDefault();

        const message = {
            sender: address,
            amount: parseInt(sendAmount),
            recipient: recipient,
        }

        const {signature, recoveryBit} = await signMessage(message, privateKey);
        const hexSignature = toHex(signature);

        try {
            const {
                data: {balance},
            } = await server.post(`send`, {
                message,
                signature: hexSignature,
                recoveryBit,
            });
            setBalance(balance);
        } catch (ex) {
            alert(ex.response.data.message);
        }
    }

    return (
        <form className="container transfer" onSubmit={transfer}>
            <h1>Send Transaction</h1>

            <label>
                Send Amount
                <input
                    placeholder="1, 2, 3..."
                    value={sendAmount}
                    onChange={setValue(setSendAmount)}
                ></input>
            </label>

            <label>
                Recipient
                <input
                    placeholder="Type an address, for example: 0x2"
                    value={recipient}
                    onChange={setValue(setRecipient)}
                ></input>
            </label>

            <label>
                Private Key
                <input
                    placeholder="Type your private key to verify transaction"
                    value={privateKey}
                    onChange={setValue(setPrivateKey)}
                ></input>
            </label>

            <input type="submit" className="button" value="Transfer"/>
        </form>
    );
}

export default Transfer;
