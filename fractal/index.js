class Fractal{
  constructor(){
    this.eleFractal=document.querySelector('#fractal');
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;

    this.ctx=this.eleFractal.getContext('2d');
  }

  init(){
    var es6This=this;
    //設置canvas的寬高
    es6This.eleFractal.width=es6This.CW;
    es6This.eleFractal.height=es6This.CH-4; //高減4，避免出現滾動條
    return es6This;
  }

  draw(){
    var es6This=this;
    var ctx=es6This.ctx;
    //把原點移到中綫下方位置
    ctx.translate(es6This.CW/2,es6This.CH-4);
    ctx.strokeStyle='blanchedalmond';
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,-200);
    ctx.lineTo(200,-200);
    // ctx.closePath();
    ctx.stroke();
    return es6This;
  }
} //class

var obj=new Fractal();
obj.init().draw();