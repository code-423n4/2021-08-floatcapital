// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Chai = require("../../bindings/chai/Chai.js");
var LetOps = require("../../library/LetOps.js");
var Globals = require("../../library/Globals.js");
var Helpers = require("../../library/Helpers.js");
var CONSTANTS = require("../../CONSTANTS.js");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var StakerHelpers = require("./StakerHelpers.js");
var FloatTokenSmocked = require("../../library/smock/FloatTokenSmocked.js");
var Smock = require("@eth-optimism/smock");

function test(contracts, accounts) {
  describe("_mintFloat", (function () {
          var floatTokenSmockedRef = {
            contents: undefined
          };
          var floatCapitalAddressRef = {
            contents: CONSTANTS.zeroAddress
          };
          var user = Helpers.randomAddress(undefined);
          var floatToMint = Helpers.randomTokenAmount(undefined);
          var floatPercentage = Helpers.randomJsInteger(undefined) / 65536 | 0;
          Globals.before_once$p(function (param) {
                return LetOps.Await.let_(StakerHelpers.deployAndSetupStakerToUnitTest("_mintFloat", contracts, accounts), (function (param) {
                              var staker = contracts.contents.staker;
                              floatCapitalAddressRef.contents = contracts.contents.floatCapital_v0.address;
                              return LetOps.AwaitThen.let_(Smock.smockit(contracts.contents.floatToken), (function (floatTokenSmocked) {
                                            FloatTokenSmocked.mockMintToReturn(floatTokenSmocked);
                                            floatTokenSmockedRef.contents = floatTokenSmocked;
                                            return LetOps.AwaitThen.let_(staker.set_mintFloatParams(floatTokenSmocked.address, floatPercentage), (function (param) {
                                                          return staker._mintFloatExposed(user, floatToMint);
                                                        }));
                                          }));
                            }));
              });
          it("calls mint on floatToken for user for amount floatToMint", (function () {
                  return Chai.recordEqualFlat(Belt_Array.getExn(FloatTokenSmocked.mintCalls(floatTokenSmockedRef.contents), 0), {
                              _to: user,
                              amount: floatToMint
                            });
                }));
          it("calls mint on floatTokens for floatCapital for amount (floatToMint * floatPercentage) / 1e18", (function () {
                  return Chai.recordEqualFlat(Belt_Array.getExn(FloatTokenSmocked.mintCalls(floatTokenSmockedRef.contents), 1), {
                              _to: floatCapitalAddressRef.contents,
                              amount: Globals.div(Globals.mul(floatToMint, Globals.bnFromInt(floatPercentage)), CONSTANTS.tenToThe18)
                            });
                }));
          
        }));
  
}

exports.test = test;
/* Chai Not a pure module */
