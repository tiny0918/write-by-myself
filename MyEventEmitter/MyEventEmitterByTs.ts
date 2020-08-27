class EventEmitterTs {
    event: {
        [eventName: string]: Function[]
    }
    onceEvent: {
        [eventName: string]: Function[]
    }
    constructor() {
        this.event = {}
        this.onceEvent = {}
    }
    _bind(
        type: string,
        eventName: string,
        listner: Function,
        flag = false //是否优先调用
    ): EventEmitterTs {
        const event = type === 'on' ? this.event : this.onceEvent
        const listnerArr = this.event[eventName]
        if (!listnerArr) {
            event[eventName] = [listner]
        }
        if (!listnerArr.includes(listner)) {
            if (typeof listner === 'function') {
                flag
                    ? event[eventName].unshift(listner)
                    : event[eventName].push(listner)
            }
        }
        return this
    }
    on(eventName: string, listner: Function, flag = false): EventEmitterTs {
        return this._bind('on', eventName, listner, flag)
    }
    addEventListner(
        eventName: string,
        listner: Function,
        flag = false
    ): EventEmitterTs {
        return this.on(eventName, listner, flag)
    }
    once(eventName: string, listner: Function, flag = false): EventEmitterTs {
        return this._bind('once', eventName, listner, flag)
    }
    prependOnceListner(eventName: string, listner: Function): EventEmitterTs {
        return this.once(eventName, listner, true)
    }
    _perform(fnArr: Function[], ...args: any[]) {
        fnArr.forEach((listner) => {
            listner.apply(this, args)
        })
    }
    emit(eventName: string, ...args: any[]): boolean {
        const eventFns = this.event[eventName]
        const onceEventFns = this.onceEvent[eventName]
        let flag = false
        if (eventFns) {
            flag = true
            this._perform(eventFns, ...args)
        }
        if (onceEventFns) {
            flag = true
            this._perform(onceEventFns, ...args)
            delete this.onceEvent[eventName]
        }
        return flag
    }
    removeEventListner(eventName: string, listner: Function): EventEmitterTs {
        const eventFns = this.event[eventName]
        const onceEventFns = this.onceEvent[eventName]
        if (eventFns) {
            this.event[eventName] = eventFns.filter((fn) => fn !== listner)
        }
        if (onceEventFns) {
            this.onceEvent[eventName] = onceEventFns.filter(
                (fn) => fn !== listner
            )
        }
        return this
    }
    removeAllListner(eventName: string): EventEmitterTs {
        delete this.event[eventName]
        delete this.onceEvent[eventName]
        return this
    }
}
