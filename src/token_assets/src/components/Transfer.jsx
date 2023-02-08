import React, { useState } from "react";
import {token, canisterId, createActor} from "./../../../declarations/token";
import {Principal} from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

function Transfer(props) {
  // tranfer variables
  const [idValue, setIdValue] =useState("");
  const [amount, setAmount]=useState(0);

  // ux variables
  const [message, setMessage]= useState("");
  const [isDisabled, setDisabled]=useState(false);
  const [isHidden, setHidden]=useState(true);
  async function handleClick() {
    
    // HTTP Client to authenticate the user on ic 
    const authClient=await AuthClient.create();
    const identity=await authClient.getIdentity(); // authenticated user
    // create actor with the identity provided
    const authenticatedCanisterUser = createActor(canisterId,{
          agentOptions: {identity},
    });

    // payee principal identity
    const principalId= Principal.fromText(idValue);
    const transferAmount= parseFloat(amount);
    if(transferAmount>0){
      setDisabled(true);
      const message= await authenticatedCanisterUser.transfer(principalId, transferAmount);
      setDisabled(false);
      setMessage(message);
      setHidden(false);
    }
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={idValue}
                onChange={(e)=>{setIdValue(e.target.value)}}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e)=>{setAmount(e.target.value)}}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>Transfer</button>
        </p>
        <p hidden={isHidden}>{message}</p>
      </div>
    </div>
  );
}

export default Transfer;
