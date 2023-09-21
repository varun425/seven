var Web3 = require('web3');
var web3 = new Web3();
async function createSignature(_from, _to, params) {
    // _from = web3.utils.toChecksumAddress("0x8b80805b94286ABb973cc0CDFE13d0e9f88dc394")
    // _to = web3.utils.toChecksumAddress("0x8675832492Cc8E0A21AC4A9ed266786012a51Fd5")
    params = { from: _from, to: _to, nonce: 0, ...params };
    const message = web3.utils.soliditySha3(
        { t: 'address', v: _from },
        { t: 'address', v: _to },
        { t: 'uint256', v: params.nonce }

    ).toString('hex');
    const privKey = 'bd7788fda028477621f4a51b8ee5d8795c58084b6d4e1b1662857fc5a51d8e55';
    const { signature } = web3.eth.accounts.sign(
        message,
        privKey
    );
    // const hexString = '14a68b30afe87e3e482fc4042c8c6343a90c55d883182303205c1c080b474dfe3c7558ac22fbccfdb070cb097f30eea8f322f506491bd4c54358f12279b101b61c';

    return { signature, from: params.from, to: params.to, nonce: params.nonce };
};
module.exports = createSignature;
// const a = createSignature()

// console.log(a)