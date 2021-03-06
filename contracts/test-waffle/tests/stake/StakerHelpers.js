// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var LetOps = require("../../library/LetOps.js");
var Helpers = require("../../library/Helpers.js");
var StakerSmocked = require("../../library/smock/StakerSmocked.js");

function deployAndSetupStakerToUnitTest(functionName, contracts, accounts) {
  return LetOps.AwaitThen.let_(Helpers.initialize(accounts.contents[0], true), (function (deployedContracts) {
                contracts.contents = deployedContracts;
                var match = contracts.contents;
                return LetOps.Await.let_(StakerSmocked.InternalMock.setupFunctionForUnitTesting(match.staker, functionName), (function (param) {
                              
                            }));
              }));
}

exports.deployAndSetupStakerToUnitTest = deployAndSetupStakerToUnitTest;
/* Helpers Not a pure module */
