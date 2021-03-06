// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Belt_Array = require("rescript/lib/js/belt_Array.js");

function mockAdminToReturn(_r, _param0) {
  ((_r.smocked.admin.will.return.with([_param0])));
  
}

function adminCalls(_r) {
  var array = _r.smocked.admin.calls;
  return Belt_Array.map(array, (function (param) {
                
              }));
}

function mockChainlinkOracleToReturn(_r, _param0) {
  ((_r.smocked.chainlinkOracle.will.return.with([_param0])));
  
}

function chainlinkOracleCalls(_r) {
  var array = _r.smocked.chainlinkOracle.calls;
  return Belt_Array.map(array, (function (param) {
                
              }));
}

function mockChangeAdminToReturn(_r) {
  ((_r.smocked.changeAdmin.will.return()));
  
}

function changeAdminCalls(_r) {
  var array = _r.smocked.changeAdmin.calls;
  return Belt_Array.map(array, (function (_m) {
                var admin = _m[0];
                return {
                        admin: admin
                      };
              }));
}

function mockGetLatestPriceToReturn(_r, _param0) {
  ((_r.smocked.getLatestPrice.will.return.with([_param0])));
  
}

function getLatestPriceCalls(_r) {
  var array = _r.smocked.getLatestPrice.calls;
  return Belt_Array.map(array, (function (param) {
                
              }));
}

function mockOracleDecimalsToReturn(_r, _param0) {
  ((_r.smocked.oracleDecimals.will.return.with([_param0])));
  
}

function oracleDecimalsCalls(_r) {
  var array = _r.smocked.oracleDecimals.calls;
  return Belt_Array.map(array, (function (param) {
                
              }));
}

function mockUpdatePriceToReturn(_r, _param0) {
  ((_r.smocked.updatePrice.will.return.with([_param0])));
  
}

function updatePriceCalls(_r) {
  var array = _r.smocked.updatePrice.calls;
  return Belt_Array.map(array, (function (param) {
                
              }));
}

var uninitializedValue;

exports.uninitializedValue = uninitializedValue;
exports.mockAdminToReturn = mockAdminToReturn;
exports.adminCalls = adminCalls;
exports.mockChainlinkOracleToReturn = mockChainlinkOracleToReturn;
exports.chainlinkOracleCalls = chainlinkOracleCalls;
exports.mockChangeAdminToReturn = mockChangeAdminToReturn;
exports.changeAdminCalls = changeAdminCalls;
exports.mockGetLatestPriceToReturn = mockGetLatestPriceToReturn;
exports.getLatestPriceCalls = getLatestPriceCalls;
exports.mockOracleDecimalsToReturn = mockOracleDecimalsToReturn;
exports.oracleDecimalsCalls = oracleDecimalsCalls;
exports.mockUpdatePriceToReturn = mockUpdatePriceToReturn;
exports.updatePriceCalls = updatePriceCalls;
/* No side effect */
