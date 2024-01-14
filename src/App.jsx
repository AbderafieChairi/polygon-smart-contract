import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ethers } from "ethers";
import Counter from "./contracts/Counter.sol/Counter.json";
const counterAddress = "0x1fA466c366a8a866C1b984a3bCFA9aC1f8E2661C"
console.log(counterAddress, "Counter ABI: ", Counter.abi);
// import { MetaMaskInpageProvider } from "@metamask/providers";
// window.ethereum.ty
function App() {
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false);


  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    }
    
    async function updateCounter() {
    if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        const provider = new ethers.BrowserProvider(window.ethereum);
        console.log({ provider });
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(counterAddress, Counter.abi, signer);
        const transaction = await contract.increment();
        setIsLoading(true);
        await transaction.wait();
        setIsLoading(false);
        readCounterValue();
    }
    }


  useEffect(() => {
    // declare the data fetching function
    const fetchCount = async () => {
    const data = await readCounterValue();
    return data;
    };

    fetchCount().catch(console.error);
  }, []);

  const incrementCounter = async () => {
    await updateCounter();
    };


  async function readCounterValue() {
      if (typeof window.ethereum !== "undefined") {
          // const provider = new ethers.providers.Web3Provider(window.ethereum);
          const provider = new ethers.BrowserProvider(window.ethereum);
          

          console.log("provider", provider);

          const contract = new ethers.Contract(
              counterAddress,
              Counter.abi,
              provider
          );

          console.log("contract", contract);

          try {
              const data = await contract.retrieve();
              console.log(data);
              console.log("data: ", parseInt(data.toString()));
              setCount(parseInt(data.toString()));
          } catch (err) {
              console.log("Error: ", err);
              alert(
                  "Switch your MetaMask network to Polygon zkEVM Testnet and refresh this page!"
              );
          }
      }
  }



  
  return (
    <>
      
      <h1>
        polygon edge smart contract
      </h1>
  <button onClick={requestAccount}>
  requestAccount
  </button>

      <button
onClick={incrementCounter}
disabled={isLoading}
>
{isLoading ? "loading..." : "+1"}
</button>

    <h2>
      {count}
    </h2>
    </>
  )
}

export default App
