const Web3 = require("web3");
const Tx = require("ethereumjs-tx");
const web3 = new Web3("https://polygon-mumbai.infura.io/v3/cd6bdc22f7244770a4596f56408e361d")
const factroAbi = require("./abi");
// const privatekey = Buffer.from(String("14a68b30afe87e3e482fc4042c8c6343a90c55d883182303205c1c080b474dfe3c7558ac22fbccfdb070cb097f30eea8f322f506491bd4c54358f12279b101b61c"), 'hex')
const privKey = '';
var privatekey = Buffer.from("", 'hex')

const factory__add = "0x2e15B44DC11E108B4E5796628305a6CBF2DBDAf4"
console.log("as", factory__add)
const myAddress = "0x31D0A9A6C679598446245f0a01Ee09e26c1183E3"
console.log(myAddress)
const chainId = parseInt(80001)
const factoryContract = new web3.eth.Contract(factroAbi, factory__add)

// const verify = require("./verify")



async function createSignature(_from, _to, params) {
    // _from = web3.utils.toChecksumAddress("0x8b80805b94286ABb973cc0CDFE13d0e9f88dc394")
    // _to = web3.utils.toChecksumAddress("0x8675832492Cc8E0A21AC4A9ed266786012a51Fd5")
    params = { from: _from, to: _to, nonce: 0, ...params };
    const message = web3.utils.soliditySha3(
        { t: 'address', v: _from },
        { t: 'address', v: _to },
        { t: 'uint256', v: params.nonce }

    ).toString('hex');
    const { signature } = web3.eth.accounts.sign(
        message,
        privKey
    );
    // const hexString = '14a68b30afe87e3e482fc4042c8c6343a90c55d883182303205c1c080b474dfe3c7558ac22fbccfdb070cb097f30eea8f322f506491bd4c54358f12279b101b61c';

    return { signature};
};
async function factoryCreatetx(req, res) {
    let from = req.body.from;
    let to = req.body.to;
    let amount = req.body.amount;
    const nonce = 0;
    try {

        const res = await createSignature(from, to, {});
        const sign = res.signature
        console.log("ress",res);
        const response = factoryContract.methods.set(from, to, amount, nonce, sign);
        const count = await web3.eth.getTransactionCount(myAddress);
        const gas = await response.estimateGas({ from: myAddress });
        const gasPrice = 4000000000;

        var rawTransaction = {
            from: myAddress,
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gas + 10000),
            to: factory__add,
            value: "0x0",
            data: response.encodeABI(),
            nonce: web3.utils.toHex(count),
            chainId: web3.utils.toHex(chainId)
        };

        const tx = new Tx(rawTransaction);
        tx.sign(privatekey)
        return new Promise((resolve, reject) => {
            web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
                .once('transactionHash', (hash) => {
                    resolve({
                        status: 200, msg: "success", data: {
                            TxHash: hash
                        }
                    })
                })
        })
    } catch (error) {
        console.log(error)
        return error
    }
}


module.exports = {

    factoryCreatetx,
}
