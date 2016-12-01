// 混入模式
// Define a simple Car constructor
var Car = function(settings) {

    this.model = settings.model || "no model provided";
    this.color = settings.color || "no colour provided";

};

// Mixin
var Mixin = function() {};

Mixin.prototype = {

    driveForward: function() {
        console.log("drive forward");
    },

    driveBackward: function() {
        console.log("drive backward");
    },

    driveSideways: function() {
        console.log("drive sideways");
    }

};


// Extend an existing object with a method from another
function augment(receivingClass, givingClass) {

    // only provide certain methods
    if (arguments[2]) {
        for (var i = 2, len = arguments.length; i < len; i++) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    }
    // provide all methods
    else {
        for (var methodName in givingClass.prototype) {

            // check to make sure the receiving class doesn't
            // have a method of the same name as the one currently
            // being processed
            if (!Object.hasOwnProperty(receivingClass.prototype, methodName)) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }

            // Alternatively:
            // if ( !receivingClass.prototype[methodName] ) {
            // receivingClass.prototype[methodName] =givingClass.prototype[methodName];
            // }
        }
    }
}


// Augment the Car constructor to include "driveForward" and "driveBackward"
// 只混入两个方法
augment(Car, Mixin, "driveForward", "driveBackward");

// Create a new Car
var myCar = new Car({
    model: "Ford Escort",
    color: "blue"
});

// Test to make sure we now have access to the methods
myCar.driveForward();
myCar.driveBackward();

// Outputs:
// drive forward
// drive backward

// We can also augment Car to include all functions from our mixin
// by not explicitly listing a selection of them
augment(Car, Mixin);

var mySportsCar = new Car({
    model: "Porsche",
    color: "red"
});
mySportsCar.driveSideways();

// Outputs:
// drive sideways
