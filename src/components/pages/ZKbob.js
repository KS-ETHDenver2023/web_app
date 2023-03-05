import React, { useState, useEffect } from "react";
import { fetchBalance, getAccount } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import zkLogo from './ZKBob.png';
import bobToken from './BOBcoin.png';
import directDepositABI from '../../abi/DirectDeposit.json';
import zkbobABI from '../../abi/ZkBob.json';
import { useNetwork, useContractWrite,usePrepareContractWrite, useContractRead } from 'wagmi';


function ZKbob(){
    const _addressDirectDeposit = '0x6a39041208918E974d967CA60CfBC239D9D50125'; 
    const _addressZkBobSepolia = '0x2C74B18e2f84B78ac67428d0c7a9898515f0c46f';
    const _addressZkBobPolygon = '0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B';
    const { chain, chains } = useNetwork('')
    const [balance, setBalance] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const account = getAccount();
    //For Direct Deposit
    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState('');
    const [fallbackreciever, setFallbackreciever] = useState('');

    // For Approve
    const [approveAmount, setApproveAmount] = useState('0');

    //For Increase Allowance
    const [increaseAllowanceAmount, setIncreaseAllowanceAmount] = useState('0');
    const [fundsAllowed, setFundsAllowed] = useState('');

    // For Deposit
    const [depositAmount, setDepositAmount] = useState('0');
    const [depositBalance, setDepositBalance] = useState('');

    //direct Deposit
    const { config } = usePrepareContractWrite({
            address: _addressDirectDeposit,
            abi: directDepositABI,
            functionName: 'directDeposit',
            args: [new BigNumber(amount).multipliedBy(new BigNumber(10).pow(18)).toString(),receiver,fallbackreciever],
    })

    const{ write } = useContractWrite(config)

    // Approve on BOB contract
    const { config : configB } = usePrepareContractWrite({
            address: _addressZkBobSepolia, 
            abi: zkbobABI,
            functionName: 'approve',
            args: [_addressDirectDeposit,new BigNumber(approveAmount).multipliedBy(new BigNumber(10).pow(18)).toString()],
    })

    const {write: approveWrite}  = useContractWrite(configB)

    // Increase Allowance on BOB contract

    const { config : configC } = usePrepareContractWrite({
        address: _addressZkBobSepolia, 
        abi: zkbobABI,
        functionName: 'increaseAllowance',
        args: [_addressDirectDeposit, new BigNumber(increaseAllowanceAmount).multipliedBy(new BigNumber(10).pow(18)).toString()],
    })

    const {write: increaseAllowanceWrite}  = useContractWrite(configC)

    // Deposit on Direct Deposit contract

    const { config : configD } = usePrepareContractWrite({
        address: _addressDirectDeposit, 
        abi: directDepositABI,
        functionName: 'despositBob',
        args: [new BigNumber(depositAmount).multipliedBy(new BigNumber(10).pow(18)).toString()],
    })

    const {write: depositBobWrite}  = useContractWrite(configD)


    //Read from BOB contract
    const { data } = useContractRead({
        address: _addressZkBobSepolia,
        abi: zkbobABI,
        functionName: 'allowance',
        args: [account['address'],_addressDirectDeposit],
    })

    //Read user "Direct Deposit contract" balance

    const { data : userDPBalance } = useContractRead({
        address: _addressDirectDeposit,
        abi: directDepositABI,
        functionName: 'deposits',
        args: [account['address']],
    })

    useEffect(() => {
        if (account) {
            setIsConnected(true);
            setFundsAllowed(parseInt(data._hex, 16)/1000000000000000000);
            setDepositBalance(parseInt(userDPBalance._hex, 16)/1000000000000000000);
            if(chain.name === "Polygon"){
                fetchBalance({
                    address: account['address'],
                    token: _addressZkBobPolygon, // BOB token address on Polygon
                }).then((result) => {
                    setBalance(parseFloat(result['formatted']).toFixed(2));
                });
            }
            else if(chain.name === "Sepolia"){ 
                fetchBalance({
                    address: account['address'],
                    token: _addressZkBobSepolia, // BOB token address on Polygon
                }).then((result) => {
                    setBalance(parseFloat(result['formatted']).toFixed(2));
                });
            }
            else{
                setBalance("0");
            }
        } else {
            setIsConnected(false);            
        }
    }, [account]);
    if (!isConnected) {
        console.log("not connected");
        console.log(account);
    }

    return(
        <div className="main">
            <img src={zkLogo} alt="zkBob" className="main__logo" />
            <p>A stablecoin-based privacy solution for everyday users powered by BOB</p>
            <p> 💡<i>Only available on Polygon or Sepolia Testnet</i></p>
            <div className="main__center">
                {chain.name === "Sepolia" || chain.name ==="Polygon" ? ( <div className="network_info">🎯 Connected to <b>{chain.name}</b></div>) : ( <div className="network_info_error">⚠️<b>ERROR</b> : Connected to <b>{chain.name}</b>. Please switch to Sepolia or Polygon network</div>)}
            </div>
            <div className="main__center">
                <h2>Transfer - Direct Deposit 💸</h2>
                <div className="main__listing">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            write?.()
                        }}
                        >
                        <label>Fallback Address</label>
                            <input
                                id="fallbackreciever"
                                onChange={(e) => setFallbackreciever(e.target.value)}
                                placeholder={account["address"]+" - Your ETH address"}
                                value={fallbackreciever}
                            />
                        <label>Receiver zkAddress</label>
                        <input
                            id="receiver"
                            onChange={(e) => setReceiver(e.target.value)}
                            placeholder="Receiver zkAddress"
                            value={receiver}
                        />
                        <label>Amount</label>
                        <input
                            id="amount"
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder={depositBalance + " BOB available"}
                            value={amount}
                        />
                        <button disabled={!write}>Send</button>
                    </form>
                </div>
            </div>
            <div className="main__center">
            <h2>Approve - Increase Allowance - Deposit 📝</h2>
                <div className="main__listing">
                <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            approveWrite?.()
                        }}
                        >
                        <h3>Approve</h3>
                        <label>Amount</label>
                        <input
                            id="approveAmount"
                            onChange={(e) => setApproveAmount(e.target.value)}
                            placeholder="0"
                            value={approveAmount}
                        />
                        <button disabled={!approveWrite}>Approve</button>
                    </form>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            increaseAllowanceWrite?.()
                        }}
                        >
                        <h3>Increase Allowance</h3>
                        <p>Current allowed funds amount for deposit : {fundsAllowed} BOB</p>
                        <label>Amount</label>
                        <input
                            id="increaseAllowanceAmount"
                            onChange={(e) => setIncreaseAllowanceAmount(e.target.value)}
                            placeholder=""
                            value={increaseAllowanceAmount}
                        />
                        <button disabled={!increaseAllowanceWrite}>Increase allowance</button>
                    </form>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            depositBobWrite?.()
                        }}
                        >
                        <h3>Deposit funds</h3>
                        <p>Deposited funds : {depositBalance} BOB</p>
                        <label>Amount</label>
                        <input
                            id="depositAmount"
                            onChange={(e) => setDepositAmount((e.target.value))}
                            placeholder=""
                            value={depositAmount}
                        />
                        <button disabled={!depositBobWrite}>Deposit funds</button>
                    </form>

                    <h2>Info</h2>
                    <p>In order to perform a direct deposit you have to <b>approve + desposit</b> some funds</p>
                    <div className="main__listing">
                        <p>1. First time : Approve Alice Ring DirectDeposit smart contract to transfer BOB</p>
                        <p>1. Other : Check Alice Ring allowance balance (increase if necessary) and desposited funds</p>
                        <p>2. Deposit BOB tokens into Alice Ring smart contract</p>
                        <p>3. Perform Direct Deposit</p>
                        <p>4. Come back here ✨</p>
                    </div>
                </div>
            </div>
            <div className="main__content">
                <div className="main__content__left">
                    <h2>What is zkBob ?</h2>
                    <p>A friendly, secure app gives you the freedom to deposit, transfer, and withdraw stable assets privately using zk technology paired with the BOB stablecoin.</p>
                    <a href="https://www.zkbob.com/" className="swap">Learn more</a>

                </div>
                <div className="main__content__right">
                    <h2>Get BOB stablecoin</h2>
                    <p>Your Balance: {balance} <img src={bobToken} height="10%" width="10%"/></p>
                    <p>You can Swap USDC-BOB here :</p>
                    <a href="https://app.paraswap.io/#/BOB-USDC/100?network=polygon" className="swap">Swap</a>
                </div>
            </div>
            <div>
                <p>Once you have proceed with solvancy verification you can know go to <b>payment</b>.
                <br></br><b>Send BOB without revealing your main address ! 🎉</b></p>
            </div>
            <div className="main__center">
                <h2>Generate a zkAddress to receive a transfer</h2>
                <p>If you are receiving funds from another zkBob user, you will want to send them a secure address. A new secure receiving address can be generated for each transfer. </p>
                <p>Go to app.zkBob UI and click on <b>Create ZkAccount</b></p>
                <div className="main__listing">
                    <p>1. Press the zkAccount button (your account should already be connected to initiate this process).</p>
                    <p>2. Press Generate receiving address.</p>
                    <p>3. Copy generated address and send to your friend via a private channel of your choice.</p>
                    <p>4. Come back here ✨</p>
                </div>
                <a href="https://staging--zkbob.netlify.app/" className="swap">Create ZkAccount</a>
            </div>
        </div>
    );
    

    
    
}

export default ZKbob;
