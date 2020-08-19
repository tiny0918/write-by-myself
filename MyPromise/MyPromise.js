function MyPromise(executor) {
    this.state = 'pending'
    this.rescbs = []
    this.rejcbs = []
    function resolve(){

    }
    function reject(){

    }
    executor(resolve,reject)
}
MyPromise.prototype.then = function(rescb,rejcb){
    
}
MyPromise.prototype.catch = function(){

}
MyPromise.prototype.finally = function(){

}
MyPromise.all = function() {
    
}
MyPromise.race = function() {

}
MyPromise.resolve = function() {

}
MyPromise.reject = function() {

}
module.exports = MyPromsie