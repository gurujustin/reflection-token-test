Notes for running dev environment:

From reflect-project file:

$ npm install 
(maybe required) $ truffle install
(Now launche local ganache blockchain.  Should be installed with truffle)
$ ganache-cli -m "three elevator bus mutual celery belt priority mistake lemon supply dog time"

(open new terminal window and enter)
truffle test

(If all is well, truffle should run one test, and it should pass.  It just calls the name() function and compares the returned value with the expected value.)

////////////////////////////////////////////////////////////////////////////////////
Minting Test Notes:

What mint_test2.js does:

    Tests 1-5 transfer coins from the owner wallet(which owns all original coins) to walletB, walletC, and walletD.  These shouldn't accrue any tax because owner is exempt to them, and test 5 confirms that on walletB
    Tests 7-9 transfer coins between walletB and walletC, while checking the distribution in walletD.
    In test 7, walletB transfers 1 trillion coins to walletC.  Actual amount transferred is 950,000,000,000(950 billion), and this is confirmed by the event that is emitted.  This leaves 50 billion coins that were taken as the tax(5% of 1 trillion is 50 billion).  
    WalletD is the tested for it's percentage of overall coin ownership.  1 trillion coins in walletD, devided by 1 quadrillion overall, equals 0.1 percent.
    50 billion * 0.1 percent = 50 million.
    Add that back to the original balance, and you have 1,000,050,000,000

    With this, test 7 should return the balance of walletD with 1,000,050,000,000.  It is returning 1,000,050,002,500 (converted from hexidecimal)

    This is, of course, throwing off tests 8 and 9, which transfer 1 million coins between walletC and walletB, and check the reflection on walletD.
    
    1,000,050,002,500 is correct value.
    
    safemoon's reflection algorithm doesn't calculate exact value.
    it's a little different from expected value but the difference can be ignored since decimals is 9.
    Anyway, the totalsupply is at least the sum of wallet's balance.
