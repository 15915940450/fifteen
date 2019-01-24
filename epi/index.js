class Epi{
  constructor(){
    this.elePI=document.querySelector('#pi');
    this.eleE=document.querySelector('#e');
    this.eleN=document.querySelector('#n');
    this.pi=0;
    this.e=0;
    this.n=0;
    this.all=1e13;
  }
  init(){
    var es6This=this;
    es6This.timer();
    return es6This;
  }
  factorial(n){
    var es6This=this;
    if(n<=1){
      return (1);
    }
    return (n*es6This.factorial(n-1));
  }
  timer(){
    var es6This=this;
    var rafCallback=function(){
      //終止條件
      if(es6This.n>es6This.all){
        return false;
      }

      //e
      es6This.e+=1/es6This.factorial(es6This.n);
      //pi
      if(es6This.n & 1){
        es6This.pi=es6This.pi-4/(2*es6This.n+1);
      }else{
        es6This.pi=es6This.pi+4/(2*es6This.n+1);
      }


      es6This.eleN.innerHTML='n:'+es6This.n+','+es6This.n*100/es6This.all+'%已完成';
      es6This.elePI.innerHTML='PI='+es6This.pi;
      es6This.eleE.innerHTML='e='+es6This.e;
      es6This.n++;
      window.requestAnimationFrame(rafCallback);
    };
    window.requestAnimationFrame(rafCallback);
    return es6This;
  }
}

var obj=new Epi();
obj.init();

/*
* js注釋：




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

* js注釋：
一般而言，计算一个已知函数在某个固定点处的近似值，其精度往往依赖于两个方面.其一是函数自身的属性，即当函数在该点只能有限次求导时，函数在该点处不能展为无穷泰勒级数，我们只能利用有限项的泰勒公式来近似计算其函数值.其二是具体要求，如果仅仅需要有限近似，我们往往选择泰勒公式进行处理，这种情况经常在多个领域的工程计算中会出现.当要求无限近似时，我们就选取泰勒级数
泰勒公式常用于不要求足够精度的近似计算，而泰勒级数是用于研究具有无穷可微性质的函数


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

*/
