import { useState,useEffect } from "react";
import {
    shortenAddress,
    useCall,
    useEthers,
    useLookupAddress,
  } from "@usedapp/core";

  
function WalletButton(props) {
    const [rendered, setRendered] = useState("");
  
    const ens = useLookupAddress();
    
    const { account, activateBrowserWallet, deactivate, error } = useEthers();
    useEffect(() => {
      if (ens) {
        setRendered(ens);
      } else if (account) {
        setRendered(shortenAddress(account));
      } else {
        setRendered("");
      }
    }, [account, ens, setRendered]);
  
    useEffect(() => {
      if (error) {
        console.error("Error while connecting wallet:", error.message);
      }
    }, [error]);
    return (
      <div
        onClick={() => {
          if (!account) {
            activateBrowserWallet();
          } else {
            deactivate();
          }
        }}
      >
        {rendered === "" && "Connect Wallet"}
        {rendered !== "" && rendered}
      </div>
    );
  }

  export default WalletButton;