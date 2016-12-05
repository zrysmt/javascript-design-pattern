//装饰者模式

class MacBook {
    cost() {
        return 997;
    }
    screenSize() {
        return 11.6;
    }
}

function Memory(macbook) {

    let v = macbook.cost();
    macbook.cost = function() {
        return v + 75;
    };

}

// Decorator 2
function Engraving(macbook) {

    let v = macbook.cost();
    macbook.cost = function() {
        return v + 200;
    };

}

// Decorator 3
function Insurance(macbook) {

    let v = macbook.cost();
    macbook.cost = function() {
        return v + 250;
    };

}

let mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);

// Outputs: 1522
console.log(mb.cost());
// Outputs: 11.6
console.log(mb.screenSize());