const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(executor) {
    this._state = PENDING
    this._value = undefined
    this._resolvedcbs = []
    this._rejectedcbs = []
    function _resolve(value) {
        const run = ()=>{
            if (this._state !== PENDING) return
            this._state = FULFILLED
            this._value = value
            this._resolvedcbs.forEach((cb) => cb(value))
        }
        setTimeout(run);
    }
    function _reject(reson) {
        const run = ()=>{
            if (this._state !== PENDING) return
            this._state = REJECTED
            this._value = reason
            this._rejectedcbs.forEach((cb) => cb(reason))
        }
        setTimeout(run)
    }
    executor(_resolve, _reject)
}
MyPromise.prototype.then = function (resolvedcb, rejectedcb) {
    typeof resolvedcb !== 'function' ? (resolvedcb = (value) => value) : null
    typeof rejectedcb !== 'function'
        ? (rejectedcb = (value) => {
              throw new Error(reason instanceof Error ? reason.message : reason)
          })
        : null
    return new MyPromise((resolve, reject) => {
        const onFulfilledFn = (value) => {
            try {
                let x = resolvedcb(value)
                x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
            } catch (error) {
                reject(error)
            }
        }
        const onRejectedFn = (reason) => {
            try {
                let x = rejectedcb(reason)
                x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
            } catch (error) {
                rejected(error)
            }
        }
        if (this._state === PENDING) {
            this._resolvedcbs.push(onFulfilledFn)
            this._rejectedcbs.push(onRejectedFn)
        }
        if (this._state === FULFILLED) {
            onFulfilledFn(this._value)
        }
        if (this._state === REJECTED) {
            onRejectedFn(this._value)
        }
    })
}
MyPromise.prototype.catch = function (rejectedcb) {
    return this.then(null, rejectedcb)
}
MyPromise.prototype.finally = function (cb) {
    return this.then(
        (value) => MyPromise.resolve(cb()).then(() => value),
        (reason) =>
            MyPromise.resolve(cb()).then(() => {
                throw reason
            })
    )
}
MyPromise.all = function (promises) {
    return new MyPromise((resolve, reject) => {
        let count = 0
        let values = []
        let length = promises.lenth
        promises.forEach((promise, index) => {
            promise
                .then((value) => {
                    count++
                    values[index] = value
                    if (length === count) resolve(values)
                })
                .catch((err) => reject(err))
        })
    })
}
MyPromise.race = function (promises) {
    return new MyPromise((resolve, reject) => {
        promises.forEach((promise) => {
            promise.then(resolve, reject)
        })
    })
}
MyPromise.resolve = function (value) {
    if (value instanceof MyPromise) return value
    return new MyPromise((resolve) => resolve(value))
}
MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => reject(reason))
}
module.exports = MyPromsie
