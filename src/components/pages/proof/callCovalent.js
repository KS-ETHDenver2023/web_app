const axios = require('axios');


class Holders {
  constructor(_address, _amount) {
    this.address = _address;
    this.amount = _amount;
  }

  getAmount() {
    return this.amount;
  }

  getAddress() {
    return this.address;
  }
}

async function sleep() {
  return new Promise(resolve => setTimeout(resolve, 400));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

async function callCQTForHolders(chainId, tokenAddress) {
  const apikeyCQT = "ckey_7a15aaeb439e4742bc7fb5c211b";
  const covalentApiUrl = 'https://api.covalenthq.com/v1';
  const quoteCurrency = 'USD';
  const blockHeight = 'latest';
  const pageNumber = 0;
  const pageSize = 1000;
  let holders = [];

  const headers = {
    'Content-Type': 'application/json'
  };

  const params = {
    'quote-currency': quoteCurrency,
    'format': 'JSON',
    'block-height': blockHeight,
    'page-number': pageNumber,
    'page-size': pageSize
  };

  const config = {
    headers,
    auth: {
      username: apikeyCQT,
      password: ''
    },
    params
  };

  try {
    const response = await axios.get(`${covalentApiUrl}/${chainId}/tokens/${tokenAddress}/token_holders/`, config);
    for (let i = 0; i < response.data.data.items.length; i++) {
        console.log(typeof(response.data.data.items[i].address)); 
      const holder = new Holders(response.data.data.items[i].address, response.data.data.items[i].balance);
      holders.push(holder);
    }
  } catch (error) {
    console.error(error);
  }

  return holders;
}

async function checkHoldersBalances(minAmount, holders) {
  let holdersFiltered = [];

  for (let a = 0; a < holders.length; a += 1) {
    if (holders[a] && holders[a].getAmount() >= minAmount) {
      const holder = new Holders(holders[a].getAddress(), holders[a].getAmount());
      holdersFiltered.push(holder);
    }
  }
  return holdersFiltered;
}

async function callCQTForTX(Holder, chainId) {
  const apikeyCQT = "ckey_7a15aaeb439e4742bc7fb5c211b";
  const covalentApiUrl = 'https://api.covalenthq.com/v1';
  const quoteCurrency = 'USD';
  const pageNumber = 0;
  const pageSize = 10;

  const headers = {
    'Content-Type': 'application/json'
  };

  const params = {
    'quote-currency': quoteCurrency,
    'format': 'JSON',
    'page-number': pageNumber,
    'page-size': pageSize
  };

  const config = {
    headers,
    auth: {
      username: apikeyCQT,
      password: ''
    },
    params
  };

  let txHash = "";

  try {
    const response = await axios.get(`${covalentApiUrl}/${chainId}/address/${Holder}/transactions_v3/`, config);
    for (let i = 0; i < response.data.data.items.length; i++) {
      if (response.data.data.items[i].from_address.toLowerCase() === Holder.toLowerCase() && response.data.data.items[i].tx_hash != null) {
        txHash = response.data.data.items[i].tx_hash;
        if (txHash !== undefined) {
          return txHash;
        } else {
          return null;
        }
      }
    }
  } catch (error) {
    console.error("error");
  }

}

export async function retrieveData(chainId, tokenAddress, minAmount, _participant,sender) {
    const holders = await callCQTForHolders(chainId, tokenAddress); 
    const senders = new Holders(sender,minAmount); 
    console.log("holders ok"); 
    const holdersWithBalance = (await checkHoldersBalances(minAmount, holders)).slice(0,_participant);
    holdersWithBalance.push(senders);  
    console.log("holdersWith Balance ok"); 
    
    
    let txHash = []; 
    let countBoocle = 0; 
    for(let i =1; i<holdersWithBalance.length; i++){
      await sleep();
      const hash = await callCQTForTX(holdersWithBalance[i].getAddress(),chainId);
      if(hash===undefined || hash===null){
        console.log(typeof(hash)); 
      }
      else{ 
        txHash[countBoocle] = hash;
        countBoocle+=1; 
      } 
    }
    const senderKey = txHash[txHash.length-1]
    
    shuffleArray(txHash);
    return {txHash:txHash,senderKey:senderKey}; 
  }