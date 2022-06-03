const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Buy Me a Coffee', function () {
  let buyMeACoffee, buyMeACoffeeFactory
  let owner
  let addr1
  let addr2
  let addrs
  beforeEach(async () => {
    buyMeACoffeeFactory = await ethers.getContractFactory('BuyMeACoffee')
    ;[owner, addr1, addr2, ...addrs] = await ethers.getSigners()
    buyMeACoffee = await buyMeACoffeeFactory.deploy()
  })

  describe('Deployment', () => {
    it('Should deploy the contract', async () => {
      expect(buyMeACoffee.address).to.exist
    })
    it('should set the right owner', async () => {
      expect(await buyMeACoffee.owner()).to.equal(owner.address)
    })
  })

  describe('Buy A Coffee', () => {
    it('should change owner', async () => {
      const changeOwner = await buyMeACoffee.changeOwner(addr1.address)
      expect(await buyMeACoffee.owner()).to.equal(addr1.address)
    })
    it('should not allow to change owner', async () => {
      console.log(await buyMeACoffee.owner(), addr1.address)
      await buyMeACoffee.connect(addr1).changeOwner(owner.address)
      console.log(await buyMeACoffee.owner())
      await expect(buyMeACoffee.changeOwner(addr1.address)).to.be.revertedWith(
        'You do not have permission to do that'
      )
    })
    // it('should buy a coffee', async () => {
    //   const balanceBefore = await buyMeACoffee.balanceOf(owner.address)
    //   const tx = await buyMeACoffee.buy({ value: ethers.utils.parseEther('1') })
    //   const balanceAfter = await buyMeACoffee.balanceOf(owner.address)
    //   expect(balanceAfter.sub(balanceBefore)).to.equal(
    //     ethers.utils.parseEther('1')
    //   )
    // })
    // it('should not buy a coffee if the value is not enough', async () => {
    //   const balanceBefore = await buyMeACoffee.balanceOf(owner.address)
    //   const tx = await buyMeACoffee.buy({
    //     value: ethers.utils.parseEther('0.5'),
    //   })
    //   const balanceAfter = await buyMeACoffee.balanceOf(owner.address)
    //   expect(balanceAfter.sub(balanceBefore)).to.equal(
    //     ethers.utils.parseEther('0')
    //   )
    // })
  })
})
