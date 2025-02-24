// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {ERC20PermitUpgradeable, ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./utils/Errors.sol";

/// @title STBL token
contract STBL is ERC20PermitUpgradeable, AccessControlUpgradeable, UUPSUpgradeable {
    string public constant VERSION = "1.0.0";

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    bytes32 public constant ADD_BLACKLIST_ROLE = keccak256("ADD_BLACKLIST_ROLE");
    bytes32 public constant REMOVE_BLACKLIST_ROLE = keccak256("REMOVE_BLACKLIST_ROLE");
    bytes32 public constant MINT_BURN_ENABLER_ROLE = keccak256("MINT_BURN_ENABLER_ROLE");
    bytes32 public constant MINT_BURN_DISABLER_ROLE = keccak256("MINT_BURN_DISABLER_ROLE");
    bytes32 public constant DESTROY_BLOCKED_TOKENS_ROLE = keccak256("DESTROY_BLOCKED_TOKENS_ROLE");
    bytes32 public constant ADD_LOST_ADDRESS_ROLE = keccak256("ADD_LOST_ADDRESS_ROLE");
    bytes32 public constant REMOVE_LOST_ADDRESS_ROLE = keccak256("REMOVE_LOST_ADDRESS_ROLE");
    bytes32 public constant RESCUE_TOKENS_ROLE = keccak256("RESCUE_TOKENS_ROLE");

    uint256 private _maxSupply;
    bool private _transferable;
    bool private _mintable;
    bool private _burnable;

    mapping(address => bool) private _blacklist;
    mapping(address => bool) private _lostAddress;

    ///@dev emitted when transferability is changed
    event TransferabilitySet(bool value);
    ///@dev emitted when mintability is changed
    event MintabilitySet(bool value);
    ///@dev emitted when burnability is changed
    event BurnabilitySet(bool value);

    ///@dev emitted when a user is blacklisted
    event Blacklisted(address wallet);
    ///@dev emitted when a user is unblacklisted
    event Unblacklisted(address wallet);
    ///@dev emitted when user wallet is lost
    event Lost(address wallet);
    ///@dev emitted when user wallet is found
    event Found(address wallet);
    ///@dev emitted when max supply is changed
    event MaxSupplySet(uint256 amount);
    ///@dev emitted when tokens are destroyed
    event BlockedTokensDestroyed(address from, uint256 amount);
    ///@dev emitted when tokens are rescued
    event TokensRescued(address from, uint256 amount);

    ///@dev check whether users are in the blocked
    ///@dev ignores default admin, minter and burner
    ///@param from_ sender adderss
    ///@param to_ receiver address
    modifier checkAccess(address from_, address to_) {
        if (
            !(hasRole(DEFAULT_ADMIN_ROLE, msg.sender) ||
                hasRole(MINTER_ROLE, msg.sender) ||
                hasRole(BURNER_ROLE, msg.sender))
        ) {
            if (_blacklist[from_] || _blacklist[to_]) {
                revert UserInactive();
            }
        }
        _;
    }

    constructor() {
        _disableInitializers();
    }

    ///@notice initializes the contract
    ///@dev can only be called once
    ///@param name_ the name of the token
    ///@param symbol_ the symbol of the token
    ///@param owner_ the address of the owner
    ///@param maxSupply_ the max supply
    function initialize(
        string memory name_,
        string memory symbol_,
        address owner_,
        uint256 maxSupply_
    ) external initializer {
        __ERC20_init(name_, symbol_);
        __ERC20Permit_init(name_);

        _transferable = true;
        emit TransferabilitySet(true);
        _mintable = true;
        emit MintabilitySet(true);
        _burnable = true;
        emit BurnabilitySet(true);
        _maxSupply = maxSupply_;
        emit MaxSupplySet(maxSupply_);
        _grantRole(DEFAULT_ADMIN_ROLE, owner_);
    }

    ///@notice mints tokens to a users
    ///@dev can only be called by minter smart contract
    ///@param to_ the address where tokens will be minted to
    ///@param amount_ the amount of tokens to be minted
    function mint(address to_, uint256 amount_) external onlyRole(MINTER_ROLE) {
        if (totalSupply() + amount_ > _maxSupply) {
            revert CapReached();
        }
        if (!_mintable) {
            revert NotMintable();
        }
        _mint(to_, amount_);
    }

    ///@notice burns tokens from a user
    ///@dev can only be called by minter smart contract
    ///@param from_ the address where tokens will be burned from
    ///@param amount_ the amount of tokens to be burned
    function burn(address from_, uint256 amount_) external onlyRole(BURNER_ROLE) {
        if (!_burnable) {
            revert NotBurnable();
        }
        _burn(from_, amount_);
    }

    ///@notice burns token from the blacklisted wallet
    ///@dev can only be called by default admin
    ///@dev destroys ALL tokens
    function destroyBlockedTokens(address from_) external onlyRole(DESTROY_BLOCKED_TOKENS_ROLE) {
        if (!_blacklist[from_]) {
            revert InvalidInput();
        }
        uint256 balance = balanceOf(from_);
        _burn(from_, balance);
        emit BlockedTokensDestroyed(from_, balance);
    }

    ///@notice burns token from the lost wallet
    ///@dev can only be called by default admin
    ///@dev burns ALL tokens
    function rescueTokens(address from_) external onlyRole(RESCUE_TOKENS_ROLE) {
        if (!_lostAddress[from_]) {
            revert InvalidInput();
        }
        uint256 balance = balanceOf(from_);
        _burn(from_, balance);
        emit TokensRescued(from_, balance);
    }

    ///@notice enables transferability
    ///@dev can only be called by default admin
    function enableTransfer() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _transferable = true;
        emit TransferabilitySet(true);
    }

    ///@notice disables transferability
    ///@dev can only be called by default admin
    function disableTransfer() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _transferable = false;
        emit TransferabilitySet(false);
    }

    ///@notice enables mintability
    ///@dev can only be called by default admin
    function enableMint() external onlyRole(MINT_BURN_ENABLER_ROLE) {
        _mintable = true;
        emit MintabilitySet(true);
    }

    ///@notice disables mintability
    ///@dev can only be called by default admin
    function disableMint() external onlyRole(MINT_BURN_DISABLER_ROLE) {
        _mintable = false;
        emit MintabilitySet(false);
    }

    ///@notice enables burnability
    ///@dev can only be called by default admin
    function enableBurn() external onlyRole(MINT_BURN_ENABLER_ROLE) {
        _burnable = true;
        emit BurnabilitySet(true);
    }

    ///@notice disables burnability
    ///@dev can only be called by default admin
    function disableBurn() external onlyRole(MINT_BURN_DISABLER_ROLE) {
        _burnable = false;
        emit BurnabilitySet(false);
    }

    ///@notice adds an address to the blacklist
    ///@dev can only be called by default admin
    ///@param wallet_ the address to be blocked
    function addBlacklist(address wallet_) external onlyRole(ADD_BLACKLIST_ROLE) {
        _blacklist[wallet_] = true;
        emit Blacklisted(wallet_);
    }

    ///@notice removes an address from the blacklist
    ///@dev can only be called by default admin
    ///@param wallet_ the address to be unblocked
    function removeBlacklist(address wallet_) external onlyRole(REMOVE_BLACKLIST_ROLE) {
        _blacklist[wallet_] = false;
        emit Unblacklisted(wallet_);
    }

    ///@notice adds an address to the lost address list
    ///@dev can only be called by default admin
    ///@param wallet_ the address to be added
    function addLostAddress(address wallet_) external onlyRole(ADD_LOST_ADDRESS_ROLE) {
        _lostAddress[wallet_] = true;
        emit Lost(wallet_);
    }

    ///@notice removes an address from the lost address list
    ///@dev can only be called by default admin
    ///@param wallet_ the address to be removed
    function removeLostAddress(address wallet_) external onlyRole(REMOVE_LOST_ADDRESS_ROLE) {
        _lostAddress[wallet_] = false;
        emit Found(wallet_);
    }

    ///@notice sets the max supply
    ///@dev can only be called by default admin
    ///@param amount_ the max supply
    function setMaxSupply(uint256 amount_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _maxSupply = amount_;
        emit MaxSupplySet(amount_);
    }

    ///@dev standard ERC20 transfer function with fee
    function transfer(
        address to_,
        uint256 value_
    ) public override checkAccess(msg.sender, to_) returns (bool) {
        if (!_transferable) {
            revert NotTransferable();
        }
        return super.transfer(to_, value_);
    }

    ///@dev standard ERC20 transferFrom function with fee
    function transferFrom(
        address from_,
        address to_,
        uint256 value_
    ) public override checkAccess(from_, to_) returns (bool) {
        if (!_transferable) {
            revert NotTransferable();
        }
        return super.transferFrom(from_, to_, value_);
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        address owner = _msgSender();
        _spendAllowance(owner, spender, subtractedValue);
        return true;
    }

    ///@notice returns the max token supply
    function maxSupply() external view returns (uint256) {
        return _maxSupply;
    }

    ///@notice returns transferability flag
    function transferable() external view returns (bool) {
        return _transferable;
    }

    ///@notice returns mintability flag
    function mintable() external view returns (bool) {
        return _mintable;
    }

    ///@notice returns burnability flag
    function burnable() external view returns (bool) {
        return _burnable;
    }

    ///@notice returns blacklisted flag for the wallet
    ///@param wallet_ the address to be checked
    function isBlacklisted(address wallet_) external view returns (bool) {
        return _blacklist[wallet_];
    }

    ///@notice returns lost address flag for the wallet
    ///@param wallet_ the address to be checked
    function isLostAddress(address wallet_) external view returns (bool) {
        return _lostAddress[wallet_];
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }

    /// @dev used by uups
    /// @dev upgrade can be initiated only by default admin
    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}
}
