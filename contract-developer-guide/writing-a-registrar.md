# Writing a Registrar

A registrar in ENS is simply any contract that owns a name, and allocates subdomains of it according to some set of rules defined in the contract code. A trivial first in first served contract is demonstrated below:

```text
contract FIFSRegistrar {
    ENS ens;
    bytes32 rootNode;

    function FIFSRegistrar(address ensAddr, bytes32 node) {
        ens = ENS(ensAddr);
        rootNode = node;
    }

    function register(bytes32 subnode, address owner) {
        var node = sha3(rootNode, subnode);
        var currentOwner = ens.owner(node);

        if (currentOwner != 0 && currentOwner != msg.sender) throw;

        ens.setSubnodeOwner(rootNode, subnode, owner);
    }
}
```

You may wish to set custom rules for the allocation of new names to your users; the rules you set are entirely up to you.

You should also bear in mind that as long as you retain ownership of the parent name - either directly or through another contract - your users have no guarantee that you will not take back ownership of their names and change what they resolve to. You may wish to consider committing ownership of the name to a contract that restricts your ability to control it. For an example of this, see [ENSNow](https://github.com/ensdomains/subdomain-registrar).  


