// 单例模式
var mySingleton = (function() {
    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton

        // Private methods and variables
        function privateMethod() {
            console.log("I am private");
        }

        var privateVariable = "Im also private";

        var privateRandomNumber = Math.random();

        return {

            // Public methods and variables
            publicMethod: function() {
                console.log("The public can see me!");
            },

            publicProperty: "I am also public",

            getRandomNumber: function() {
                return privateRandomNumber;
            }

        };

    };

    return {

        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function() {

            if (!instance) {
                instance = init();
            }

            return instance;
        }

    };

})();


//==============================================================
//Singleton 和静态实例
var SingletonTester = (function() {

    // options: an object containing configuration options for the singleton
    // e.g var options = { name: "test", pointX: 5};
    function Singleton(options) {

        // set options to the options supplied
        // or an empty object if none are provided
        options = options || {};

        // set some properties for our singleton
        this.name = "SingletonTester";

        this.pointX = options.pointX || 6;

        this.pointY = options.pointY || 10;

    }

    // our instance holder
    var instance;

    // an emulation of static variables and methods
    var _static = {
        name: "SingletonTester",
        // Method for getting an instance. It returns
        // a singleton instance of a singleton object
        getInstance: function(options) {
            if (instance === undefined) {
                instance = new Singleton(options);
            }

            return instance;
        }
    };

    return _static;

})();

var singletonTest = SingletonTester.getInstance({
    pointX: 5
});

// Log the output of pointX just to verify it is correct
// Outputs: 5
console.log(singletonTest.pointX);
