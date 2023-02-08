import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from '@dfinity/auth-client';

const init = async () => { 
  
  const authClient= await AuthClient.create();
  if(await authClient.isAuthenticated()){
    handleAuthenticated(authClient);
  }else{
    await authClient.login({
      identityProvider:"https://identity.ic0.app/#authorize",
      onSuccess:()=>{
        handleAuthenticated(authClient);
      }
    });
  }

  // This function handles app behavior after the user is logged in
  async function handleAuthenticated(authClient){
    const identity=await authClient.getIdentity();
    const userPrincipal=identity._principal.toString();
    ReactDOM.render(<App loggedInPrincipalId={userPrincipal} />, document.getElementById("root"));    
  }
}

init();


