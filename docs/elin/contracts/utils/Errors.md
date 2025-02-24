# Errors







*Collection of common custom errors used in multiple contracts IMPORTANT: Backwards compatibility is not guaranteed in future versions of the library. It is recommended to avoid relying on the error API for critical functionality. _Available since v5.1._*



## Errors

### FailedCall

```solidity
error FailedCall()
```



*A call to an address target failed. The target may have reverted.*


### FailedDeployment

```solidity
error FailedDeployment()
```



*The deployment failed.*


### InsufficientBalance

```solidity
error InsufficientBalance(uint256 balance, uint256 needed)
```



*The ETH balance of the account is not enough to perform the operation.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balance | uint256 | undefined |
| needed | uint256 | undefined |

### MissingPrecompile

```solidity
error MissingPrecompile(address)
```



*A necessary precompile is missing.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |


