function MyEventEmitter() {
    this.events = {}
}
MyEventEmitter.prototype.on = function (eventName, listner) {
    if (!this.events[eventName]) {
        this.events[eventName] = []
    }
    this.events[eventName].push(listner)
}
MyEventEmitter.prototype.addEventListner = MyEventEmitter.prototype.on

MyEventEmitter.prototype.off = function (eventName, listnerOff) {
    if (this.events[eventName]) {
        this.events[eventName].filter((listner) => listner !== listnerOff)
    }
}
//?????
MyEventEmitter.prototype.once = function (eventName, listnerOnce) {
    const wrapListnerOnce = function(...args){
        listnerOnce.apply(this,args)
        this.off(eventName,wrapListnerOnce)
    }
    this.on(eventName,wrapListnerOnce)
}

MyEventEmitter.prototype.emit = function (eventName, ...args) {
    if (this.events[eventName]) {
        this.events[eventName].forEach((listner) => listner(...args))
    }
}

module.exports = MyEventEmitter
