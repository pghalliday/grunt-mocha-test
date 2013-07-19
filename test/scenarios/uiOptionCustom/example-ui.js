var Mocha = module.parent.require("mocha");
module.exports = function (suite){
  suite.on('pre-require', function(context){
    context.test = function (fn){
      suite.addTest(new Mocha.Test("stupid test", fn));
    };
    context.check = function (a, b){
      if(a !== b){
        throw ("Error "+ a + "!=" + b);
      }
    };
  });
};
Mocha.interfaces["example-ui"] = module.exports;