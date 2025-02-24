# STBL



> STBL token





## Methods

### ADD_BLACKLIST_ROLE

```solidity
function ADD_BLACKLIST_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### ADD_LOST_ADDRESS_ROLE

```solidity
function ADD_LOST_ADDRESS_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### BURNER_ROLE

```solidity
function BURNER_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### DEFAULT_ADMIN_ROLE

```solidity
function DEFAULT_ADMIN_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### DESTROY_BLOCKED_TOKENS_ROLE

```solidity
function DESTROY_BLOCKED_TOKENS_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### DOMAIN_SEPARATOR

```solidity
function DOMAIN_SEPARATOR() external view returns (bytes32)
```



*Returns the domain separator used in the encoding of the signature for {permit}, as defined by {EIP712}.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### MINTER_ROLE

```solidity
function MINTER_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### MINT_BURN_DISABLER_ROLE

```solidity
function MINT_BURN_DISABLER_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### MINT_BURN_ENABLER_ROLE

```solidity
function MINT_BURN_ENABLER_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### REMOVE_BLACKLIST_ROLE

```solidity
function REMOVE_BLACKLIST_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### REMOVE_LOST_ADDRESS_ROLE

```solidity
function REMOVE_LOST_ADDRESS_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### RESCUE_TOKENS_ROLE

```solidity
function RESCUE_TOKENS_ROLE() external view returns (bytes32)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### UPGRADE_INTERFACE_VERSION

```solidity
function UPGRADE_INTERFACE_VERSION() external view returns (string)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### VERSION

```solidity
function VERSION() external view returns (string)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### addBlacklist

```solidity
function addBlacklist(address wallet_) external nonpayable
```

adds an address to the blacklist

*can only be called by default admin*

#### Parameters

| Name | Type | Description |
|---|---|---|
| wallet_ | address | the address to be blocked |

### addLostAddress

```solidity
function addLostAddress(address wallet_) external nonpayable
```

adds an address to the lost address list

*can only be called by default admin*

#### Parameters

| Name | Type | Description |
|---|---|---|
| wallet_ | address | the address to be added |

### allowance

```solidity
function allowance(address owner, address spender) external view returns (uint256)
```



*See {IERC20-allowance}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined |
| spender | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### approve

```solidity
function approve(address spender, uint256 value) external nonpayable returns (bool)
```



*See {IERC20-approve}. NOTE: If `value` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| spender | address | undefined |
| value | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### balanceOf

```solidity
function balanceOf(address account) external view returns (uint256)
```



*See {IERC20-balanceOf}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### burn

```solidity
function burn(address from_, uint256 amount_) external nonpayable
```

burns tokens from a user

*can only be called by minter smart contract*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from_ | address | the address where tokens will be burned from |
| amount_ | uint256 | the amount of tokens to be burned |

### burnable

```solidity
function burnable() external view returns (bool)
```

returns burnability flag




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### decimals

```solidity
function decimals() external pure returns (uint8)
```



*Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the default value returned by this function, unless it&#39;s overridden. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | undefined |

### decreaseAllowance

```solidity
function decreaseAllowance(address spender, uint256 subtractedValue) external nonpayable returns (bool)
```



*Atomically decreases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address. - `spender` must have allowance for the caller of at least `subtractedValue`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| spender | address | undefined |
| subtractedValue | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### destroyBlockedTokens

```solidity
function destroyBlockedTokens(address from_) external nonpayable
```

burns token from the blacklisted wallet

*can only be called by default admindestroys ALL tokens*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from_ | address | undefined |

### disableBurn

```solidity
function disableBurn() external nonpayable
```

disables burnability

*can only be called by default admin*


### disableMint

```solidity
function disableMint() external nonpayable
```

disables mintability

*can only be called by default admin*


### disableTransfer

```solidity
function disableTransfer() external nonpayable
```

disables transferability

*can only be called by default admin*


### eip712Domain

```solidity
function eip712Domain() external view returns (bytes1 fields, string name, string version, uint256 chainId, address verifyingContract, bytes32 salt, uint256[] extensions)
```



*See {IERC-5267}.*


#### Returns

| Name | Type | Description |
|---|---|---|
| fields | bytes1 | undefined |
| name | string | undefined |
| version | string | undefined |
| chainId | uint256 | undefined |
| verifyingContract | address | undefined |
| salt | bytes32 | undefined |
| extensions | uint256[] | undefined |

### enableBurn

```solidity
function enableBurn() external nonpayable
```

enables burnability

*can only be called by default admin*


### enableMint

```solidity
function enableMint() external nonpayable
```

enables mintability

*can only be called by default admin*


### enableTransfer

```solidity
function enableTransfer() external nonpayable
```

enables transferability

*can only be called by default admin*


### getRoleAdmin

```solidity
function getRoleAdmin(bytes32 role) external view returns (bytes32)
```



*Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role&#39;s admin, use {_setRoleAdmin}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### grantRole

```solidity
function grantRole(bytes32 role, address account) external nonpayable
```



*Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``&#39;s admin role. May emit a {RoleGranted} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role | bytes32 | undefined |
| account | address | undefined |

### hasRole

```solidity
function hasRole(bytes32 role, address account) external view returns (bool)
```



*Returns `true` if `account` has been granted `role`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role | bytes32 | undefined |
| account | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### increaseAllowance

```solidity
function increaseAllowance(address spender, uint256 addedValue) external nonpayable returns (bool)
```



*Atomically increases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| spender | address | undefined |
| addedValue | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### initialize

```solidity
function initialize(string name_, string symbol_, address owner_, uint256 maxSupply_) external nonpayable
```

initializes the contract

*can only be called once*

#### Parameters

| Name | Type | Description |
|---|---|---|
| name_ | string | the name of the token |
| symbol_ | string | the symbol of the token |
| owner_ | address | the address of the owner |
| maxSupply_ | uint256 | the max supply |

### isBlacklisted

```solidity
function isBlacklisted(address wallet_) external view returns (bool)
```

returns blacklisted flag for the wallet



#### Parameters

| Name | Type | Description |
|---|---|---|
| wallet_ | address | the address to be checked |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### isLostAddress

```solidity
function isLostAddress(address wallet_) external view returns (bool)
```

returns lost address flag for the wallet



#### Parameters

| Name | Type | Description |
|---|---|---|
| wallet_ | address | the address to be checked |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### maxSupply

```solidity
function maxSupply() external view returns (uint256)
```

returns the max token supply




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### mint

```solidity
function mint(address to_, uint256 amount_) external nonpayable
```

mints tokens to a users

*can only be called by minter smart contract*

#### Parameters

| Name | Type | Description |
|---|---|---|
| to_ | address | the address where tokens will be minted to |
| amount_ | uint256 | the amount of tokens to be minted |

### mintable

```solidity
function mintable() external view returns (bool)
```

returns mintability flag




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### name

```solidity
function name() external view returns (string)
```



*Returns the name of the token.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### nonces

```solidity
function nonces(address owner) external view returns (uint256)
```



*Returns the current nonce for `owner`. This value must be included whenever a signature is generated for {permit}. Every successful call to {permit} increases ``owner``&#39;s nonce by one. This prevents a signature from being used multiple times.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### permit

```solidity
function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external nonpayable
```



*Sets `value` as the allowance of `spender` over ``owner``&#39;s tokens, given ``owner``&#39;s signed approval. IMPORTANT: The same issues {IERC20-approve} has related to transaction ordering also apply here. Emits an {Approval} event. Requirements: - `spender` cannot be the zero address. - `deadline` must be a timestamp in the future. - `v`, `r` and `s` must be a valid `secp256k1` signature from `owner` over the EIP712-formatted function arguments. - the signature must use ``owner``&#39;s current nonce (see {nonces}). For more information on the signature format, see the https://eips.ethereum.org/EIPS/eip-2612#specification[relevant EIP section]. CAUTION: See Security Considerations above.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined |
| spender | address | undefined |
| value | uint256 | undefined |
| deadline | uint256 | undefined |
| v | uint8 | undefined |
| r | bytes32 | undefined |
| s | bytes32 | undefined |

### proxiableUUID

```solidity
function proxiableUUID() external view returns (bytes32)
```



*Implementation of the ERC-1822 {proxiableUUID} function. This returns the storage slot used by the implementation. It is used to validate the implementation&#39;s compatibility when performing an upgrade. IMPORTANT: A proxy pointing at a proxiable contract should not be considered proxiable itself, because this risks bricking a proxy that upgrades to it, by delegating to itself until out of gas. Thus it is critical that this function revert if invoked through a proxy. This is guaranteed by the `notDelegated` modifier.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### removeBlacklist

```solidity
function removeBlacklist(address wallet_) external nonpayable
```

removes an address from the blacklist

*can only be called by default admin*

#### Parameters

| Name | Type | Description |
|---|---|---|
| wallet_ | address | the address to be unblocked |

### removeLostAddress

```solidity
function removeLostAddress(address wallet_) external nonpayable
```

removes an address from the lost address list

*can only be called by default admin*

#### Parameters

| Name | Type | Description |
|---|---|---|
| wallet_ | address | the address to be removed |

### renounceRole

```solidity
function renounceRole(bytes32 role, address callerConfirmation) external nonpayable
```



*Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function&#39;s purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been revoked `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `callerConfirmation`. May emit a {RoleRevoked} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role | bytes32 | undefined |
| callerConfirmation | address | undefined |

### rescueTokens

```solidity
function rescueTokens(address from_) external nonpayable
```

burns token from the lost wallet

*can only be called by default adminburns ALL tokens*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from_ | address | undefined |

### revokeRole

```solidity
function revokeRole(bytes32 role, address account) external nonpayable
```



*Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``&#39;s admin role. May emit a {RoleRevoked} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role | bytes32 | undefined |
| account | address | undefined |

### setMaxSupply

```solidity
function setMaxSupply(uint256 amount_) external nonpayable
```

sets the max supply

*can only be called by default admin*

#### Parameters

| Name | Type | Description |
|---|---|---|
| amount_ | uint256 | the max supply |

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool)
```



*See {IERC165-supportsInterface}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| interfaceId | bytes4 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### symbol

```solidity
function symbol() external view returns (string)
```



*Returns the symbol of the token, usually a shorter version of the name.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### totalSupply

```solidity
function totalSupply() external view returns (uint256)
```



*See {IERC20-totalSupply}.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### transfer

```solidity
function transfer(address to_, uint256 value_) external nonpayable returns (bool)
```



*standard ERC20 transfer function with fee*

#### Parameters

| Name | Type | Description |
|---|---|---|
| to_ | address | undefined |
| value_ | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### transferFrom

```solidity
function transferFrom(address from_, address to_, uint256 value_) external nonpayable returns (bool)
```



*standard ERC20 transferFrom function with fee*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from_ | address | undefined |
| to_ | address | undefined |
| value_ | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### transferable

```solidity
function transferable() external view returns (bool)
```

returns transferability flag




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### upgradeToAndCall

```solidity
function upgradeToAndCall(address newImplementation, bytes data) external payable
```



*Upgrade the implementation of the proxy to `newImplementation`, and subsequently execute the function call encoded in `data`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newImplementation | address | undefined |
| data | bytes | undefined |



## Events

### Approval

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value)
```



*Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}. `value` is the new allowance.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner `indexed` | address | undefined |
| spender `indexed` | address | undefined |
| value  | uint256 | undefined |

### Blacklisted

```solidity
event Blacklisted(address wallet)
```



*emitted when a user is blacklisted*

#### Parameters

| Name | Type | Description |
|---|---|---|
| wallet  | address | undefined |

### BlockedTokensDestroyed

```solidity
event BlockedTokensDestroyed(address from, uint256 amount)
```



*emitted when tokens are destroyed*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from  | address | undefined |
| amount  | uint256 | undefined |

### BurnabilitySet

```solidity
event BurnabilitySet(bool value)
```



*emitted when burnability is changed*

#### Parameters

| Name | Type | Description |
|---|---|---|
| value  | bool | undefined |

### EIP712DomainChanged

```solidity
event EIP712DomainChanged()
```



*MAY be emitted to signal that the domain could have changed.*


### Found

```solidity
event Found(address wallet)
```



*emitted when user wallet is found*

#### Parameters

| Name | Type | Description |
|---|---|---|
| wallet  | address | undefined |

### Initialized

```solidity
event Initialized(uint64 version)
```



*Triggered when the contract has been initialized or reinitialized.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint64 | undefined |

### Lost

```solidity
event Lost(address wallet)
```



*emitted when user wallet is lost*

#### Parameters

| Name | Type | Description |
|---|---|---|
| wallet  | address | undefined |

### MaxSupplySet

```solidity
event MaxSupplySet(uint256 amount)
```



*emitted when max supply is changed*

#### Parameters

| Name | Type | Description |
|---|---|---|
| amount  | uint256 | undefined |

### MintabilitySet

```solidity
event MintabilitySet(bool value)
```



*emitted when mintability is changed*

#### Parameters

| Name | Type | Description |
|---|---|---|
| value  | bool | undefined |

### RoleAdminChanged

```solidity
event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole)
```



*Emitted when `newAdminRole` is set as ``role``&#39;s admin role, replacing `previousAdminRole` `DEFAULT_ADMIN_ROLE` is the starting admin for all roles, despite {RoleAdminChanged} not being emitted signaling this.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role `indexed` | bytes32 | undefined |
| previousAdminRole `indexed` | bytes32 | undefined |
| newAdminRole `indexed` | bytes32 | undefined |

### RoleGranted

```solidity
event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)
```



*Emitted when `account` is granted `role`. `sender` is the account that originated the contract call. This account bears the admin role (for the granted role). Expected in cases where the role was granted using the internal {AccessControl-_grantRole}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role `indexed` | bytes32 | undefined |
| account `indexed` | address | undefined |
| sender `indexed` | address | undefined |

### RoleRevoked

```solidity
event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)
```



*Emitted when `account` is revoked `role`. `sender` is the account that originated the contract call:   - if using `revokeRole`, it is the admin role bearer   - if using `renounceRole`, it is the role bearer (i.e. `account`)*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role `indexed` | bytes32 | undefined |
| account `indexed` | address | undefined |
| sender `indexed` | address | undefined |

### TokensRescued

```solidity
event TokensRescued(address from, uint256 amount)
```



*emitted when tokens are rescued*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from  | address | undefined |
| amount  | uint256 | undefined |

### Transfer

```solidity
event Transfer(address indexed from, address indexed to, uint256 value)
```



*Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from `indexed` | address | undefined |
| to `indexed` | address | undefined |
| value  | uint256 | undefined |

### TransferabilitySet

```solidity
event TransferabilitySet(bool value)
```



*emitted when transferability is changed*

#### Parameters

| Name | Type | Description |
|---|---|---|
| value  | bool | undefined |

### Unblacklisted

```solidity
event Unblacklisted(address wallet)
```



*emitted when a user is unblacklisted*

#### Parameters

| Name | Type | Description |
|---|---|---|
| wallet  | address | undefined |

### Upgraded

```solidity
event Upgraded(address indexed implementation)
```



*Emitted when the implementation is upgraded.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| implementation `indexed` | address | undefined |



## Errors

### AccessControlBadConfirmation

```solidity
error AccessControlBadConfirmation()
```



*The caller of a function is not the expected one. NOTE: Don&#39;t confuse with {AccessControlUnauthorizedAccount}.*


### AccessControlUnauthorizedAccount

```solidity
error AccessControlUnauthorizedAccount(address account, bytes32 neededRole)
```



*The `account` is missing a role.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | undefined |
| neededRole | bytes32 | undefined |

### AddressEmptyCode

```solidity
error AddressEmptyCode(address target)
```



*There&#39;s no code at `target` (it is not a contract).*

#### Parameters

| Name | Type | Description |
|---|---|---|
| target | address | undefined |

### CapReached

```solidity
error CapReached()
```






### ECDSAInvalidSignature

```solidity
error ECDSAInvalidSignature()
```



*The signature derives the `address(0)`.*


### ECDSAInvalidSignatureLength

```solidity
error ECDSAInvalidSignatureLength(uint256 length)
```



*The signature has an invalid length.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| length | uint256 | undefined |

### ECDSAInvalidSignatureS

```solidity
error ECDSAInvalidSignatureS(bytes32 s)
```



*The signature has an S value that is in the upper half order.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| s | bytes32 | undefined |

### ERC1967InvalidImplementation

```solidity
error ERC1967InvalidImplementation(address implementation)
```



*The `implementation` of the proxy is invalid.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| implementation | address | undefined |

### ERC1967NonPayable

```solidity
error ERC1967NonPayable()
```



*An upgrade function sees `msg.value &gt; 0` that may be lost.*


### ERC20InsufficientAllowance

```solidity
error ERC20InsufficientAllowance(address spender, uint256 allowance, uint256 needed)
```



*Indicates a failure with the `spender`’s `allowance`. Used in transfers.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| spender | address | Address that may be allowed to operate on tokens without being their owner. |
| allowance | uint256 | Amount of tokens a `spender` is allowed to operate with. |
| needed | uint256 | Minimum amount required to perform a transfer. |

### ERC20InsufficientBalance

```solidity
error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed)
```



*Indicates an error related to the current `balance` of a `sender`. Used in transfers.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| sender | address | Address whose tokens are being transferred. |
| balance | uint256 | Current balance for the interacting account. |
| needed | uint256 | Minimum amount required to perform a transfer. |

### ERC20InvalidApprover

```solidity
error ERC20InvalidApprover(address approver)
```



*Indicates a failure with the `approver` of a token to be approved. Used in approvals.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| approver | address | Address initiating an approval operation. |

### ERC20InvalidReceiver

```solidity
error ERC20InvalidReceiver(address receiver)
```



*Indicates a failure with the token `receiver`. Used in transfers.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| receiver | address | Address to which tokens are being transferred. |

### ERC20InvalidSender

```solidity
error ERC20InvalidSender(address sender)
```



*Indicates a failure with the token `sender`. Used in transfers.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| sender | address | Address whose tokens are being transferred. |

### ERC20InvalidSpender

```solidity
error ERC20InvalidSpender(address spender)
```



*Indicates a failure with the `spender` to be approved. Used in approvals.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| spender | address | Address that may be allowed to operate on tokens without being their owner. |

### ERC2612ExpiredSignature

```solidity
error ERC2612ExpiredSignature(uint256 deadline)
```



*Permit deadline has expired.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| deadline | uint256 | undefined |

### ERC2612InvalidSigner

```solidity
error ERC2612InvalidSigner(address signer, address owner)
```



*Mismatched signature.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| signer | address | undefined |
| owner | address | undefined |

### FailedCall

```solidity
error FailedCall()
```



*A call to an address target failed. The target may have reverted.*


### InvalidAccountNonce

```solidity
error InvalidAccountNonce(address account, uint256 currentNonce)
```



*The nonce used for an `account` is not the expected current nonce.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | undefined |
| currentNonce | uint256 | undefined |

### InvalidInitialization

```solidity
error InvalidInitialization()
```



*The contract is already initialized.*


### InvalidInput

```solidity
error InvalidInput()
```






### NotBurnable

```solidity
error NotBurnable()
```






### NotInitializing

```solidity
error NotInitializing()
```



*The contract is not initializing.*


### NotMintable

```solidity
error NotMintable()
```






### NotTransferable

```solidity
error NotTransferable()
```






### UUPSUnauthorizedCallContext

```solidity
error UUPSUnauthorizedCallContext()
```



*The call is from an unauthorized context.*


### UUPSUnsupportedProxiableUUID

```solidity
error UUPSUnsupportedProxiableUUID(bytes32 slot)
```



*The storage `slot` is unsupported as a UUID.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| slot | bytes32 | undefined |

### UserInactive

```solidity
error UserInactive()
```







