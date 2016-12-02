//发布-订阅模式
/*
topics = {},
subUid = -1;
 */
class Pubsub {
	constructor(){
		this.subUid = 0; //订阅的id值
		this.topics = {};//存放所有订阅者
	}
    publish(topic, args) {
        if (!this.topics[topic]) {
            return false;
        }

        let subscribers = this.topics[topic],
            len = subscribers ? subscribers.length : 0;

        while (len--) {
            subscribers[len].func(topic, args);
        }

        return this;
    }

    subscribe(topic, func) {
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }

        let token = (++this.subUid).toString();
        this.topics[topic].push({
            token: token,
            func: func
        });
        return token;
    }
    unsubscribe(token) {
        for (let m in this.topics) {
            if (this.topics[m]) {
                for (let i = 0, j = this.topics[m].length; i < j; i++) {
                    if (this.topics[m][i].token === token) {
                        this.topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return this;
    }
}


//usage
let messageLogger = function(topics, data) {
    console.log("Logging: " + topics + ": " + data);
};
let pubsub = new Pubsub();

let subscription = pubsub.subscribe("inbox/newMessage", messageLogger);

// Publishers are in charge of publishing topics or notifications of
// interest to the application. e.g:

pubsub.publish("inbox/newMessage", "hello world!");