// 工厂模式
// Types.js ‐ Constructors used behind the scenes

// A constructor for defining new cars
function Car(options) {
    // some defaults
    this.doors = options.doors || 4;
    this.state = options.state || "brand new";
    this.color = options.color || "silver";

}

// A constructor for defining new trucks
function Truck(options) {
    this.state = options.state || "used";
    this.wheelSize = options.wheelSize || "large";
    this.color = options.color || "blue";
}


// FactoryExample.js

// Define a skeleton vehicle factory
function VehicleFactory() {}

// Define the prototypes and utilities for this factory

// Our default vehicleClass is Car
VehicleFactory.prototype.vehicleClass = Car;

// Our Factory method for creating new Vehicle instances
VehicleFactory.prototype.createVehicle = function(options) {

    if (options.vehicleType === "car") {
        this.vehicleClass = Car;
    } else {
        this.vehicleClass = Truck;
    }

    return new this.vehicleClass(options);

};

// Create an instance of our factory that makes cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
    vehicleType: "car",
    color: "yellow",
    doors: 6
});

// Test to confirm our car was created using the vehicleClass/prototype Car

// Outputs: true
console.log(car instanceof Car);

// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log(car);


//================================================================================
//抽象工厂
var AbstractVehicleFactory = (function() {

    // Storage for our vehicle types
    var types = {};

    return {
        getVehicle: function(type, customizations) {
            var Vehicle = types[type];
            return (Vehicle ? new Vehicle(customizations) : null);
        },

        registerVehicle: function(type, Vehicle) {
            var proto = Vehicle.prototype;
            // only register classes that fulfill the vehicle contract
            if (proto.drive && proto.breakDown) {
                types[type] = Vehicle;
            }

            return AbstractVehicleFactory;
        }
    };
})();

Car.prototype.drive = function(){}
Truck.prototype.drive = function(){}
Car.prototype.breakDown = function(){}
Truck.prototype.breakDown = function(){}

// Usage:

AbstractVehicleFactory.registerVehicle("car", Car);
AbstractVehicleFactory.registerVehicle("truck", Truck);

// Instantiate a new car based on the abstract vehicle type
var car2 = AbstractVehicleFactory.getVehicle("car", {
    color: "lime green",
    state: "like new"
});

// Instantiate a new truck in a similar manner
var truck2 = AbstractVehicleFactory.getVehicle("truck", {
    wheelSize: "medium",
    color: "neon yellow"
});

console.log(car2,truck2);