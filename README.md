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

I've added test of blacklist and whitelist feature in main_test.js.

In step 7.1), 1B is sent to wallet D, wallet E and wallet F.
And then add wallet D and wallet F to blacklist.
In this case, balance of wallet D and wallet E should be same because wallet D is added to blacklist after transfer is occured.
Test result is good.

In step 7.2), 1B is sent to wallet D, wallet E and wallet F again.
And remove wallet F from blacklist.
Now since wallet D is blacklist wallet, so wallet D is excluded from reflection.
So balance of wallet D should be less than wallet E.
Test result is good.

In step 8, 1B is sent to wallet D and wallet F.
Since wallet F was removed from blacklist, so only wallet D is excluded from reflection.
So balance of wallet D should be less than wallet F.
Test result is good.

Totally, this contract's blacklist feature is working well.