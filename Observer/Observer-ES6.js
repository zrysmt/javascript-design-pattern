/*Subject 目标*/
class Subject {
    addObserver() {
        throw new Error("This method must be overwritten!");
    }
    removeObserver() {
        throw new Error("This method must be overwritten!");    
    }
    notify() {
        throw new Error("This method must be overwritten!");
    }
}

class Observer {
    update() {
        throw new Error("This method must be overwritten!");
    }
}


//===============================================================================
//具体的对象
class ControlCheckbox extends Subject {
    constructor() {
        super();
        this.observers = [];
    }
    addObserver(observer){
        this.observers.push(observer);
    }
    notify(context) {
        let observerCount = this.observers.length;
        for (let i = 0; i < observerCount; i++) {
           this.observers[i].update(context);
        }
    }
}


//具体的观察者
class AddedCheckboxs extends Observer{
    constructor(subject){
        super();
        console.log(subject);
        this.subject = subject;
        // this.subject.addObserver(this);
    }
    update(context){
        this.checked = context;
    }
}

//main test
let addBtn = document.getElementById("addNewObserver"),
    container = document.getElementById("observersContainer"),
    controlCheckboxDom = document.getElementById("mainCheckbox");

let controlCheckbox = new ControlCheckbox();

controlCheckboxDom.onclick = function(){
    controlCheckbox.notify(controlCheckboxDom.checked);//通知了变化
}

addBtn.onclick = function(){
    var check = document.createElement("input");
    check.type = "checkbox";
    //新增的每一个都应该实现观察者
    console.info(controlCheckbox.observers);//查看是否添加上

    check.update = AddedCheckboxs.prototype.update;

    controlCheckbox.addObserver(check);//添加到观察者列表上去

    container.appendChild(check);
}
