/* global singleton:true */

var privateKeys = new Object(null);
singleton = new Object(null);
singleton.getInstance = function(key) {
  if (!privateKeys.hasOwnProperty(key)) {
    privateKeys[key] = new Object(null);
  }
  return privateKeys[key];
};
