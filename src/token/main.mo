import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

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

};
