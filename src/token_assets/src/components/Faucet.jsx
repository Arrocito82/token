import React, { useState } from "react";
import {token, canisterId, createActor} from "./../../../declarations/token"
import {Principal} from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

function Faucet() {
  const [isDisabled, setDisabled]=useState(false);
  const [message, setMessage]= useState("Gimme gimme");
  async function handleClick(event) {
    setDisabled(true);

    // HTTP Client to authenticate the user on ic 
    const authClient=await AuthClient.create();
    const identity=await authClient.getIdentity(); // authenticated user

     /******************************** QUESTIONS ****************************************
     * 
     * Why is the user a canister?
     * Isn't it enough if the user has a principal id?
     * Why does the createActor method use my own canisterId as a parameter?
     * Is it because it needs to create a fully new canister 
     * that's encrypted and unique like an https connection between the user and my dapp?
     * 
     ***********************************************************************************/

    // create actor with the identity provided
    const authenticatedCanisterUser = createActor(canisterId,{
          agentOptions: {
            identity
          },
    });

    // The payOut method is called by the authenticated user and not this canister itself
    const message=await authenticatedCanisterUser.payOut();
    setMessage(message);
    // setDisabled(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free Meli tokens here! Claim 10,000 MELI tokens to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {message}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
