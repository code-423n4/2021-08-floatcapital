// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Chai = require("../../bindings/chai/Chai.js");
var LetOps = require("../../library/LetOps.js");
var Globals = require("../../library/Globals.js");
var Helpers = require("../../library/Helpers.js");
var CONSTANTS = require("../../CONSTANTS.js");
var StakerSmocked = require("../../library/smock/StakerSmocked.js");

function test(contracts, accounts) {
  var period = Helpers.randomInteger(undefined);
  describe("changeMarketLaunchIncentiveParameters (external)", (function () {
          var initialMultiplier = Helpers.randomInteger(undefined);
          var setup = function (param) {
            return LetOps.AwaitThen.let_(StakerSmocked.InternalMock.setup(contracts.contents.staker), (function (param) {
                          return LetOps.AwaitThen.let_(StakerSmocked.InternalMock.setupFunctionForUnitTesting(contracts.contents.staker, "changeMarketLaunchIncentiveParameters"), (function (param) {
                                        StakerSmocked.InternalMock.mock_changeMarketLaunchIncentiveParametersToReturn(undefined);
                                        return contracts.contents.staker.changeMarketLaunchIncentiveParameters(2, period, initialMultiplier);
                                      }));
                        }));
          };
          beforeEach(function () {
                return setup(undefined);
              });
          it.skip("calls the onlyAdminModifier", (function () {
                  
                }));
          it("calls _changeMarketLaunchIncentiveParameters with correct arguments", (function () {
                  return Chai.recordEqualFlat(StakerSmocked.InternalMock._changeMarketLaunchIncentiveParametersCalls(undefined)[0], {
                              marketIndex: 2,
                              period: period,
                              initialMultiplier: initialMultiplier
                            });
                }));
          it("emits MarketLaunchIncentiveParametersChanges event", (function () {
                  return Chai.callEmitEvents(setup(undefined), contracts.contents.staker, "MarketLaunchIncentiveParametersChanges").withArgs(2, period, initialMultiplier);
                }));
          
        }));
  describe("_changeMarketLaunchIncentiveParameters (internal)", (function () {
          var initialMultiplierFine = Helpers.randomInteger(undefined).mul(CONSTANTS.tenToThe18);
          var changeMarketLaunchIncentiveParametersCall = {
            contents: undefined
          };
          var setup = function (initialMultiplier) {
            return LetOps.Await.let_(Helpers.initialize(accounts.contents[0], true), (function (deployedContracts) {
                          contracts.contents = deployedContracts;
                          changeMarketLaunchIncentiveParametersCall.contents = deployedContracts.staker._changeMarketLaunchIncentiveParametersExposed(2, period, initialMultiplier);
                          
                        }));
          };
          describe("passing transaction", (function () {
                  beforeEach(function () {
                        return LetOps.AwaitThen.let_(setup(initialMultiplierFine), (function (param) {
                                      return changeMarketLaunchIncentiveParametersCall.contents;
                                    }));
                      });
                  it("mutates marketLaunchIncentive_period", (function () {
                          return LetOps.Await.let_(contracts.contents.staker.marketLaunchIncentive_period(2), (function (setPeriod) {
                                        return Chai.bnEqual(undefined, period, setPeriod);
                                      }));
                        }));
                  it("mutates marketLaunchIncentiveMultiplier", (function () {
                          return LetOps.Await.let_(contracts.contents.staker.marketLaunchIncentive_multipliers(2), (function (setMultiplier) {
                                        return Chai.bnEqual(undefined, initialMultiplierFine, setMultiplier);
                                      }));
                        }));
                  
                }));
          describe("failing transaction", (function () {
                  Globals.before_once$p(function (param) {
                        return setup(CONSTANTS.oneBn);
                      });
                  it("reverts if initialMultiplier < 1e18", (function () {
                          return LetOps.Await.let_(Chai.expectRevert(changeMarketLaunchIncentiveParametersCall.contents, "marketLaunchIncentiveMultiplier must be >= 1e18"), (function (param) {
                                        
                                      }));
                        }));
                  
                }));
          
        }));
  
}

exports.test = test;
/* Chai Not a pure module */
