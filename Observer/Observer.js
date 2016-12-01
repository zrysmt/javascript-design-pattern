//观察者模式
/**
Subject: maintains a list of observers, facilitates adding or removing observers
Observer: provides a update interface for objects that need to be notified of a Subject's changes of state
ConcreteSubject: broadcasts notifications to observers on changes of state, stores the state of ConcreteObservers
ConcreteObserver: stores a reference to the ConcreteSubject, implements an update interface for the Observer to
ensure state is consistent with the Subject's
 */

function ObserverList() {
    this.observerList = [];
}

ObserverList.prototype.Add = function(obj) {
    return this.observerList.push(obj);
};
ObserverList.prototype.Empty = function() {
    this.observerList = [];
};
ObserverList.prototype.Count = function() {
    return this.observerList.length;
};
ObserverList.prototype.Get = function(index) {
    if (index > -1 && index < this.observerList.length) {
        return this.observerList[index];
    }
};
ObserverList.prototype.Insert = function(obj, index) {
    var pointer = -1;
    if (index === 0) {
        this.observerList.unshift(obj);
        pointer = index;
    } else if (index === this.observerList.length) {
        this.observerList.push(obj);
        pointer = index;
    }

    return pointer;
};
ObserverList.prototype.IndexOf = function(obj, startIndex) {
    var i = startIndex,
        pointer = -1;

    while (i < this.observerList.length) {
        if (this.observerList[i] === obj) {
            pointer = i;
        }
        i++;
    }

    return pointer;
};
ObserverList.prototype.RemoveAt = function(index) {
    if (index === 0) {
        this.observerList.shift();
    } else if (index === this.observerList.length - 1) {
        this.observerList.pop();
    }
};
// Extend an object with an extension
function extend(extension, obj) {
    for (var key in extension) {
        obj[key] = extension[key];
    }
}

/*******************************************************************/
//开始模拟
//Subject 目标
function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function(observer) {
    this.observers.Add(observer);
};

Subject.prototype.RemoveObserver = function(observer) {
    this.observers.RemoveAt(this.observers.IndexOf(observer, 0));
};
Subject.prototype.Notify = function(context) {
    var observerCount = this.observers.Count();
    for (var i = 0; i < observerCount; i++) {
        this.observers.Get(i).Update(context);
    }
};

//test
function Observer(){
	this.Update = function(context){
		this.checked = context;
	}
}
// References to our DOM elements

var controlCheckbox = document.getElementById("mainCheckbox"),
    addBtn = document.getElementById("addNewObserver"),
    container = document.getElementById("observersContainer");

// Concrete Subject 具体目标，状态改变时候，向Observer发送状态 checked是true或者false

// Extend the controlling checkbox with the Subject class
extend(new Subject(), controlCheckbox);//目标

// Clicking the checkbox will trigger notifications to its observers
controlCheckbox["onclick"] = new Function("controlCheckbox.Notify(controlCheckbox.checked)");


addBtn["onclick"] = AddNewObserver;

// Concrete Observer 具体观察者(实现Observer的更新接口，以使自己的状态和目标状态一致)

function AddNewObserver() {

    // Create a new checkbox to be added
    var check = document.createElement("input");
    check.type = "checkbox";

    // Extend the checkbox with the Observer class
    extend(new Observer(), check);//观察者

    // Override with custom update behaviour
    check.Update = function(value) {
        this.checked = value;
    };
 
    // Add the new observer to our list of observers
    // for our main subject
    controlCheckbox.AddObserver(check);

    // Append the item to the container
    container.appendChild(check);
}
