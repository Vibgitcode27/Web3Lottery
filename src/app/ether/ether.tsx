"use client";
import React from "react";
import { ethers , parseEther , Contract } from "ethers";
import { BrowserProvider, parseUnits , ContractFactory } from "ethers";
import { HDNodeWallet } from "ethers/wallet";
import { BYTE_CODE , ABI, CONTRACT_ADDRESS} from "../../../config";
import { VrfCoordinator , enterenceFee , gasLane , subscription_Id , callbackGasLimit , interval } from "../../../arguments.config";
import { getAccount , getProvider, getSigner } from "@/lib/features/providers/provider";
import { useAppDispatch , useAppSelector } from "@/lib/hooks";
import Snackbar , { SnackbarOrigin } from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { useState } from "react";
import EnterLottery from "./enterLottery";

export default function Ethers()
{
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;
    const handleClick = (newState: SnackbarOrigin) => () => {
        setState({ ...newState, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const dispatch = useAppDispatch();
    const account = useAppSelector((state) => state.account.account);
    const signer = useAppSelector((state) => state.account.signer);
    let provider;

    // let contract_Address;
    // const deployContract = async() => {
    //     const factory = new ContractFactory(ABI , BYTE_CODE , signer);
    //     const contract = await factory.deploy(enterenceFee ,VrfCoordinator , gasLane , subscription_Id , callbackGasLimit , interval);   
    //     console.log(contract);
    //     contract_Address = await contract.getAddress();
    //     console.log(contract_Address);
    // }

    // Function Calls

    let putAccount = (value : any) => {
        dispatch(getAccount(value));
    }

    let putSigner = (value : any) => {
        dispatch(getSigner(value));
    }

    let putProvider = (value : any) => {
        dispatch(getProvider(value));
    }



    // ETHER.js


    const connetToMetmask = async() => {
    
        if(window.ethereum == null)
        {
            console.log("Metamask is not installed");
        }
    
        // proviser has access to read-only request to MetaMask
        provider = new ethers.BrowserProvider(window.ethereum);
        console.log("provider : " , provider) 
        
        let ok = await provider.getTransactionCount(CONTRACT_ADDRESS)
        console.log("Ok :::::::" , ok);
        putProvider(provider);
        
        let signer = await provider.getSigner();
        console.log("signer : " , signer);

        
        putSigner(signer);
        
        let address : any = await signer.getAddress()
        console.log(address);
        
        putAccount(address);

        let balance = provider.getBalance(CONTRACT_ADDRESS);
        console.log("address blanace  ::::" , balance)
        
        // let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        // let contractSigner = contract.connect(signer);
        // const transaction = await contractSigner.enterLottery({value : parseEther("0.011")});
        // console.log("transaction :: ::" , transaction);
    }

    // Render Components

    return (
        <main>
            { account ? 
                (
                <div>
                    <button onClick={() => {
                        dispatch(getAccount(null))
                    }}>Disconnect</button>
                    <Box sx={{ width: 500 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>
                                View Account
                            </Button>
                        </Box>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={handleClose}
                        message={ "Your Address : " + account}
                        key={vertical + horizontal}
                    />    
                    </Box>
                    <EnterLottery/>
                </div>
                )
                :
                (<div className="flex justify-center">
                    <button className="text-sm px-4 px-4 py-0 sm:py-0 md:py-1 lg:py-2 rounded-md border border-black bg-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200" onClick={async () => {
                        await connetToMetmask();
                    }}> Connect </button>
                    <p>&nbsp;&nbsp;&nbsp;</p>
                    <button className="text-sm px-4 py-0 sm:py-0 md:py-1  rounded-md border border-black bg-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
                    Sign Up </button>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                </div>)
            }
        </main>
    )
}

