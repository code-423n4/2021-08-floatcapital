// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var ContractHelpers = require("../ContractHelpers.js");

var contractName = "SyntheticToken";

function at(contractAddress) {
  return ContractHelpers.attachToContract(contractName, contractAddress);
}

function make(name, symbol, longShort, staker, marketIndex, isLong) {
  return ContractHelpers.deployContract6(contractName, name, symbol, longShort, staker, marketIndex, isLong);
}

exports.contractName = contractName;
exports.at = at;
exports.make = make;
/* No side effect */
