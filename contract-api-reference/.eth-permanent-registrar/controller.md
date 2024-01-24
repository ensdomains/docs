# Controller

[Source](https://github.com/ensdomains/ens-contracts/blob/master/contracts/ethregistrar/ETHRegistrarController.sol)

This section documents the parts of the [ETHRegistrarController](https://github.com/ensdomains/ens-contracts/blob/master/contracts/ethregistrar/ETHRegistrarController.sol) relevant to implementers of tools that interact with it. Functionality exclusive to the registrar owner is omitted for brevity.

The controller works exclusively with plaintext labels \(eg, 'alice' for 'alice.eth'\).

To prevent frontrunning, the ETHRegistrarController requires a commit/reveal process for new name registrations \(but not for renewals\). To register a name, the user must:

1. Generate a commitment hash from the name they want to register and a secret value.
2. Submit the commitment hash from \#1 to the controller.
3. Wait for at least 1 minute, but no longer than 24 hours.
4. Submit a registration request for the name, along with the secret value from \#1.

This process ensures that registrations cannot be frontrun unless the attacker is able to censor the user's transactions for at least 1 minute.

## Examples

### Name Registration

The below example demonstrates the steps required to register a name.

{% tabs %}
{% tab title="web3.js" %}
```javascript
const controller = web3.eth.contract(controller_abi).at(controller_address);
async function register(name, owner, duration) {
  // Generate a random value to mask our commitment
  const random = new Uint8Array(32);
  crypto.getRandomValues(random);
  const salt = "0x" + Array.from(random).map(b => b.toString(16).padStart(2, "0")).join("");
  // Submit our commitment to the smart contract
  const commitment = await controller.makeCommitment(name, owner, salt);
  const tx = await controller.commit(commitment);
  // Add 10% to account for price fluctuation; the difference is refunded.
  const price = (await controller.rentPrice(name, duration)) * 1.1;
  // Wait 60 seconds before registering
  setTimeout(async () => {
    // Submit our registration request
    await controller.register(name, owner, duration, salt, {value: price});
  }, 60000);
}
```

{% hint style="info" %}
For clarity, this example is written using async rather than callbacks. As a result, this example works in web3 1.0.x; note that it will not work in the web3 injected by MetaMask, as this presently is an older version lacking async support.
{% endhint %}
{% endtab %}
{% endtabs %}

## Read Operations

### Get Minimum Commitment Age

```text
uint constant public MIN_COMMITMENT_AGE;
```

This public constant provides the minimum commitment age, in seconds. A commitment can only be revealed after at least this many seconds have passed since it was mined.

DApps should fetch this constant rather than hardcoding the current value, as it's possible it will change with future releases.

### Get Maximum Commitment Age

```text
uint constant public MAX_COMMITMENT_AGE;
```

This public constant provides the maximum commitment age, in seconds. A commitment that was mined more than this number of seconds ago is no longer valid, and cannot be used to register a name.

DApps should fetch this constant rather than hardcoding the current value, as it's possible it will change with future releases.

### Get Minimum Registration Duration

```text
uint constant public MIN_REGISTRATION_DURATION;
```

This public constant provides the minimum registration duration, in seconds. Registrations for less than this duration will be rejected.

DApps should fetch this constant rather than hardcoding the current value, as it's possible it will change with future releases.

### Get Commitment Timestamp

```text
mapping(bytes32=>uint) public commitments;
```

`commitments` stores a mapping from each submitted to commitment to the timestamp at which it was made. Callers wishing to validate that a commitment is valid before submitting a registration transaction should check this map first.

### Get Rent Price

```text
function rentPrice(string name, uint duration) view public returns(uint);
```

`rentPrice` returns the cost, in wei, to register or renew the provided name for the provided duration, in seconds. Callers should note that this price may vary over time, particularly if the pricing oracle is relying on a fiat price conversion.

Callers should use this function to obtain registration costs to display to the user rather than calculating them internally, as future changes to the pricing oracle may result in different pricing schemes, with registration cost-per-year depending on name length, registration duration, or other variables.

### Check Name Validity

```text
function valid(string name) public view returns(bool);
```

`valid` returns true iff name is valid for registration with this controller \(eg, it meets length requirements\).

### Check Name Availability

```text
function available(string name) public view returns(bool);
```

`available` returns true if the name is both valid and available for registration by this controller. [Under the hood](https://github.com/ensdomains/ens-contracts/blob/master/contracts/ethregistrar/ETHRegistrarController.sol#L103-L105), this call uses the `valid` function \(above\) and the `available` function on the [registrar](registrar.md#check-name-availability) contract, which checks for availability in both the legacy ENS registrar and current ENS registrar.

Callers **should** use this function to check if a name is available for registration, rather than the `available` function on the registrar contract, which does not check name length.

### Calculate Commitment Hash

```text
function makeCommitment(string name, address owner, bytes32 secret) pure public returns(bytes32);
```

`makeCommitment` generates and returns a commitment hash from a name label \(eg, 'myname', not 'myname.eth'\) owner, and secret value.

## Write Operations

### Submit Commitment

```text
function commit(bytes32 commitment) public;
```

`commit` submits a precommitment generated by calling [makeCommitment](controller.md#calculate-commitment-hash).

### Register Name

```text
function register(string name, address owner, uint duration, bytes32 secret) public payable;
```

`register` registers a name. A valid registration request must meet the following criteria:

1. `available(name) == true`.
2. `duration >= MIN_REGISTRATION_DURATION`.
3. `secret` identifies a valid commitment \(eg, `commitments[makeCommitment(name, secret)]` exists and is between 1 minute and 24 hours old.
4. `msg.value >= rentPrice(name, duration)`.

Because the rent price may vary over time, callers are recommended to send slightly more than the value returned by `rentPrice` - a premium of 5-10% will likely be sufficient. Any excess funds are returned to the caller.

Emits the following event on a successful call:

```text
event NameRegistered(string name, bytes32 indexed label, address indexed owner, uint cost, uint expires);
```

A successful call also results in the Registrar emitting a [Name Registered Event](registrar.md#name-registered), and the ENS registry emitting a [New Owner Event](../ens.md#set-subdomain-owner).

### Extend Name Registration

```text
function renew(string name, uint duration) external payable;
```

`renew` renews a name, extending the name's expiration by `duration` seconds. This function can be called by anyone, as long as sufficient funds are provided. Because the rent price may vary over time, callers are recommended to send slightly more than the value returned by `rentPrice` - a premium of 5-10% will likely be sufficient. Any excess funds are returned to the caller.

Emits the following event on a successful call:

```text
event NameRenewed(string name, bytes32 indexed label, uint cost, uint expires);
```

A successful call also results in the Registrar emitting a [Name Renewed Event](registrar.md#name-renewed).

