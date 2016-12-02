//工厂模式使用ES6实现

//工厂
class VehicleFactory {
    constructor() {
        this.vehicleClass = Car;
    }
    createVehicle(options) {
        if (options.vehicleType === "car") {
            this.vehicleClass = Car;
        } else {
            this.vehicleClass = Truck;
        }
        return new this.vehicleClass(options);
    }
}

class Car {
    constructor(options) {
        // some defaults
        options = options || "";
        this.doors = options.doors || 4;
        this.state = options.state || "brand new";
        this.color = options.color || "silver";
    }
}


class Truck {
    constructor(options) {
        this.state = options.state || "used";
        this.wheelSize = options.wheelSize || "large";
        this.color = options.color || "blue";
    }
}

//usage 
let carFactory = new VehicleFactory();
let car = carFactory.createVehicle({
    vehicleType: "car",
    color: "yellow",
    doors: 6
});

// Test to confirm our car was created using the vehicleClass/prototype Car

// Outputs: true
console.log(car instanceof Car);

// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log(car);



//===================================================================
//抽象工厂
class AbstractVehicleFactory {
    constructor() {
    	this.types = {};  //存储对象
    }
    getVehicle(type, customizations) {
        let Vehicle = this.types[type];
        return (Vehicle ? new Vehicle(customizations) : null);
    }

    registerVehicle(type, Vehicle) {
        let proto = Vehicle.prototype;
        // only register classes that fulfill the vehicle contract
        // if (proto.drive && proto.breakDown) {
            this.types[type] = Vehicle;
        // }

        return AbstractVehicleFactory;
    }
}
let abstractVehicleFactory = new AbstractVehicleFactory();

abstractVehicleFactory.registerVehicle("car", Car);
abstractVehicleFactory.registerVehicle("truck", Truck);

// Instantiate a new car based on the abstract vehicle type
var car2 = abstractVehicleFactory.getVehicle("car", {
    color: "lime green",
    state: "like new"
});

// Instantiate a new truck in a similar manner
var truck2 = abstractVehicleFactory.getVehicle("truck", {
    wheelSize: "medium",
    color: "neon yellow"
});



console.log(car2,truck2);

console.log(abstractVehicleFactory);
console.log(Object.getPrototypeOf(abstractVehicleFactory));