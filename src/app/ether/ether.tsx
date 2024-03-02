"use client";
import { ethers } from "ethers";
import { BrowserProvider, parseUnits , ContractFactory } from "ethers";
import { HDNodeWallet } from "ethers/wallet";
import { BYTE_CODE , ABI} from "../../../config";
import { VrfCoordinator , enterenceFee , gasLane , subscription_Id , callbackGasLimit , interval } from "../../../arguments.config";
import { getAccount , getSigner } from "@/lib/features/providers/provider";
import { useAppDispatch , useAppSelector } from "@/lib/hooks";
import Snackbar , { SnackbarOrigin } from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { useState } from "react";

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
    const connetToMetmask = async() => {
    
        if(window.ethereum == null)
        {
            console.log("Metamask is not installed");
        }
    
        // proviser has access to read-only request to MetaMask
        provider = new ethers.BrowserProvider(window.ethereum);
        console.log("provider : " , provider)
        // 
        let signer = await provider.getSigner();
        console.log("signer : " , signer);
        // deployContract();
        
        putSigner(signer);

        console.log()
        let address : any = await signer.getAddress()
        console.log(address);

        putAccount(address);
    }

    // Render Components

    return (
        <main>
            { account ? 
                (
                <div>
                    <button onClick={() => {
                        dispatch(getAccount(null))
                    }}>Disconnect {JSON.stringify(signer)}</button>
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
                </div>
                )
                :
                (<button onClick={async () => {
                    await connetToMetmask();
                }}> Connect </button>)
            }
        </main>
    )
}

