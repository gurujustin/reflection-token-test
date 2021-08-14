## Reflection Token Test

I made mocha test for reflection token which randombytez created.

Of course, I made some change because there is no some feature such as excluded feature in his token.

-------------------------------------------------------------------------------------------------------

** install **
$ npm install(yarn install)
you have to install ganache and change test address in config file.

** start **
$ truffle test

///////////////////////////////////////////////////////////////////////////////////////////////////////

I've added test of blacklist feature in main_test.js.

In step 7.1), 10% of wallet B is sent to wallet D and wallet E.
And then add wallet D to blacklist.
In this case, balance of wallet D and wallet E should be same because wallet D is added to blacklist after transfer is occured.
Test result is good.

In step 7.2), 10% of wallet B is sent to wallet D and wallet E again.
Now since wallet D is blacklist wallet, wallet D is excluded from reflection.
So balance of wallet D and wallet E should be different.
Test result is good.

Totally, this contract's blacklist feature is working well.