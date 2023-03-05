const { ethers } = require('ethers');
const EC = require('elliptic').ec;
const curve = new EC('secp256k1');
const CQT = require("./callCovalent"); 

const apiKeyInfura = "0360c67d49e744d7bba3ff9b77235595"; 
/**
 * 
 * @param {string} _txHash tx hash from where we want to retrieve the data
 * @param {string} _network network of the transaction eg goerli : call INFURA API
 * @returns 
 */
async function executeMethod(_txHash, _network) {
 
const url = "https://"+_network+".infura.io/v3/" + apiKeyInfura;

const data = {
  jsonrpc: "2.0",
  method: "eth_getTransactionByHash",
  params: [_txHash],
  id: 1
};

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
};

const dat = await fetch(url, options)
  .then(response => response.json())
  .catch(error => console.log(error));

  console.log(dat.result); 
  return dat.result; 
  

}
/**
 * @notice recover a transcation f
 * @param {json} tx json of a transcation  
 * @returns a array [x,y] wirh the points on the curve
 */
 async function recoverPoints(tx){
  const expandedSig = {
    r: tx.r,
    s: tx.s,
    v: tx.v,
  };

  const signature = ethers.utils.joinSignature(expandedSig);

  const txData = {
    gasLimit: tx.gasLimit,
    value: tx.value,
    nonce: tx.nonce,
    data: tx.data,
    chainId: tx.chainId,
    to: tx.to, // you might need to include this if it's a regular tx and not simply a contract deployment
    type: parseInt(tx.type,16),
    maxFeePerGas: tx.maxFeePerGas,
    maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
  };

  const rsTx = await ethers.utils.resolveProperties(txData);
  const raw = ethers.utils.serializeTransaction(rsTx); // returns RLP encoded tx
  const msgHash = ethers.utils.keccak256(raw); // as specified by ECDSA
  const msgBytes = ethers.utils.arrayify(msgHash); // create binary hash
  const recoveredPubKey=ethers.utils.recoverPublicKey(msgBytes, signature);
  const formatedPubKey = recoveredPubKey.slice(2); // format the pub key so that it's work with the ec library
  const publicKey = curve.keyFromPublic(formatedPubKey, 'hex'); // get the pub key

  const x = publicKey.getPublic().getX().toString('hex'); // extract x
  const y = publicKey.getPublic().getY().toString('hex'); // extract y 


  return [x,y]; 
  };

  /**
   * @param {string} _txHash txhash from which we retrieve the pub key from the sender
   * @param {string} _network network on which we want to proove the solventy 
   * @returns a json with x and y
   */
  async function getXY(_txHash, _network) {
    const data = await executeMethod(_txHash, _network);
    const points = await recoverPoints(data);
    console.log(points); 
    return points; 
  }

  /**  function to retrive points of all pub key involved in the ring sign
   * @param {string} _networkCQT : name of the network where the sign is created eg eth-goerli; to call COVALENT API
   * @param {string} _networkInfura : name of the network where the sign is created eg goerli, to call INFURA API
   * @param {string} tokenAddress : adress of the token where you want to proove your solventy
   * @param {} minAmount :  amount that you want to proove
   * @param {} _nbOfSigner :  number of signers for the ring signature
   * @returns 
   */
  export async function retriveAll(_networkCQT,_networkInfura, tokenAddress, minAmount, _nbOfSigner ){
    const txHash = await CQT.retrieveData(_networkCQT, tokenAddress,minAmount, _nbOfSigner); 
    let points = []; 

    for(let i =0; i<txHash.length; i++){
      points[i] = await getXY(txHash[i], _networkInfura); 
    }
    console.log(points); 
    return points; 
  }

  // module.exports = {
  //   retriveAll: retriveAll
  // };

  
  


