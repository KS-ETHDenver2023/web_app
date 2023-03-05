import React, { useState, useEffect } from "react";
import { useNetwork, useContractWrite,usePrepareContractWrite, useContractRead } from 'wagmi';
import {getAccount } from '@wagmi/core';
import {retriveAll} from "./proof/getCurvePoint";
import DownloadButton from "./second/DownloadButton";
import verifierABI from '../../abi/Verifier.json';


function GenerateProof(){
    //Network
    const { chain, chains } = useNetwork('')
    const [isConnected, setIsConnected] = useState(false);
    const account = getAccount();
    //Generator
    const [receivingAddress, setReceivingAddress] = useState("");
    const [amountRequired, setAmountRequired] = useState(0);
    const [token , setToken] = useState("");
    const [nbOfParticipants, setNbOfParticipants] = useState(10);
    const [covalentChain, setCovalentChain] = useState("");
    const [ready, setReady] = useState(false);
    const [verifierAddress, setVerifierAddress] = useState("");
    const [text, setText] = useState("->[OUTPUT]");
    const [senderKey, setSenderKey] = useState("");

    //Verifier
    const [addresses, setAddresses] = useState([]);
    const [tees, setTees] = useState([]);
    const [seed, setSeed] = useState(0);
    const [value, setValue] = useState(0);
    const [publicAddress, setPublicAddress] = useState("");
    const [addressesURI, setAddressesURI] = useState(" ");
    const [verifierData, setVerifierData] = useState(" ");


    async function callGeneration(){
        setText("Generating...");
        const response = await retriveAll(covalentChain,chain.name, token, amountRequired, nbOfParticipants, account.address);
        const points = response[0];
        const senderKey = response[1];
        console.log("Generating...");
        console.log(points);
        setText(points);
        setSenderKey(senderKey);

    }

    const { config } = usePrepareContractWrite({
        address: verifierAddress,
        abi: verifierABI,
        functionName: 'verify',
        args: [addresses, tees, seed, value, publicAddress, token, addressesURI, verifierData],
    })

//(uint256[] memory addresses, uint256[] memory tees, uint256 seed, uint256 value, address publicAddress, address token, string memory addressesURI, string memory verifierData)
    
    const{ write } = useContractWrite(config);

    useEffect(() => {
        if (account) {
            setIsConnected(true);
            
            if(chain.name === "Polygon"){
                setCovalentChain("matic-mainnet");
                setVerifierAddress("0x7fEa7DB327836DF00221c8288B9BBd1f812dFb33");
            }
            else if(chain.name === "Polygon Mumbai"){ 
                setCovalentChain("matic-mumbai");
                setVerifierAddress("0xF0d7935a33b6126115D21Ec49403e4ce378A42Dd");
            }
            else if(chain.name ==="Ethereum"){
                setCovalentChain("eth-mainnet");
                setVerifierAddress("0x7cc4404E811a12547C988d421D0F1ee5Cb2d96d5");

            }
            else if(chain.name === "Goerli"){ 
                setCovalentChain("eth-goerli");
                setVerifierAddress("0xc0aF679B78C18ac1241D9C80c3ab0153ed0BCD3A")
            }
            else if(chain.name === "Sepolia"){ 
                setCovalentChain("eth-goerli");
                setVerifierAddress("0xc0aF679B78C18ac1241D9C80c3ab0153ed0BCD3A")
            }
            else if(chain.name ==="Scroll L1 Testnet"){
                setCovalentChain("eth-goerli");
                setVerifierAddress("0xc0aF679B78C18ac1241D9C80c3ab0153ed0BCD3A")
            }
            else{
            }
        } 
        else {
            setIsConnected(false);            
        }
    }, [account]);

    useEffect(() => {
        if (receivingAddress && amountRequired && token && nbOfParticipants) {
            setReady(true);
        } else {
            setReady(false);
        }
    }, [receivingAddress, amountRequired, token, nbOfParticipants]);

    if (!isConnected) {
        console.log("not connected");
        console.log(account);
    }


    return(
        <div className="main">
            <h1>Generate Proof</h1>
            <p> 💡<i>Only available on Polygon, Ethereum or Scroll (L1 testnet) Goerli, Mumbai, Sepolia Testnet</i></p>
            <div className="main__center">
                {chain.name != "Sepolia" || chain.name !="Polygon" || chain.name !="Polygon Mumbai" || chain.name !="Goerli" || chain.name !="Scroll L1 Testnet" || chain.name !="Ethereum"  ? ( <div className="network_info">🎯 Connected to <b>{chain.name}</b> network</div>) : ( <div className="network_info_error">⚠️<b>ERROR</b>Please switch to another network</div>)}
            </div>
            <div className="main__listing">
            <h2>1. Generate Anonimity set</h2>
            <p>An anonymity set is a collection of indistinguishable addresses used to mask the identity of an individual or transaction, with larger sets providing greater privacy.</p>
                <form
                    onSubmit={(e) => {
                        console.log({receivingAddress, amountRequired, token, nbOfParticipants})
                        e.preventDefault();
                        callGeneration?.();
                    }}
                    >
                    <label>Receiving Address (the one you will use to share the proof)</label>
                        <input
                            id="receivingAddress"
                            onChange={(e) => setReceivingAddress(e.target.value)}
                            placeholder={"Address to receive the proof"}
                            value={receivingAddress}
                        />
                    <label>Token address (DAI,USDC,MATIC...)</label>
                    <input
                        id="token"
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Token to verify"
                        value={token}
                    />
                    <label>Amount to Verify</label>
                    <input
                        id="amount"
                        onChange={(e) => setAmountRequired(e.target.value)}
                        placeholder={"Amount of holded token required to verify"}
                        value={amountRequired}
                    />
                    <label>Size of the anonimity set</label>
                    <input
                        id="nbOfParticipants"
                        onChange={(e) => setNbOfParticipants(e.target.value)}
                        placeholder={"Size of the anonimity set (number of participants)"}
                        value={nbOfParticipants}
                    />
                    <button disabled={!ready}>Generate</button>
                </form>
                <label>Your generated anonimity set : (copy and save it for step 2)</label>
                <input type="text" value={text}/>
                <label>You generated your points (copy and save it for step 2)</label>
                <input type="text" value={senderKey}/>
                
            </div>
            <div className="main__listing">
            <h2>2. Download Proof Generator</h2>
            <p>💡<i>Download the "ring proof" generator to generate your proof on your computer</i></p>
                <DownloadButton/>
            </div>
            <div className="main__listing">
            <h2>3. Verify your "ring proof" on chain</h2>
            <p>💡<i>Verify your proof on-chain to get and share your SBT</i></p>
            <p><b>Warning</b> : The inputs must match to those entered during the <b>generation of the anonymity set</b> and you must <b>copy paste the arguments returned by the executable</b>.</p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    write?.();
                }}
                >
                <label>
        Addresses (an array of addresses):
        <input
          type="text"
          value={addresses}
          onChange={(event) => setAddresses(event.target.value)}
        />
      </label>
      <label>
        Tees (an array of uint):
        <input
          type="text"
          value={tees}
          onChange={(event) => setTees(event.target.value)}
        />
      </label>
      <label>
        Sig (a big uint):
        <input
          type="text"
          value={seed}
          onChange={(event) => setSeed(event.target.value)}
        />
      </label>
      <label>
        Amout (the one you want to prove):
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </label>
      <label>
        Receiving Address (same as step 1 and 2):
        <input
          type="text"
          value={publicAddress}
          onChange={(event) => setPublicAddress(event.target.value)}
        />
      </label>
      <label>
        Token:
        <input
          type="text"
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />
      </label>
      <label>
        Optionnal addresses URI:
        <input
          type="text"
          value={addressesURI}
          onChange={(event) => setAddressesURI(event.target.value)}
        />
      </label>
      <label>
        Optional Data to share:
        <input
          type="text"
          value={verifierData}
          onChange={(event) => setVerifierData(event.target.value)}
        />
      </label>
      <button type="submit" disabled={!ready}>Mint SBT-Proof</button>
            </form>
            </div>
        </div>
    )
}
export default GenerateProof;