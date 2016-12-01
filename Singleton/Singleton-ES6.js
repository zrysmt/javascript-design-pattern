let instance = null;
class mySingleton {
    constructor() {
        if (!instance) instance = this;
        return instance;
    }

    publicMethod() {
            console.log("The public can see me!");
        }
        //静态方法
    static getRandomNumber() {
        return 'hello';
    }
}

//静态属性
let mySingleton.publicProperty = "I am also public"

let singleton1 = new mySingleton();
let singleton2 = new mySingleton();

//========================================================================
class mySingleton {
    static getInstance() {
        if (!mySingleton.instance) {
            mySingleton.instance = new mySingleton();
        }
        return mySingleton.instance;
    }
    publicMethod() {
        console.log("The public can see me!");
    }
}

var cache = mySingleton.getInstance();
