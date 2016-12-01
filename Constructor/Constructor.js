//构造器模式

//==============================================================================
// Each of the following options will create a new empty object:
// 构造空对象
var newObject = {};
// or
var newObject = Object.create(null);
// or
var newObject = new Object();

/******************ES 3******************************/
// 1. Dot syntax

// Set properties
newObject.someKey = "Hello World";
// Get properties
var key = newObject.someKey;

// 2. Square bracket syntax

// Set properties
newObject["someKey"] = "Hello World";
// Get properties
var key = newObject["someKey"];

/******************ES 5******************************/
// 3.Object.defineProperty
Object.defineProperty(newObject, "someKey", {
    value: "for more control of the property's behavior",
    wirtable: true,
    enumerable: true,
    configurable: true
});

// 4.Object.defineProperties
// 设置属性
Object.defineProperties(newObject, {
    "someKey": {
        value: "Hello World",
        writable: true
    },
    "anotherKey": {
        value: "Foo bar",
        writable: false
    }
});


console.log(newObject);
//==============================================================================
// 1.基本的Constructor
function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;

    this.toString = function() {
        return this.model + " has done " + this.miles + " miles";
    };
}
// Usage:
// We can create new instances of the car
var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);

console.log(civic.toString());
console.log(mondeo.toString());
//继承比较困难

// 2.带原型的Constructor
function Car1(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
}

// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Car1.prototype.toString = function() {
    return this.model + " has done " + this.miles + " miles";
};
// Usage:
var civic = new Car1( "Honda Civic", 2009, 20000 );
var mondeo = new Car1( "Ford Mondeo", 2010, 5000 );
console.log( civic.toString() );
console.log( mondeo.toString() );

