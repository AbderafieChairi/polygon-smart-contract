import { useEffect, useState } from "react";





export default function Test (){
    const [account,setAccount] = useState("");


    useEffect(() => {
        // Check if MetaMask is installed
        if (window.ethereum) {
    
          // Request account access if needed
          window.ethereum.enable()
            .then(accounts => {
              setAccount(accounts[0]);
    
              // Listen for account changes
              window.ethereum?.on('accountsChanged', (newAccounts) => {
                if (Array.isArray(newAccounts) && newAccounts.length > 0) {
                  setAccount(newAccounts[0]);
                } else {
                  console.error('Invalid new accounts format:', newAccounts);
                }
              });
            })
            .catch(error => console.error('Error connecting to MetaMask:', error));
        } else {
          console.error('MetaMask not detected. Please install MetaMask.');
        }
      }, []);
      return (
        <div>
            test {account}
        </div>
      )
}