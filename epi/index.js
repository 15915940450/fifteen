class Epi{
  constructor(){
    this.elePI=document.querySelector('#pi');
    this.eleN=document.querySelector('#n');
    this.pi=0;
    this.n=0;
  }
  init(){
    var es6This=this;
    es6This.timer();
    return es6This;
  }
  timer(){
    var es6This=this;
    var rafCallback=function(){
      if(es6This.n>1e11){
        return false;
      }
      if(es6This.n & 1){
        es6This.pi=es6This.pi-4/(2*es6This.n+1);
      }else{
        es6This.pi=es6This.pi+4/(2*es6This.n+1);
      }
      es6This.eleN.innerHTML='n:'+es6This.n;
      es6This.elePI.innerHTML='PI='+es6This.pi;
      es6This.n++;
      window.requestAnimationFrame(rafCallback);
    };
    window.requestAnimationFrame(rafCallback);
    return es6This;
  }
}

var obj=new Epi();
obj.init();
