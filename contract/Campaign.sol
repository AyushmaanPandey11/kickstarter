// SPDX-License-Identifier: MIT
pragma solidity ^0.4.17;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool isComplete;
        uint approvalCount;
        mapping(address=>bool)  approvals;
    }
    //variables
    
    address public manager;
    uint  public minContribution;
    Request[] public requests;
    mapping(address=>bool) public approvers;
    uint public approverCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint value) public {
        manager = msg.sender;
        minContribution= value;
    }

    function contribute() public payable {
        require(msg.value>minContribution);
        approverCount++;
        approvers[msg.sender]=true;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        Request memory newRequest =  Request({
            description:description,
            value:value,
            recipient:recipient,
            isComplete:false,
            approverCount=0;
        });
        requests.push(newRequest);
    }

    function approveRequest(uint reqIdx) public {
        Request storage request = requests[reqIdx];
        
        require(!request.isComplete);
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvalCount++;
        request.approvals[msg.sender]=true;
    }

    function finalizeRequest(uint reqIdx) public restricted {
        Request storage request = requests[reqIdx];
        
        require(!request.isComplete);
        require(this.balance>request.value);
        require(request.approvalCount> approverCount/2);

        request.isComplete=true;
        request.recipient.transfer(request.value);
    }

}