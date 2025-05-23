# StorageSlot







*Library for reading and writing primitive types to specific storage slots. Storage slots are often used to avoid storage conflict when dealing with upgradeable contracts. This library helps with reading and writing to such slots without the need for inline assembly. The functions in this library return Slot structs that contain a `value` member that can be used to read or write. Example usage to set ERC-1967 implementation slot: ```solidity contract ERC1967 {     // Define the slot. Alternatively, use the SlotDerivation library to derive the slot.     bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;     function _getImplementation() internal view returns (address) {         return StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value;     }     function _setImplementation(address newImplementation) internal {         require(newImplementation.code.length &gt; 0);         StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value = newImplementation;     } } ``` TIP: Consider using this library along with {SlotDerivation}.*



