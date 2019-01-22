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

  //訂閲（事件類型+處理）
  subscribe(eventType,handler){
    var es6This=this;
    if(!(eventType in es6This.handlers)){
      es6This.handlers[eventType]=[];
    }
    es6This.handlers[eventType].push(handler);

    return es6This;
  }
  //發佈(事件類型+消息)
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
  //退訂（事件類型+處理）
  unsubscribe(eventType,handler){
    var es6This=this;
    if(es6This.handlers[eventType]){
      es6This.handlers[eventType]=es6This.handlers[eventType].filter(function(v){
        return (v!==handler);
      });
    }
    return es6This;
  }



} //class

var obj=new PubSub();

var xxx=function(){
  console.log('訂閲1xxx');
};
var yyy=function(a,b,c,d){
  console.log('訂閲2yyy'+' '+a+' '+b+c+d);
};

//訂閲事件A，處理函數分別為xxx和yyy
obj.subscribe('A',xxx);
obj.subscribe('A',yyy);

//發佈事件A，消息為'aaa','bbb','ddd'
obj.publish('A','aaa','bbb','ddd');

//取消訂閲事件A的xxx處理（yyy依然生效）
obj.unsubscribe('A',xxx);

obj.publish('A','2');



// var e=Math.E;  //自然常数  
//e=lim(1+1/x)^x=1/0!+1/1!+1/2!+1/3!+...+1/n!+...
// var pi=Math.PI;  //圓周率  //单位圆的周长的一半  
//pi/4=1-1/3+1/5-1/7+1/9+...+(-1)^n/(2n+1)+...  
//pi/2=(2/1)*(2/3)*(4/3)*(4/5)*(6/5)*(6/7)*(8/7)*(8/9)*...(((2n+2)*(2n+2))/((2n+1)*(2n+3)))...
// console.log(e); //2.718281828459045
// console.log(pi);  //3.141592653589793

function factorial(n){
  if(n<=1){
    return (1);
  }
  return (n*factorial(n-1));
}

var e=0;
var i;
//Taylor's formula
/*
* js注釋：
一般而言，计算一个已知函数在某个固定点处的近似值，其精度往往依赖于两个方面.其一是函数自身的属性，即当函数在该点只能有限次求导时，函数在该点处不能展为无穷泰勒级数，我们只能利用有限项的泰勒公式来近似计算其函数值.其二是具体要求，如果仅仅需要有限近似，我们往往选择泰勒公式进行处理，这种情况经常在多个领域的工程计算中会出现.当要求无限近似时，我们就选取泰勒级数
泰勒公式常用于不要求足够精度的近似计算，而泰勒级数是用于研究具有无穷可微性质的函数
*/

// Taylor series 
for(i=0;i<1e3;i++){
  e+=1/factorial(i);
}
console.log(e); //2.7182818284590455


//萊布尼茨
// var pi=0;
// for(i=0;i<1e5;i++){
//   if(i & 1){
//     pi=pi-4/(2*i+1);
//   }else{
//     pi=pi+4/(2*i+1);
//   }
// }

//沃利斯
var pi=2;
for(i=0;i<1e5;i++){
  pi=pi*((2*i+2)*(2*i+2))/((2*i+1)*(2*i+3));
}
console.log(pi);  //3.1415826535897198  //3.141584799657313