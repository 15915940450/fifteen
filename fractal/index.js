class Fractal{
  constructor(){
    this.eleFractal=document.querySelector('#fractal');
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;
  }

  init(){
    var es6This=this;
    es6This.eleFractal.width=es6This.CW;
    es6This.eleFractal.height=es6This.CH-4;
    return es6This;
  }
} //class

var obj=new Fractal();
obj.init();