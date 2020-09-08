 const path  = require("path");
require("./register")(path.resolve(__dirname), true, false);

exports.config =  {
    directConnect:true,
    capabilities: {
      browserName: 'chrome'
    },
  
    specs: ['./Tests/*.ts'],
    onPrepare : function(){
      browser.manage().window().maximize();
    },
  
    jasmineNodeOpts: {
      showColors: true,
    }
  };