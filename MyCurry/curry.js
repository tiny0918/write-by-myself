// function add(x, y, z) {
//     return x + y + z
// }
//假如有一个函数，接受多个参数，那么一般来说就是一次性传入所有参数并执行。
//而对其执行柯里化后，就变成了可以分多次接收参数。
// add(1,2,3) ==> add(1)(2)(3) or add(1,2)(3) or add(1)(2,3) or add(1,2,3)

//实现函数柯里化
//第一步
function curryAdd(x) {
    return function (y) {
        return function (z) {
            return x + y + z
        }
    }
}
add(1)(2)(3)
//存在的问题：
//1、参数个数固定；
//2、与函数具体功能（在这里就是执行加法）有关的
//3、对于函数执行时机的判断，是根据是否有参数传入，但更合理的依据是原函数可以接受的参数的总数。

//第二步:用arguments or 参数收集(...args)来接受任意个数的参数（问题一）
function curryAdd() {
    let argsArr = []
    return function inner() {
        let args = Array.prototype.slice.call(arguments)
        if (args.length > 0) {
            argsArr = argsArr.concat(args)
            return inner //or return arguments.callee
        }
        //参数为空时才会执行加法操作，导致最后必须以参数为空形式调用一次
        return argsArr.reduce((total, current) => total + current)
    }
}
curryAdd()(1)(2)(3)(4)()
//存在的问题：
//1、与函数具体功能（在这里就是执行加法）有关的
//2、对于函数执行时机的判断，是根据是否有参数传入，但更合理的依据是原函数可以接受的参数的总数。

//第三步：只要让 getCurriedAdd 接受一个函数作为参数,实现一个通用的柯里化函数了（问题2）
function currying(fn) {
    let argsArr = []
    return function inner(...args) {
        if (args.length > 0) {
            argsArr = argsArr.concat(args)
            return inner //or return arguments.callee
        }
        //参数为空时才会执行加法操作，导致最后必须以参数为空形式调用一次
        return fn(...argsArr)
    }
}
function multiply(...args) {
    return args.reduce((total, current) => total * current)
}
currying(multiply)(1)(2)(3)()
//存在的问题：
//1、对于函数执行时机的判断，是根据是否有参数传入

//第四步：函数名的 length 属性就是该函数接受的参数个数(假设函数明确入参)（问题3）
function currying(fn) {
    let argsArr = []
    let maxLength = fn.length
    return function inner(...args) {
        argsArr = argsArr.concat(args)
        if (argsArr.length < maxLength) {
            return inner //or return arguments.callee
        }
        //参数为空时才会执行加法操作，导致最后必须以参数为空形式调用一次
        return fn(...argsArr)
    }
}
//入参函数必须是确定参数的函数
function multiply(x, y, z) {
    return x * y * z
}
//传入该函数的参数也必须符合要求
currying(multiply)(1)(2)(3)
//存在的问题：
//1、入参函数必须是确定参数的函数，
//2、传入该函数的参数也必须符合要求

//终极解决方案:
//方法一：一句话函数柯里化
const curry = (fn, args = []) =>
    fn.length === args.length
        ? fn(...args)
        : (...args1) => curry(fn, [...args, ...args1])
//方法二：可读性强一点
function currying(fn, args = []) {
    if (fn.length === args.length) return fn(...args)
    return function(...argOhers){
        return currying(fn,[...args,...argOhers])
    }
}
//存在的问题：
//1、入参函数必须是确定参数的函数，
//2、传入该函数的参数也必须符合要求
