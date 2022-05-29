// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')

const getBalance = async (address) => {
  const balance = await hre.ethers.provider.getBalance(address)
  return hre.ethers.utils.formatEther(balance)
}
const printBalances = async (addresses) => {
  let id = 0
  for (const address of addresses) {
    console.log(`Address ${id} balance: ${await getBalance(address)}`)
    id++
  }
}
const printMemos = (memos) => {
  memos.forEach(({ from, timestamp, name, message }) => {
    console.log(
      `At: ${timestamp} \n From: ${from} \n Name: ${name} \n Message: ${message}`
    )
  })
}
async function main() {
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners()

  const buyMeACoffee = await (
    await hre.ethers.getContractFactory('BuyMeACoffee')
  ).deploy()

  await buyMeACoffee.deployed()
  console.log(`Deployed BuyMeACoffee at ${buyMeACoffee.address}`)

  await printBalances([owner.address, tipper.address, buyMeACoffee.address])

  console.log('👇Bought Coffee👇')

  const tip = { value: hre.ethers.utils.parseEther('1') }
  await buyMeACoffee
    .connect(tipper)
    .buyCoffee('Tipper1', 'hello from tipper 1', tip)
  await buyMeACoffee
    .connect(tipper2)
    .buyCoffee('Tipper2', 'hello from tipper 2', tip)
  await buyMeACoffee
    .connect(tipper3)
    .buyCoffee('Tipper3', 'hello from tipper3', tip)

  await printBalances([owner.address, tipper.address, buyMeACoffee.address])

  console.log('👇Withdraw tips👇')

  await buyMeACoffee.connect(owner).withDrawTips()

  await printBalances([owner.address, tipper.address, buyMeACoffee.address])

  console.log('👇Memos👇')

  const memos = await buyMeACoffee.getMemos()

  printMemos(memos)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
