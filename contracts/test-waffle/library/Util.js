// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';


var $$await = ((asyncFunction) => {
  let result = null;
  let waiting = true;
  asyncFunction().then((asyncResult) => {
    result = asyncResult
    waiting = false
  })

  while (waiting) {
  }
  return result
});

exports.$$await = $$await;
/* No side effect */
