// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Belt_Array = require("rescript/lib/js/belt_Array.js");

function mockDEFAULT_ADMIN_ROLEToReturn(_r, _param0) {
  ((_r.smocked.DEFAULT_ADMIN_ROLE.will.return.with([_param0])));
  
}

function dEFAULT_ADMIN_ROLECalls(_r) {
  var array = _r.smocked.DEFAULT_ADMIN_ROLE.calls;
  return Belt_Array.map(array, (function (param) {
                
              }));
}

function mockMINTER_ROLEToReturn(_r, _param0) {
  ((_r.smocked.MINTER_ROLE.will.return.with([_param0])));
  
}

function mINTER_ROLECalls(_r) {
  var array = _r.smocked.MINTER_ROLE.calls;
  return Belt_Array.map(array, (function (param) {
                
              }));
}

function mockPAUSER_ROLEToReturn(_r, _param0) {
  ((_r.smocked.PAUSER_ROLE.will.return.with([_param0])));
  
}

function pAUSER_ROLECalls(_r) {
  var array = _r.smocked.PAUSER_ROLE.calls;
  return Belt_Array.map(array, (function (param) {
                
              }));
}

function mockCreateSyntheticTokenToReturn(_r, _param0) {
  ((_r.smocked.createSyntheticToken.will.return.with([_param0])));
  
}

function createSyntheticTokenCalls(_r) {
  var array = _r.smocked.createSyntheticToken.calls;
  return Belt_Array.map(array, (function (param) {
                return {
                        syntheticName: param[0],
                        syntheticSymbol: param[1],
                        staker: param[2],
                        marketIndex: param[3],
                        isLong: param[4]
                      };
              }));
}

function mockLongShortToReturn(_r, _param0) {
  ((_r.smocked.longShort.will.return.with([_param0])));
  
}

function longShortCalls(_r) {
  var array = _r.smocked.longShort.calls;
  return Belt_Array.map(array, (function (param) {
                
              }));
}

var uninitializedValue;

exports.uninitializedValue = uninitializedValue;
exports.mockDEFAULT_ADMIN_ROLEToReturn = mockDEFAULT_ADMIN_ROLEToReturn;
exports.dEFAULT_ADMIN_ROLECalls = dEFAULT_ADMIN_ROLECalls;
exports.mockMINTER_ROLEToReturn = mockMINTER_ROLEToReturn;
exports.mINTER_ROLECalls = mINTER_ROLECalls;
exports.mockPAUSER_ROLEToReturn = mockPAUSER_ROLEToReturn;
exports.pAUSER_ROLECalls = pAUSER_ROLECalls;
exports.mockCreateSyntheticTokenToReturn = mockCreateSyntheticTokenToReturn;
exports.createSyntheticTokenCalls = createSyntheticTokenCalls;
exports.mockLongShortToReturn = mockLongShortToReturn;
exports.longShortCalls = longShortCalls;
/* No side effect */
