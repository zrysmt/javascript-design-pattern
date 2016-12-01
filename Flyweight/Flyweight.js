//享元模式

//在js模拟存虚拟的继承，类似java中的implements
Function.prototype.implementsFor = function(parentClassOrObject) {
    if (parentClassOrObject.constructor === Function) {
        this.prototype = new parentClassOrObject();
        this.prototype.consturctor = this;
        this.prototype.parent = parentClassOrObject.prototype;
    }else {
        //纯虚拟继承
        this.prototype = parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject;
    }
}

// Flyweight object 享元对象
var CoffeeOrder = {
    // Interfaces 接口
    serveCoffee: function(context) {},
    getFlavor: function() {}
};


// ConcreteFlyweight object that creates ConcreteFlyweight 具体享元对象
// Implements CoffeeOrder
function CoffeeFlavor(newFlavor) {

    var flavor = newFlavor;

    // If an interface has been defined for a feature
    // implement the feature
    if (typeof this.getFlavor === "function") {
        this.getFlavor = function() {
            return flavor;
        };
    }

    if (typeof this.serveCoffee === "function") {
        this.serveCoffee = function(context) {
            console.log("Serving Coffee flavor " + flavor + " to table number " + context.getTable());
        };
    }

}


// Implement interface for CoffeeOrder 实现接口
CoffeeFlavor.implementsFor(CoffeeOrder);


// Handle table numbers for a coffee order
// tableNumber 订单数 辅助器
function CoffeeOrderContext(tableNumber) {
    return {
        getTable: function() {
            return tableNumber;
        }
    };
}

//享元工厂对象
//创建并管理flyweight对象
function CoffeeFlavorFactory() {
    var flavors = {},
        length = 0;

    return {
        getCoffeeFlavor: function(flavorName) {
            //这是个单例模式
            var flavor = flavors[flavorName];
            if (flavor === undefined) {
                flavor = new CoffeeFlavor(flavorName);//创建flyweight对象
                flavors[flavorName] = flavor;
                length++;
            }
            return flavor;
        },

        getTotalCoffeeFlavorsMade: function() {
            return length;
        }
    };
}

// Sample usage: 测试
testFlyweight()

function testFlyweight() {
    // The flavors ordered. 已订购的flavors
    var flavors = new CoffeeFlavor(),
        // The tables for the orders. 
        tables = new CoffeeOrderContext(),
        // Number of orders made 订单数量
        ordersMade = 0,
        // The CoffeeFlavorFactory instance
        flavorFactory;
    //flavorIn 订单物的名称
    function takeOrders(flavorIn, table) {
        flavors[ordersMade] = flavorFactory.getCoffeeFlavor(flavorIn);
        //flavorFactory管理者创建好后(管理者也做了处理)返回给CoffeeFlavor
        tables[ordersMade++] = new CoffeeOrderContext(table);
    }

    flavorFactory = new CoffeeFlavorFactory();

    takeOrders("Cappuccino", 2);
    takeOrders("Cappuccino", 2);
    takeOrders("Frappe", 1);
    takeOrders("Frappe", 1);
    takeOrders("Xpresso", 1);
    takeOrders("Frappe", 897);
    takeOrders("Cappuccino", 97);
    takeOrders("Cappuccino", 97);
    takeOrders("Frappe", 3);
    takeOrders("Xpresso", 3);
    takeOrders("Cappuccino", 3);
    takeOrders("Xpresso", 96);
    takeOrders("Frappe", 552);
    takeOrders("Cappuccino", 121);
    takeOrders("Xpresso", 121);

    for (var i = 0; i < ordersMade; ++i) {
        flavors[i].serveCoffee(tables[i]);
    }
    console.log(" ");
    console.log("total CoffeeFlavor objects made: " + flavorFactory.getTotalCoffeeFlavorsMade());
}
