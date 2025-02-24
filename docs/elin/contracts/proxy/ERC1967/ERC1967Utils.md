# ERC1967Utils







*This library provides getters and event emitting update functions for https://eips.ethereum.org/EIPS/eip-1967[ERC-1967] slots.*



## Errors

### ERC1967InvalidAdmin

```solidity
error ERC1967InvalidAdmin(address admin)
```



*The `admin` of the proxy is invalid.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| admin | address | undefined |

### ERC1967InvalidBeacon

```solidity
error ERC1967InvalidBeacon(address beacon)
```



*The `beacon` of the proxy is invalid.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| beacon | address | undefined |

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



