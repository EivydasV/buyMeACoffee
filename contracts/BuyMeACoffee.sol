//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

//Deployed on 0xD6348E422985aC900c3Fa3aEd214413E76630BA0
contract BuyMeACoffee {
    address payable public owner;
    Memo[] public memos;

    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "You do not have permission to do that");
        _;
    }
    modifier onlySomeEther() {
        require(msg.value > 0, "You must send some ether");
        _;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    function changeOwner(address payable newOwner) public {
        owner = newOwner;
    }

    function buyCoffee(string memory _name, string memory _message)
        external
        payable
        onlySomeEther
    {
        memos.push(Memo(msg.sender, block.timestamp, _name, _message));
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    function withDrawTips() external onlyOwner {
        owner.transfer(address(this).balance);
    }

    function getMemos() external view returns (Memo[] memory) {
        return memos;
    }
}
