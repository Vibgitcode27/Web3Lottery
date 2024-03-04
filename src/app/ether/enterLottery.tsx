import {ethers , Contract , parseEther , parseUnits , keccak256 , toUtf8Bytes } from "ethers";
import { CONTRACT_ADDRESS , ABI } from "../../../config";
import { useAppSelector , useAppDispatch } from "@/lib/hooks";
import { getContract } from "@/lib/features/providers/provider";
import Snackbar , { SnackbarOrigin } from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { useState } from "react";

export default function EnterLottery()
{
    
    // Redux States
    
    const dispatch = useAppDispatch();
    const provider = useAppSelector((state) => state.account.provider);
    const account = useAppSelector((state) => {state.account.account});
    
    
    // Local States
    const [enterenceFee , setEnterenceFee] = useState<BigInt | null>(null);;
    const [noOfPlayers , setNoOfPlayers] = useState<BigInt | null>(null);;
    const [recentWinner , setRecentWinner] = useState<BigInt | null>(null);;
    const [lotteryState , setLotteryState] = useState<BigInt | null>(null);;

    // Function 
    const putContract = (value : any) => {
        dispatch(getContract(value));
    }

    let enterLottery = async() => {

        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        const transaction = await contractSigner.enterLottery({value : parseEther("0.011")});
        console.log("transaction :: ::" , transaction);
    }

    let getEnterenceFee = async() => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        let enterenceFee = await contractSigner.viewEnterenceFee();
        console.log("transaction :: ::" , enterenceFee);
        setEnterenceFee(enterenceFee);
    }

    let getNumOfPlayers = async() => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        let players = await contractSigner.getNumOfPlayers();
        console.log("number of players :: ::" , players);
        setNoOfPlayers(players);
    }

    let getLotteryState = async() => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        let lotteryState = await contractSigner.getLotteryState();
        console.log("Lottery State :: ::" , lotteryState);
        setLotteryState(lotteryState);
        console.log()
    }

    let getRecentWinner = async() => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        let winner = await contractSigner.getRecentWinner();
        console.log("Lottery State :: ::" , winner);
        setRecentWinner(winner);
    }

    let mockKeepers = async () => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        const checkData = keccak256(toUtf8Bytes(""))
        const { upkeepNeeded } = await contractSigner.checkUpkeep(checkData)
        if (upkeepNeeded) {
            const tx = await contractSigner.performUpkeep(checkData)
            const txReceipt = await tx.wait(1)
            const requestId = txReceipt.events[1].args.requestId
            console.log(`Performed upkeep with RequestId: ${requestId}`)
            await mockVrf(requestId, contractSigner)
        } 
        else {
                console.log("No upkeep needed!")
        }
    }

    let mockVrf = async (requestId, contract) => {
        console.log("We on a local network? Ok let's pretend...")
        await contract.fulfillRandomWords(requestId, contract.address)
        console.log("Responded!")
        const recentWinner = await contract.getRecentWinner()
        console.log(`The winner is: ${recentWinner}`)
    }


    return (
        <div>
            <button onClick={() => {enterLottery();}}>Enter Lottery</button>
            <Button onClick={() => {getEnterenceFee()}}>View Min Enterence Fee</Button>
            { enterenceFee != null ?
                (<p>
                   Enterence Fee :: {(enterenceFee).toString()}
                </p>
                ) : (
                    <p>
                        Please Get Enterence fee to view enterence fee
                    </p>
                )
            }
            <Button onClick={() => {getNumOfPlayers()}}>View Number OF Players</Button>
            { noOfPlayers != null ?
                (<p>
                   No. Of players :: {(noOfPlayers).toString()}
                </p>
                ) : (
                    <p>
                        Please get number players first
                    </p>
                )
            }
            <Button onClick={() => {getLotteryState()}}>Get Lottery State</Button>
            { recentWinner != null ?
                (<p>
                   Recent Winner :: {(recentWinner).toString()}
                </p>
                ) : (
                    <p>
                        Please gte lottery state first
                    </p>
                )
            }
            <Button onClick={() => {getRecentWinner()}}>View Recent Winner</Button>
            { lotteryState != null ?
                (<p>
                   Lottery State :: {(lotteryState).toString()}
                </p>
                ) : (
                    <p>
                        Please Get Recent Winner First
                    </p>
                )
            }

            <Button onClick={mockKeepers}>MockKeepers</Button>
        </div>
    )
}