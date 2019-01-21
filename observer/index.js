/*
* js注釋：
观察者模式(Observer)--发布-订阅模式(Publish/Subscribe):通常被用来实现事件处理系统
观察者设计模式定义了对象间的一种一对多的组合关系，以便一个对象的状态发生变化时，所有依赖于它的对象都得到通知并自动刷新。
该模式必须包含两个角色：观察者和被观察对象。观察者和被观察对象之间存在“观察”的逻辑关联，当被观察对象发生改变的时候，观察者就会观察到这样的变化，并且做出相应的响应。
*/

class PubSub{
  constructor(){
    this.handlers={}; //時間處理映射表
  }

  //訂閲
  subscribe(eventType,handler){
    var es6This=this;
    if(!(eventType in es6This.handlers)){
      es6This.handlers[eventType]=[];
    }
    es6This.handlers[eventType].push(handler);

    return es6This;
  }
  //發佈
  publish(eventType){
    var es6This=this;
    var handlerArgs=Array.from(arguments).slice(1);
    // var handlerArgs=Array.prototype.slice.call(arguments,1);
    var arrEventHandler=es6This.handlers[eventType]; //通知訂閲者
    for(var i=0;i<arrEventHandler.length;i++){
      arrEventHandler[i].apply(es6This,handlerArgs);
    }
    return es6This;
  }



}

var obj=new PubSub();

obj.subscribe('A',function(a,b,c,d){
  console.log(a+b+c+'+'+d);
});

obj.publish('A','aaa','bbb','ddd');
console.log(obj.handlers);

