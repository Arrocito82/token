import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";

actor Token {
    var owner : Principal = Principal.fromText("6rfss-e2yvi-wswks-ynj2o-xbhj5-i5fhz-fdurr-m4fo7-mymgp-75rip-7ae");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "MELI";
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
        Debug.print(debug_show(msg.caller));
        switch (balances.get(msg.caller)) {
            case null{
                balances.put(msg.caller, amount);
                return "Success";
            }; // if null returns 0
            case (?result) {
                return "You already claimed your free tokens.";
            }; // if result has a numeric value then it returns the value
        };
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

};
