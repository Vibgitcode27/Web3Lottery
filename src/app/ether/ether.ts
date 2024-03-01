import { ethers } from "ethers";
import { BrowserProvider, parseUnits , ContractFactory } from "ethers";
import { HDNodeWallet } from "ethers/wallet";
import { BYTE_CODE , ABI} from "../../../config";
import { VrfCoordinator , enterenceFee , gasLane , subscription_Id , callbackGasLimit , interval } from "../../../arguments.config";

let signer : any = null
let provider;
let contract_Address;
const deployContract = async() => {
    const factory = new ContractFactory(ABI , BYTE_CODE , signer);
    const contract = await factory.deploy(enterenceFee ,VrfCoordinator , gasLane , subscription_Id , callbackGasLimit , interval);   
    console.log(contract);
    contract_Address = await contract.getAddress();
    console.log(contract_Address);
}

export const connetToMetmask = async() => {
    
    if(window.ethereum == null)
    {
        console.log("Metamask is not installed");
    }
    
    // proviser has access to read-only request to MetaMask
    provider = new ethers.BrowserProvider(window.ethereum);
    console.log("provider : " , provider)
    // 
    signer = await provider.getSigner();
    console.log("signer : " , signer);
    deployContract();
}