// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')

async function main() {
  const buyMeACoffee = await (
    await hre.ethers.getContractFactory('BuyMeACoffee')
  ).deploy()

  await buyMeACoffee.deployed()
  console.log(`Deployed BuyMeACoffee at ${buyMeACoffee.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
