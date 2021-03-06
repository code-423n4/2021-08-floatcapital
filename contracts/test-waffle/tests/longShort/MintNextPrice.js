// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Chai = require("../../bindings/chai/Chai.js");
var LetOps = require("../../library/LetOps.js");
var Globals = require("../../library/Globals.js");
var Helpers = require("../../library/Helpers.js");
var Contract = require("../../library/Contract.js");
var CONSTANTS = require("../../CONSTANTS.js");
var LongShortSmocked = require("../../library/smock/LongShortSmocked.js");

function testIntegration(contracts, accounts) {
  describe("mintLongNextPrice", (function () {
          it("should work as expected happy path", (function () {
                  var testUser = accounts.contents[8];
                  var amountToNextPriceMint = Helpers.randomTokenAmount(undefined);
                  var match = contracts.contents;
                  var longShort = match.longShort;
                  var match$1 = match.markets[0];
                  var marketIndex = match$1.marketIndex;
                  var longSynth = match$1.longSynth;
                  var oracleManager = match$1.oracleManager;
                  var paymentToken = match$1.paymentToken;
                  return LetOps.AwaitThen.let_(longShort.marketSideValueInPaymentToken(marketIndex, true), (function (_longValueBefore) {
                                return LetOps.AwaitThen.let_(paymentToken.mint(testUser.address, amountToNextPriceMint), (function (param) {
                                              return LetOps.AwaitThen.let_(paymentToken.connect(testUser).approve(longShort.address, amountToNextPriceMint), (function (param) {
                                                            return LetOps.AwaitThen.let_(longShort.connect(testUser).mintLongNextPrice(marketIndex, amountToNextPriceMint), (function (param) {
                                                                          return LetOps.AwaitThen.let_(oracleManager.getLatestPrice(), (function (previousPrice) {
                                                                                        var nextPrice = Globals.div(Globals.mul(previousPrice, Globals.bnFromInt(12)), Globals.bnFromInt(10));
                                                                                        return LetOps.AwaitThen.let_(oracleManager.setPrice(nextPrice), (function (param) {
                                                                                                      return LetOps.AwaitThen.let_(longShort.updateSystemState(marketIndex), (function (param) {
                                                                                                                    return LetOps.AwaitThen.let_(longSynth.balanceOf(testUser.address), (function (usersBalanceBeforeSettlement) {
                                                                                                                                  return LetOps.AwaitThen.let_(longShort.connect(testUser).mintLongNextPrice(marketIndex, Globals.bnFromInt(0)), (function (param) {
                                                                                                                                                return LetOps.AwaitThen.let_(longSynth.balanceOf(testUser.address), (function (usersUpdatedBalance) {
                                                                                                                                                              Chai.bnEqual("Balance after price system update but before user settlement should be the same as after settlement", usersBalanceBeforeSettlement, usersUpdatedBalance);
                                                                                                                                                              return LetOps.Await.let_(Contract.LongShortHelpers.getSyntheticTokenPrice(longShort, marketIndex, true), (function (longTokenPrice) {
                                                                                                                                                                            var expectedNumberOfTokensToRecieve = Globals.div(Globals.mul(amountToNextPriceMint, CONSTANTS.tenToThe18), longTokenPrice);
                                                                                                                                                                            return Chai.bnEqual("balance is incorrect", expectedNumberOfTokensToRecieve, usersUpdatedBalance);
                                                                                                                                                                          }));
                                                                                                                                                            }));
                                                                                                                                              }));
                                                                                                                                }));
                                                                                                                  }));
                                                                                                    }));
                                                                                      }));
                                                                        }));
                                                          }));
                                            }));
                              }));
                }));
          
        }));
  
}

function testUnit(contracts, accounts) {
  describe("mintNextPrice external functions", (function () {
          var amount = Helpers.randomTokenAmount(undefined);
          var setup = function (param) {
            return LongShortSmocked.InternalMock.setup(contracts.contents.longShort);
          };
          describe("mintLongNextPrice", (function () {
                  it("calls _mintNextPrice with isLong==true", (function () {
                          return LetOps.Await.let_(setup(undefined), (function (param) {
                                        return LetOps.Await.let_(LongShortSmocked.InternalMock.setupFunctionForUnitTesting(contracts.contents.longShort, "mintLongNextPrice"), (function (param) {
                                                      return LetOps.Await.let_(contracts.contents.longShort.mintLongNextPrice(1, amount), (function (param) {
                                                                    var mintNextPriceCalls = LongShortSmocked.InternalMock._mintNextPriceCalls(undefined);
                                                                    return Chai.recordArrayDeepEqualFlat(undefined, mintNextPriceCalls, [{
                                                                                  marketIndex: 1,
                                                                                  amount: amount,
                                                                                  isLong: true
                                                                                }]);
                                                                  }));
                                                    }));
                                      }));
                        }));
                  
                }));
          describe("mintShortNextPrice", (function () {
                  it("calls _mintNextPrice with isLong==false", (function () {
                          return LetOps.Await.let_(setup(undefined), (function (param) {
                                        return LetOps.Await.let_(LongShortSmocked.InternalMock.setupFunctionForUnitTesting(contracts.contents.longShort, "mintShortNextPrice"), (function (param) {
                                                      return LetOps.Await.let_(contracts.contents.longShort.mintShortNextPrice(1, amount), (function (param) {
                                                                    var mintNextPriceCalls = LongShortSmocked.InternalMock._mintNextPriceCalls(undefined);
                                                                    return Chai.recordArrayDeepEqualFlat(undefined, mintNextPriceCalls, [{
                                                                                  marketIndex: 1,
                                                                                  amount: amount,
                                                                                  isLong: false
                                                                                }]);
                                                                  }));
                                                    }));
                                      }));
                        }));
                  
                }));
          
        }));
  describe("mintNextPrice internal function", (function () {
          var marketUpdateIndex = Helpers.randomInteger(undefined);
          var amount = Helpers.randomTokenAmount(undefined);
          var setup = function (isLong, testWallet) {
            return LetOps.AwaitThen.let_(LongShortSmocked.InternalMock.setup(contracts.contents.longShort), (function (param) {
                          return LetOps.AwaitThen.let_(LongShortSmocked.InternalMock.setupFunctionForUnitTesting(contracts.contents.longShort, "_mintNextPrice"), (function (param) {
                                        return LetOps.AwaitThen.let_(contracts.contents.longShort.setMintNextPriceGlobals(1, marketUpdateIndex), (function (param) {
                                                      var longShort = contracts.contents.longShort.connect(testWallet);
                                                      return longShort._mintNextPriceExposed(1, amount, isLong);
                                                    }));
                                      }));
                        }));
          };
          var testMarketSide = function (isLong) {
            it("calls the executeOutstandingNextPriceSettlements modifier", (function () {
                    var testWallet = accounts.contents[1];
                    return LetOps.Await.let_(setup(isLong, testWallet), (function (param) {
                                  var executeOutstandingNextPriceSettlementsCalls = LongShortSmocked.InternalMock._executeOutstandingNextPriceSettlementsCalls(undefined);
                                  return Chai.recordArrayDeepEqualFlat(undefined, executeOutstandingNextPriceSettlementsCalls, [{
                                                user: testWallet.address,
                                                marketIndex: 1
                                              }]);
                                }));
                  }));
            it("emits the NextPriceDeposit event", (function () {
                    var testWallet = accounts.contents[1];
                    return Chai.callEmitEvents(setup(isLong, testWallet), contracts.contents.longShort, "NextPriceDeposit").withArgs(1, isLong, amount, testWallet.address, Globals.add(marketUpdateIndex, Globals.oneBn));
                  }));
            it("calls depositFunds with correct parameters", (function () {
                    var testWallet = accounts.contents[1];
                    return LetOps.Await.let_(setup(isLong, testWallet), (function (param) {
                                  var depositFundsCalls = LongShortSmocked.InternalMock._transferPaymentTokensFromUserToYieldManagerCalls(undefined);
                                  return Chai.recordArrayDeepEqualFlat(undefined, depositFundsCalls, [{
                                                marketIndex: 1,
                                                amount: amount
                                              }]);
                                }));
                  }));
            it("updates the correct state variables with correct values", (function () {
                    var testWallet = accounts.contents[1];
                    return LetOps.AwaitThen.let_(setup(isLong, testWallet), (function (param) {
                                  return LetOps.AwaitThen.let_(contracts.contents.longShort.batched_amountPaymentToken_deposit(1, isLong), (function (updatedBatchedAmountOfTokens_deposit) {
                                                return LetOps.AwaitThen.let_(contracts.contents.longShort.userNextPrice_paymentToken_depositAmount(1, isLong, testWallet.address), (function (updatedUserNextPriceDepositAmount) {
                                                              return LetOps.Await.let_(contracts.contents.longShort.userNextPrice_currentUpdateIndex(1, testWallet.address), (function (updateduserNextPrice_currentUpdateIndex) {
                                                                            Chai.bnEqual("batched_amountPaymentToken_deposit not updated correctly", updatedBatchedAmountOfTokens_deposit, amount);
                                                                            Chai.bnEqual("userNextPriceDepositAmount not updated correctly", updatedUserNextPriceDepositAmount, amount);
                                                                            return Chai.bnEqual("userNextPrice_currentUpdateIndex not updated correctly", updateduserNextPrice_currentUpdateIndex, Globals.add(marketUpdateIndex, Globals.oneBn));
                                                                          }));
                                                            }));
                                              }));
                                }));
                  }));
            
          };
          describe("long", (function () {
                  return testMarketSide(true);
                }));
          describe("short", (function () {
                  return testMarketSide(false);
                }));
          
        }));
  
}

exports.testIntegration = testIntegration;
exports.testUnit = testUnit;
/* Chai Not a pure module */
