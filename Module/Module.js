//模块模式

/*
The Module pattern      Module模式
Object literal notation 对象字面量表示法
AMD modules				
CommonJS modules		
ECMAScript Harmony modules
 */
/*********************************************************/
//1.对象字面量表示法
var myModule = {
    myProperty: "someValue",
    // object literals can contain properties and methods
    // e.g we can define a further object for module configuration:
    myConfig: {
        useCaching: true,
        language: "en"
    },
    // a very basic method
    myMethod: function() {
        console.log("Where in the world is Paul Irish today?");
    },
    // output a value based on the current configuration
    myMethod2: function() {
        console.log("Caching is:" + (this.myConfig.useCaching) ? "enabled" : "disabled");
    },
    // override the current configuration
    myMethod3: function(newConfig) {
        if (typeof newConfig === "object") {
            this.myConfig = newConfig;
            console.log(this.myConfig.language);
        }
    }
};
// Outputs: Where in the world is Paul Irish today?
myModule.myMethod();
// Outputs: enabled
myModule.myMethod2();
// Outputs: fr
myModule.myMethod3({
    language: "fr",
    useCaching: false
});
/*********************************************************/
//2.Module(模块)模式
//私有--IIFE模拟
var testModule = (function() {
    var counter = 0;
    return {

        incrementCounter: function() {
            return counter++;
        },

        resetCounter: function() {
            console.log("counter value prior to reset: " + counter);
            counter = 0;
        }
    };

})();

// Usage:

// Increment our counter
testModule.incrementCounter();

// Check the counter value and reset
// Outputs: 1
testModule.resetCounter();
/*********************************************************/
//3.Module(模块)模式变化
// 3.1 混入
// Global module
var myModule = (function(jQ, _) {
    function privateMethod1() {
        jQ(".container").html("test");
    }

    function privateMethod2() {
        console.log(_.min([10, 5, 100, 2, 1000]));
    }

    return {
        publicMethod: function() {
            privateMethod1();
        }
    };

    // Pull in jQuery and Underscore
}(jQuery, _));

myModule.publicMethod();
// 3.2 引出
// Global module对象
var myModule = (function() {
    // Module object
    var module = {},
        privateVariable = "Hello World";

    function privateMethod() {
        // ...
    }

    module.publicProperty = "Foobar";
    module.publicMethod = function() {
        console.log(privateVariable);
    };

    return module;
}());

/*********************************************************/
