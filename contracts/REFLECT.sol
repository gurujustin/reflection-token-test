pragma solidity 0.8.6;

// SPDX-License-Identifier: Unlicensed

contract DappToken {
    //  Name
    string public name = "DApp Token";

    //  Symbol
    string public symbol = "DAPP";

    //  Standard
    string public standard = "DApp Token v1.0";

    // totalSupply
    uint256 public totalSupply = 1000000000000000;

    uint256 public decimals = 18;

    //  allowance
    mapping(address => mapping(address => uint256)) public allowance;

    mapping(address => bool) private _isExcluded;

    uint256 private constant pointMultiplier = 10 ** 18;

    struct Account {
        uint256 balance;
        uint256 lastDividendPoints;
    }

    address public owner;

    mapping(address => Account) public accounts;

    uint256 private totalDividendPoints;

    uint256 private unclaimedDividends;

    uint256 private reflectionFee;

    uint256 private blackListAmount;

    mapping(address => bool) private isBlackListed;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    constructor () {
        owner = msg.sender;
        accounts[msg.sender].balance = totalSupply ;
        _isExcluded[msg.sender] = true;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    //  Transfer
    //  Exception if account doesnt have enough
    //  Return bool
    //  transfer event
    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can call");
        _;
    }

    function _transfer(address _from, address _to, uint256 _value) internal updateAccount(_from) updateAccount(_to) {
        if (_isExcluded[_from]) {
            reflectionFee = 0;
        } else {
            reflectionFee = 5;
        }
        uint256 rAmount = _value * reflectionFee / 100;
        uint256 amount = _value - rAmount;
        accounts[_from].balance -= _value;
        accounts[_to].balance += amount;
        disburse(rAmount);
        if (isBlackListed[_from]) {
            blackListAmount -= _value;
        }
        if (isBlackListed[_to]) {
            blackListAmount += amount;
        }

        emit Transfer(_from, _to, amount);
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(accounts[msg.sender].balance >= _value);

        _transfer(msg.sender, _to, _value);

        return true;
    }

    // approve
    function approve(address _spender, uint256 _value) public returns (bool success) {
        // allowance
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    //  transferFrom
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        //  Require _from has enough token
        require(_value <= accounts[_from].balance);
        //  Require allowance is big eough token
        require(_value <= allowance[_from][msg.sender]);
        //  update allowance
        allowance[_from][msg.sender] -= _value;

        _transfer(_from, _to, _value);
        //  return bool
        return true;
    }

    function dividendsOwing(address account) internal view returns (uint256) {
        if (isBlackListed[account]) {
            return 0;
        }
        uint256 newDividendPoints = totalDividendPoints - accounts[account].lastDividendPoints;
        return (accounts[account].balance * newDividendPoints) / pointMultiplier;
    }
    
    modifier updateAccount(address account) {
        uint256 owing = dividendsOwing(account);
        if (owing > 0) {
            unclaimedDividends -= owing;
            accounts[account].balance += owing;
            accounts[account].lastDividendPoints = totalDividendPoints;
        } else if (accounts[account].balance != 0) {
            accounts[account].lastDividendPoints = totalDividendPoints;
        }
        _;
    }

    function disburse(uint256 amount) private {
        totalDividendPoints += (amount * pointMultiplier / (totalSupply - blackListAmount));
        unclaimedDividends += amount;
    }

    function balanceOf(address account) public view returns (uint256){
        uint256 owing = dividendsOwing(account);
        return accounts[account].balance + owing;
    }

    function mint(address recipient, uint256 amount) public onlyOwner updateAccount(recipient) {
        accounts[recipient].balance += amount;
        totalSupply += amount;
    }

    function blackList(address user) public onlyOwner updateAccount(user) {
        if (!isBlackListed[user]) {
            isBlackListed[user] = true;
            blackListAmount += accounts[user].balance;
        }
    }

    function unBlackList(address user) public onlyOwner updateAccount(user) {
        if (isBlackListed[user]) {
            isBlackListed[user] = false;
            blackListAmount -= accounts[user].balance;
        }
    }
}