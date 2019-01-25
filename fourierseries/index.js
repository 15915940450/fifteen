class Fourier{
  constructor(){
    this.rad=0; //time
  }


  Timer(){
    var es6This=this;
    var rafCallback=function(){
      es6This.rad++;
      if(es6This.rad<1e3){
        console.log(es6This.rad);
        window.requestAnimationFrame(rafCallback);
      }
    };
    window.requestAnimationFrame(rafCallback);
    return es6This;
  }
} //class

var obj=new Fourier();
obj.Timer();