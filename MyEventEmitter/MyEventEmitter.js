function MyEventEmitter(){
    this.events = {}
}
MyEventEmitter.prototype.on = function(type,cb){

}
MyEventEmitter.prototype.emit = function(type){

}
module.exports = MyEventEmitter