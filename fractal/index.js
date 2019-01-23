/*
* js注釋：
--分形樹
*/

class Fractal{
  constructor(){
    this.eleFractal=document.querySelector('#fractal');
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;

    this.ctx=this.eleFractal.getContext('2d');
    this.rootLen=220;
    this.rate=0.77;
    this.rad=Math.PI/15;

    this.count=0;
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

    //遞歸調用繪製分支
    es6This.drawBranch(es6This.rootLen);
    
    // ctx.closePath();
    ctx.stroke();
    return es6This;
  }
  drawBranch(gth){
    var es6This=this;
    // 分支長度小於 _ 則終止繪製
    if(gth<4){
      return (false);
    }
    es6This.count++;

    var ctx=es6This.ctx;
    ctx.moveTo(0,0);
    ctx.lineTo(0,-gth); //1
    // ctx.stroke();
    ctx.translate(0,-gth);
    ctx.save();
    ctx.rotate(es6This.rad);
    es6This.drawBranch(gth*es6This.rate);  //2:畫右分支
    ctx.restore();
    ctx.rotate(-es6This.rad);
    es6This.drawBranch(gth*es6This.rate); //3:畫左分支
    return es6This;
  }
} //class

var obj=new Fractal();
obj.init().draw();
console.log(obj.count);