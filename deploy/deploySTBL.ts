import { ethers, network, upgrades } from 'hardhat'
import { STBL } from '../typechain-types'
import hre from 'hardhat'

const owner = '';
const maxSupply = ethers.parseUnits('1000000', 6)

async function main() {
    const STBLFactory = await ethers.getContractFactory('STBL')
    let STBL = await upgrades.deployProxy(STBLFactory, ['Stabiliti', 'STBL', owner, maxSupply], { unsafeAllow: ["constructor"] }) as unknown as STBL
    STBL = await STBL.waitForDeployment()
    console.log("STBL deployed to:", await STBL.getAddress())
    await new Promise(resolve => setTimeout(resolve, 10000));

    await hre.run('verify:verify', {
        address: await STBL.getAddress(),
        contract: 'contracts/STBL.sol:STBL',
        constructorArguments: [],
    })
    console.log('verified STBL')
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })