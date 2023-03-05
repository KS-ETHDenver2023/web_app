import React, { useState, useEffect } from "react";
import { useNetwork, useContractWrite,usePrepareContractWrite, useContractRead } from 'wagmi';
import {getAccount } from '@wagmi/core';
import sbtABI from '../../abi/Sbt.json';

function VerifyProof(){
    //Network
    const { chain, chains } = useNetwork('')
    const [isConnected, setIsConnected] = useState(false);
    const account = getAccount();
    const [sbtAddress, setSbtAddress] = useState("");

    //Verifications
    const[aliceAddress, setAliceAddress] = useState("");
    const[sbtID, setSbtID] = useState(0);
    const [isOwnedByAlice, setIsOwnedByAlice] = useState(false);
    const [affichage, setAffichage] = useState(false);


    //Read from sbt contract
    const { data: info } = useContractRead({
        address: sbtAddress,
        abi: sbtABI,
        functionName: 'ownerOf',
        args: [sbtID],
    })


    function load(){
        setAffichage(true);
        if (info === aliceAddress) {
            setIsOwnedByAlice(true);
          } else {
            setIsOwnedByAlice(false);
          }
    }
    
        

    useEffect(() => {
        if (account) {
            setIsConnected(true);
            
            if(chain.name === "Polygon"){
                setSbtAddress("0x7a8a5b5Fd0880DF2118c3360D9c013dDA754FacF");
            }
            else if(chain.name === "Polygon Mumbai"){ 
                setSbtAddress("0x7a8a5b5fd0880df2118c3360d9c013dda754facf");
            }
            else if(chain.name ==="Ethereum"){
                setSbtAddress("0x7cc4404E811a12547C988d421D0F1ee5Cb2d96d5");

            }
            else if(chain.name === "Goerli"){ 
                setSbtAddress("0xDC039c64881Ee53f30a5AA9F577f2022f7c3EfCc")
            }
            else if(chain.name === "Sepolia"){ 
                setSbtAddress("0x250B63aFab3Ce46D0D8679fD5D996C4f517a262F")
            }
            else if(chain.name ==="Scroll L1 Testnet"){
                setSbtAddress("0x7a8a5b5Fd0880DF2118c3360D9c013dDA754FacF")
            }
            else{
            }
        } 
        else {
            setIsConnected(false);            
        }
    }, [account]);

    if (!isConnected) {
        console.log("not connected");
        console.log(account);
    }

    return(
        <div className="main">
            <h1>Check Proof</h1>
            <div className="main__listing">
            <form onSubmit={(e) => {
                        e.preventDefault();
                        load?.();
                    }}>
                <label>
                    Alice Address:
                    <input
                    type="text"
                    value={aliceAddress}
                    onChange={(event) => setAliceAddress(event.target.value)}
                    />
                </label>
                <label>
                    SBT ID:
                    <input
                    type="number"
                    value={sbtID}
                    onChange={(event) => setSbtID(parseInt(event.target.value))}
                    />
                </label>
                <button type="submit" disabled={!true}>Load SBT data</button>
            </form>
            </div>
            {
            isOwnedByAlice ? (
                <div>SBT belongs to Alice's address</div>
            ) : ( 
                <div>SBT does not belong to Alice's address or doesn't exist</div>
            )}
        </div>
    )
}
export default VerifyProof; 