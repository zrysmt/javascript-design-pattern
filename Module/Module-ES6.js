function Module(container) {
    return new class {
        get container() {
            return container;
        }

        init() {
            this.container.innerHTML = 'ES6 module';
        }
    }
}

export default Module;

/*********************************************************/
let privateName = Symbol('privateName');//利用Symbol做成私有的变量
//直接用class类
class MyModule {

    set container(value) {
        this.value = value;
    }

    get container() {
        return this.value;
    }

    init() {
        this.value = 'ES6 module';
    }

    [privateName](){
      console.log("hi");
    }
}


//usage
let m = new MyModule();
m.container = "hello";
console.log(m.container);
m.privateName();
