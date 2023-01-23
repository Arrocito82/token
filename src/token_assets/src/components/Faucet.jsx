import React, { useState } from "react";
import {token} from "./../../../declarations/token"
import {Principal} from "@dfinity/principal";

function Faucet() {
  const [isDisabled, setDisabled]=useState(false);
  const [message, setMessage]= useState("Gimme gimme");
  async function handleClick(event) {
    setDisabled(true);
    const message=await token.payOut();
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
