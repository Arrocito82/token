import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

actor Token {
    Debug.print("Upgrading...");
    let owner : Principal = Principal.fromText("6rfss-e2yvi-wswks-ynj2o-xbhj5-i5fhz-fdurr-m4fo7-mymgp-75rip-7ae");
    let totalSupply : Nat = 1000000000;
    let symbol : Text = "MELI";
    stable var balanceEntries:[(Principal, Nat)]=[];
    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    // Initialize balance
    balances.put(owner, totalSupply);
    public query func balanceOf(who : Principal) : async Nat {
        let balance : Nat = switch (balances.get(who)) {
            case null 0; // if null returns 0
            case (?result) result; // if result has a numeric value then it returns the value
        };
        return balance;
    };

    public query func getSymbol():async Text{
        return symbol;
    };

    public shared(msg) func payOut():async Text{
        var amount:Nat= 10000;
        // Debug.print(debug_show(msg.caller));
        var feedback:Text="";
        switch (balances.get(msg.caller)) {
            case null{
                feedback:=await transfer(msg.caller, amount);
            }; // if null returns 0
            case (?result) {
                feedback:="You already claimed your free tokens.";
            }; // if result has a numeric value then it returns the value
        };
        return feedback;
    };

    public shared(msg) func transfer(to: Principal, amount: Nat): async Text{

        var balanceFrom: Nat=await balanceOf(msg.caller);
        var balanceTo:Nat= await balanceOf(to);
        Debug.print(debug_show(balanceFrom));
        Debug.print(debug_show(balanceTo));
        if(balanceFrom > amount){
            balanceFrom:=balanceFrom-amount;
            balanceTo:=balanceTo+amount;
            balances.put(msg.caller, balanceFrom);
            balances.put(to,balanceTo);
            Debug.print(debug_show(balanceFrom));
            Debug.print(debug_show(balanceTo));
            return "Success";
        }else{
            return "Insufient Funds"
        }
    };

    /**
    System methods are use before and afer upgrading a canester.
    In this case, we are using them because we need no persist the balances data
    but it is not posible to persist that data using the stable keyword 
    since HashMaps variables cannot be stabled.
    Therefore, we need to save the balances data before the canaster is upgraded
    and restore the data after it has been upgraded.
    */
    system func preupgrade(){
        // backup balances
        balanceEntries:=Iter.toArray(balances.entries());
    };
    system func postupgrade(){
        // restore balances
        balances:=HashMap.fromIter<Principal, Nat>(balanceEntries.vals(),1, Principal.equal, Principal.hash);
        balanceEntries:=[];
    };

};
