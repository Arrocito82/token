import React, {useState} from "react";
import {token} from "./../../../declarations/token"
import {Principal} from "@dfinity/principal";

function Balance() {
  const [balance, setBalance]= useState("");
  const [idValue, setIdValue] =useState("");
  const [symbol, setSymbol] = useState("");
  async function handleClick() {
    const principalId= Principal.fromText(idValue);
    const balanceResult =await token.balanceOf(principalId);
    const currencySymbol=await token.getSymbol();
    setBalance(balanceResult.toLocaleString());
    setSymbol(currencySymbol.toLocaleString());
    // console.log(balance);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={idValue}
          onChange={(e)=>{setIdValue(e.target.value)}}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p>This account has a balance of $ {balance} {symbol}. </p>
    </div>
  );
}

export default Balance;
