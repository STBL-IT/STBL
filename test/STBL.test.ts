import { expect } from 'chai'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { ethers, upgrades } from 'hardhat'
import { STBL } from '../typechain-types'
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'
import exp from 'constants'

// variables
let token: STBL
let impl: STBL

let owner: HardhatEthersSigner
let minter: HardhatEthersSigner
let burner: HardhatEthersSigner
let alice: HardhatEthersSigner
let bob: HardhatEthersSigner

// constants
const usdtMintedAmount = ethers.parseUnits('1000', 6)
const maxSupply = ethers.parseUnits('10000', 6)


describe('Token', function () {
  async function deployFixture() {
    [owner, minter, burner, alice, bob] =
      await ethers.getSigners()

    const Token = await ethers.getContractFactory('STBL')
    impl = (await Token.deploy()) as unknown as STBL
    token = (await upgrades.deployProxy(Token, ['Stabiliti', 'STBL', owner.address, maxSupply], { unsafeAllow: ["constructor"] })) as unknown as STBL
    await token.grantRole(await token.MINTER_ROLE(), minter.address)
    await token.grantRole(await token.BURNER_ROLE(), burner.address)
    await token.connect(minter).mint(alice.address, usdtMintedAmount)
    await token.connect(alice).approve(alice.address, usdtMintedAmount)
    await token.connect(owner).setMaxSupply(maxSupply)

  }

  it('Token:Mint', async function () {
    await loadFixture(deployFixture)
    await expect(token.connect(alice).mint(alice.address, usdtMintedAmount)).to.be.revertedWithCustomError(
      token,
      'AccessControlUnauthorizedAccount',
    )
    await expect(token.connect(minter).mint(alice.address, maxSupply)).to.be.revertedWithCustomError(token, "CapReached");
    await token.connect(owner).grantRole(await token.MINT_BURN_DISABLER_ROLE(), bob.address)
    await token.connect(owner).grantRole(await token.MINT_BURN_ENABLER_ROLE(), bob.address)
    await token.connect(bob).disableMint()
    expect(await token.mintable()).to.equal(false)
    await expect(token.connect(minter).mint(alice.address, usdtMintedAmount)).to.be.revertedWithCustomError(token, "NotMintable")
    await token.connect(bob).enableMint()
    expect(await token.mintable()).to.equal(true)
    await token.connect(minter).mint(alice.address, usdtMintedAmount)
    expect(await token.totalSupply()).to.be.eq(usdtMintedAmount * 2n)
  })
  it('Token:Burn', async function () {
    await loadFixture(deployFixture)

    await expect(token.connect(alice).burn(alice.address, usdtMintedAmount)).to.be.revertedWithCustomError(
      token,
      'AccessControlUnauthorizedAccount',
    )
    await token.connect(owner).grantRole(await token.MINT_BURN_DISABLER_ROLE(), bob.address)
    await token.connect(owner).grantRole(await token.MINT_BURN_ENABLER_ROLE(), bob.address)
    await token.connect(bob).disableBurn()
    expect(await token.burnable()).to.equal(false)
    await expect(token.connect(burner).burn(alice.address, usdtMintedAmount)).to.be.revertedWithCustomError(token, "NotBurnable")
    await token.connect(bob).enableBurn()
    expect(await token.burnable()).to.equal(true)
    await token.connect(burner).burn(alice.address, usdtMintedAmount)
    expect(await token.totalSupply()).to.be.eq(0n)
  })
  it('Transfer', async function () {
    await loadFixture(deployFixture)
    await token.connect(alice).transfer(alice.address, usdtMintedAmount)
  })
  it('Transfer:notTransferable', async function () {
    await loadFixture(deployFixture)
    await token.connect(owner).disableTransfer()
    await expect(token.connect(alice).transfer(alice.address, usdtMintedAmount)).to.be.revertedWithCustomError(
      token,
      'NotTransferable',
    )
    await token.connect(owner).enableTransfer()
    await token.connect(alice).transfer(alice.address, usdtMintedAmount)
  })
  it('Transfer:Blacklisted', async function () {
    await loadFixture(deployFixture)
    await token.connect(owner).grantRole(await token.ADD_BLACKLIST_ROLE(), bob.address)
    await token.connect(owner).grantRole(await token.REMOVE_BLACKLIST_ROLE(), bob.address)
    await token.connect(bob).addBlacklist(alice.address)
    await expect(token.connect(alice).transfer(alice.address, usdtMintedAmount)).to.be.revertedWithCustomError(
      token,
      'UserInactive',
    )
    await token.connect(bob).removeBlacklist(alice.address)
    await token.connect(alice).transfer(alice.address, usdtMintedAmount / 2n)
    await token.connect(bob).addBlacklist(bob.address)
    await expect(token.connect(alice).transfer(bob.address, usdtMintedAmount / 2n)).to.be.revertedWithCustomError(
      token,
      'UserInactive',
    )
  })

  it('TransferFrom', async function () {
    await loadFixture(deployFixture)
    await token.connect(alice).transferFrom(alice.address, alice.address, usdtMintedAmount)
  })
  it('TransferFrom:notTransferable', async function () {
    await loadFixture(deployFixture)
    await token.connect(owner).disableTransfer()
    await expect(
      token.connect(alice).transferFrom(alice.address, alice.address, usdtMintedAmount),
    ).to.be.revertedWithCustomError(token, 'NotTransferable')
    await token.connect(owner).enableTransfer()
    await token.connect(alice).transferFrom(alice.address, alice.address, usdtMintedAmount)
  })
  it('TransferFrom:Blacklisted', async function () {
    await loadFixture(deployFixture)
    await token.connect(owner).grantRole(await token.ADD_BLACKLIST_ROLE(), bob.address)
    await token.connect(owner).grantRole(await token.REMOVE_BLACKLIST_ROLE(), bob.address)
    await token.connect(bob).addBlacklist(alice.address)
    await expect(
      token.connect(alice).transferFrom(alice.address, alice.address, usdtMintedAmount),
    ).to.be.revertedWithCustomError(token, 'UserInactive')
    await token.connect(bob).removeBlacklist(alice.address)
    await token.connect(alice).transferFrom(alice.address, alice.address, usdtMintedAmount / 2n)
    await token.connect(bob).addBlacklist(bob.address)
    await expect(
      token.connect(alice).transferFrom(alice.address, bob.address, usdtMintedAmount / 2n),
    ).to.be.revertedWithCustomError(token, 'UserInactive')
    expect(await token.isBlacklisted(bob.address)).to.be.true
  })

  it('enableTransfer:AccessControlUnauthorizedAccount', async function () {
    await loadFixture(deployFixture)
    await expect(token.connect(alice).disableTransfer()).to.be.revertedWithCustomError(
      token,
      'AccessControlUnauthorizedAccount',
    )
    await token.connect(owner).disableTransfer()
    expect(await token.transferable()).to.equal(false)
  })

  it('disableTransfer:AccessControlUnauthorizedAccount', async function () {
    await loadFixture(deployFixture)
    await expect(token.connect(alice).enableTransfer()).to.be.revertedWithCustomError(
      token,
      'AccessControlUnauthorizedAccount',
    )
    await token.connect(owner).enableTransfer()
    expect(await token.transferable()).to.equal(true)
  })

  it('addBlacklist:AccessControlUnauthorizedAccount', async function () {
    await loadFixture(deployFixture)
    await expect(token.connect(alice).addBlacklist(alice.address)).to.be.revertedWithCustomError(
      token,
      'AccessControlUnauthorizedAccount',
    )
  })

  it('removeBlacklist:AccessControlUnauthorizedAccount', async function () {
    await loadFixture(deployFixture)
    await expect(token.connect(alice).removeBlacklist(alice.address)).to.be.revertedWithCustomError(
      token,
      'AccessControlUnauthorizedAccount',
    )
  })

  it('addLostAddress:AccessControlUnauthorizedAccount', async function () {
    await loadFixture(deployFixture)
    await expect(token.connect(alice).addLostAddress(alice.address)).to.be.revertedWithCustomError(
      token,
      'AccessControlUnauthorizedAccount',
    )
  })

  it('removeLostAddress:AccessControlUnauthorizedAccount', async function () {
    await loadFixture(deployFixture)
    await expect(token.connect(alice).removeLostAddress(alice.address)).to.be.revertedWithCustomError(
      token,
      'AccessControlUnauthorizedAccount',
    )
    await token.connect(owner).grantRole(await token.REMOVE_LOST_ADDRESS_ROLE(), bob.address)
    await token.connect(bob).removeLostAddress(alice.address)
  })

  it('setMaxSupply:AccessControlUnauthorizedAccount', async function () {
    await loadFixture(deployFixture)
    await expect(token.connect(alice).setMaxSupply(123n)).to.be.revertedWithCustomError(
      token,
      'AccessControlUnauthorizedAccount',
    )
    await token.connect(owner).setMaxSupply(usdtMintedAmount)
    expect(await token.maxSupply()).to.equal(usdtMintedAmount)
  })

  it('setMaxSupply:amount<totalSupply', async function () {
    await loadFixture(deployFixture)
    await expect(token.connect(owner).setMaxSupply(123n)).to.be.revertedWithCustomError(token, "InvalidInput")
  })

  it('enableMint:AccessControlUnauthorizedAccount', async function () {
    await loadFixture(deployFixture)
    await expect(token.connect(alice).enableMint()).to.be.revertedWithCustomError(
      token,
      'AccessControlUnauthorizedAccount',
    )
  })

  it('disableMint:AccessControlUnauthorizedAccount', async function () {
    await loadFixture(deployFixture)
    await expect(token.connect(alice).disableMint()).to.be.revertedWithCustomError(
      token,
      'AccessControlUnauthorizedAccount',
    )
  })

  it('enableBurn:AccessControlUnauthorizedAccount', async function () {
    await loadFixture(deployFixture)
    await expect(token.connect(alice).enableBurn()).to.be.revertedWithCustomError(
      token,
      'AccessControlUnauthorizedAccount',
    )
  })

  it('disableBurn:AccessControlUnauthorizedAccount', async function () {
    await loadFixture(deployFixture)
    await expect(token.connect(alice).disableBurn()).to.be.revertedWithCustomError(
      token,
      'AccessControlUnauthorizedAccount',
    )
  })

  it('destroyBlockedTokens', async function () {
    await loadFixture(deployFixture)
    await token.connect(owner).grantRole(await token.ADD_BLACKLIST_ROLE(), bob.address)
    await token.connect(owner).grantRole(await token.DESTROY_BLOCKED_TOKENS_ROLE(), bob.address)
    await expect(token.connect(bob).destroyBlockedTokens(alice.address)).to.be.revertedWithCustomError(
      token, 'InvalidInput'
    )
    await token.connect(bob).addBlacklist(alice.address)
    await expect(token.connect(alice).destroyBlockedTokens(alice.address)).to.be.revertedWithCustomError(
      token, 'AccessControlUnauthorizedAccount'
    )
    await token.connect(bob).destroyBlockedTokens(alice.address)
    expect(await token.totalSupply()).to.be.eq(0)
  })

  it('rescueTokens', async function () {
    await loadFixture(deployFixture)
    await token.connect(owner).grantRole(await token.RESCUE_TOKENS_ROLE(), bob.address)
    await token.connect(owner).grantRole(await token.ADD_LOST_ADDRESS_ROLE(), bob.address)
    await expect(token.connect(bob).rescueTokens(alice.address)).to.be.revertedWithCustomError(
      token, 'InvalidInput'
    )
    await token.connect(bob).addLostAddress(alice.address)

    expect(await token.isLostAddress(alice.address)).to.be.true
    await expect(token.connect(alice).rescueTokens(alice.address)).to.be.revertedWithCustomError(
      token, 'AccessControlUnauthorizedAccount'
    )
    await token.connect(bob).rescueTokens(alice.address)
    expect(await token.totalSupply()).to.be.eq(0)
  })

  it('transfer:DefaultAdmin', async function () {
    await loadFixture(deployFixture)
    await token.connect(minter).mint(owner.address, usdtMintedAmount)
    await token.grantRole(await token.ADD_BLACKLIST_ROLE(), owner.address)
    await token.addBlacklist(alice.address)
    await token.addBlacklist(owner.address)
    await token.transfer(alice.address, usdtMintedAmount)
  })

  it('increaseAllowance', async function () {
    await loadFixture(deployFixture)
    await token.connect(alice).approve(bob.address, usdtMintedAmount)
    expect(await token.allowance(alice.address, bob.address)).to.be.eq(usdtMintedAmount)
    await token.connect(alice).increaseAllowance(bob.address, usdtMintedAmount)
    expect(await token.allowance(alice.address, bob.address)).to.be.eq(usdtMintedAmount * 2n)
  })

  it('decreaseAllowance', async function () {
    await loadFixture(deployFixture)
    await token.connect(alice).approve(bob.address, usdtMintedAmount * 2n)
    expect(await token.allowance(alice.address, bob.address)).to.be.eq(usdtMintedAmount * 2n)
    await expect(token.connect(alice).decreaseAllowance(bob.address, usdtMintedAmount)).to.emit(token, 'Approval')
    expect(await token.allowance(alice.address, bob.address)).to.be.eq(usdtMintedAmount)
  })

  it('initalizer:once', async function () {
    await loadFixture(deployFixture)
    await expect(token.connect(owner).initialize('test', 'test', owner.address, 1000)).to.be.revertedWithCustomError(
      token,
      'InvalidInitialization',
    )
  })
  it('upgrade: AccessControlUnauthorizedAccount', async function () {
    await loadFixture(deployFixture)
    await expect(token.connect(alice).upgradeToAndCall(await token.getAddress(), "0x")).to.be.revertedWithCustomError(
      token,
      'AccessControlUnauthorizedAccount')
    await token.connect(owner).upgradeToAndCall(await impl.getAddress(), "0x")
  })

  it('decimals', async function () {
    await loadFixture(deployFixture)
    expect(await token.decimals()).to.equal(6)
  })

  it('name', async function () {
    await loadFixture(deployFixture)
    expect(await token.name()).to.equal("Stabiliti")
  })

  it('symbol', async function () {
    await loadFixture(deployFixture)
    expect(await token.symbol()).to.equal("STBL")
  })

})
