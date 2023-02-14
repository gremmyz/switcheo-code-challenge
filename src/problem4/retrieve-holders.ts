import { ethers } from 'ethers';
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";

const swthTokenContractAddress = '0xc0ecb8499d8da2771abcbf4091db7f65158f1468';
const lookupAddresses = [
    '0xb5d4f343412dc8efb6ff599d790074d0f1e8d430',
    '0x0020c5222a24e4a96b720c06b803fb8d34adc0af',
    '0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392'
];
const bscRpcEndpoint = 'https://bsc-dataseed1.binance.org/';

const abi = ["function balanceOf(address account) view returns (uint256)"];
const provider = new JsonRpcProvider(bscRpcEndpoint)
const contract = new Contract(swthTokenContractAddress, abi, provider)

async function retrieveHolders() {
    const balances = await Promise.all(
        lookupAddresses.map(async (address) => {
            const bal = await contract.balanceOf(address);
            const formatBal = parseFloat(bal).toLocaleString("en-US");
            return `${address} ${formatBal.toString()}`;
        })
    );

    console.log(balances.join('\n'));
}

retrieveHolders().catch((error) => console.error(error));