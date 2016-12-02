//装饰者模式
class Facade {
    _get() {
        console.log("current value:" + this.i);
    }
    _set(val) {
        this.i = val;
    }
    _run() {
        console.log("running");
    }
    _jump() {
        console.log("jumping");
    }

    facade(args) {
        this._set(args.val);
        this._get();
        if (args._run) {
            this._run();
        }
    }
}

let fa = new Facade();
fa.facade({ run: true, val: 10 });
