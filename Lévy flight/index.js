// console.log('Lévy flight');
class Levy{
  constructor(){
    this.eleCanvas=document.querySelector('#levy');
    this.ctx=this.eleCanvas.getContext('2d');
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;

    this.currentPoint=null;
  }

  random(inclusiveA,inclusiveB){
    var x=Math.random()*(inclusiveB+1-inclusiveA)>>0;
    return (x+inclusiveA);
  }
  //初始化
  init(){
    var es6This=this;
    es6This.eleCanvas.width=es6This.CW;
    es6This.eleCanvas.height=es6This.CH-4;
    return es6This;
  }

  draw(){
    var es6This=this;
    var ctx=es6This.ctx;
    ctx.translate(0.5,0.5);

    es6This.currentPoint={
      x:es6This.CW/2,
      y:es6This.CH/2
    };

    ctx.strokeStyle='blanchedalmond';
    ctx.beginPath();
    ctx.moveTo(es6This.currentPoint.x,es6This.currentPoint.y);
    es6This.signStart(ctx,es6This.currentPoint);
    es6This.timer();

    return es6This;
  }
  //标志开始点
  signStart(ctx,currentPoint){
    var f=this;
    ctx.arc(currentPoint.x,currentPoint.y,30,0,Math.PI*2,true);
    ctx.fillStyle='white';
    ctx.fill();

    return f;
  }
  timer(){
    var es6This=this;
    var ctx=es6This.ctx;
    var rafCallback=function(){
      var nextPoint=es6This.generateNext();
      ctx.lineTo(nextPoint.x,nextPoint.y);
      ctx.stroke();

      es6This.currentPoint={
        x:nextPoint.x,
        y:nextPoint.y
      };

      window.requestAnimationFrame(rafCallback);
    };
    window.requestAnimationFrame(rafCallback);
    return es6This;
  }
  generateNext(){
    var es6This=this;
    var randomX=es6This.random(-5,5);
    var randomY=es6This.random(-5,5);

    if(Math.random()<0.05){
      randomX=es6This.random(-130,130);
      randomY=es6This.random(-130,130);
    }
    var x=es6This.currentPoint.x+randomX;
    var y=es6This.currentPoint.y+randomY;
    if(x<0 || x>es6This.CW || y<0 || y>es6This.CH-4){
      //超出屏幕界限
      // console.log(x,y);
      obj=es6This.generateNext();
      return obj;
    }else{
      return ({
        x:x,
        y:y
      });
    }


    
  }



} //class

var obj=new Levy();
obj.init().draw();
