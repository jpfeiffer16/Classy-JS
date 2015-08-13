# Classy-JS

(Work in progress)

A wrapper for the revealing module pattern that attempts to solve the problem that arrises when your object gets big and you have to scroll to the bottom to see wich methods are 'revealed' or public.

For example:

``` javascript
[
  "private", {num: 0},
  "public", function SetNum(numToSet) {
    that.num = numToSet;
  },
  "public", function GetNum() {
    return that.num;
  }
].accessify();
```

Equates to:

``` javascript
function() {
  var num = 0;
  var SetNum = function(numToSet) {
    num = numToSet;
  };
  var GetNum = function() {
    return num;
  };
  return {
    SetNum: SetNum, GetNum: GetNum
  };
}();
```
