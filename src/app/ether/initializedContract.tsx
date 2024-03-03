import { Contract , parseEther } from "ethers";
import { CONTRACT_ADDRESS , ABI } from "../../../config";
import { useAppSelector , useAppDispatch } from "@/lib/hooks";
import { getContract } from "@/lib/features/providers/provider";
export default function EnterLottery()
{
    const dispatch = useAppDispatch();
    const provider = useAppSelector((state) => state.account.provider);
    const account = useAppSelector((state) => {state.account.account});
    // Function 
    const putContract = (value : any) => {
        dispatch(getContract(value));
    }

    let enterLottery = async() => {
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        putContract(contract);

        const signer = provider.getSigner(account);

        // let contractSigner = contract.connect(signer);
        // const transaction = await contractSigner.enterLottery();
        // console.log("transaction :: ::" , transaction);
    }

    return (
        <div>
            <button onClick={enterLottery}>Enter Lottery</button>
        </div>
    )

}