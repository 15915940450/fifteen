// console.log('Lévy flight');
class Levy{
  constructor(){
    this.eleCanvas=document.querySelector('#levy');
    this.ctx=this.eleCanvas.getContext('2d');
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;

    this.currentPoint=null; //当前点
    this.startPoint=null; //开始点(原点)
  }

  //生成A(包含)到B(包含)的整数
  random(inclusiveA,inclusiveB){
    var x=Math.random()*(inclusiveB+1-inclusiveA)>>0;
    return (x+inclusiveA);
  }
  //初始化
  init(){
    var f=this;
    f.eleCanvas.width=f.CW;
    f.eleCanvas.height=f.CH-4;
    return f;
  }

  draw(){
    var f=this;
    var ctx=f.ctx;
    ctx.translate(0.5,0.5);

    f.currentPoint={
      x:f.CW/2,
      y:f.CH/2
    };

    ctx.strokeStyle='blanchedalmond';
    ctx.beginPath();
    ctx.moveTo(f.currentPoint.x,f.currentPoint.y);
    f.signStart(ctx,f.currentPoint);
    f.timer();

    return f;
  }
  //标志开始点
  signStart(ctx,currentPoint){
    var f=this;
    f.startPoint={
      x:currentPoint.x,
      y:currentPoint.y
    };
    ctx.arc(currentPoint.x,currentPoint.y,30,0,Math.PI*2,true);
    ctx.fillStyle='crimson';
    ctx.fill();

    return f;
  }
  timer(){
    var f=this;
    var ctx=f.ctx;
    var rafCallback=function(){
      var nextPoint=f.generateNext();


      ctx.lineTo(nextPoint.x,nextPoint.y);
      ctx.stroke();

      //如果回到原点
      if(nextPoint.x===f.startPoint.x && nextPoint.y===f.startPoint.y){
        var time=new Date();
        alert('已经回到原点('+time+')');
        return true;
      }

      f.currentPoint={
        x:nextPoint.x,
        y:nextPoint.y
      };

      window.requestAnimationFrame(rafCallback);
    };
    window.requestAnimationFrame(rafCallback);
    return f;
  }
  generateNext(){
    var f=this;
    var randomX=f.random(-5,5);
    var randomY=f.random(-5,5);

    if(Math.random()<0.05){
      randomX=f.random(-130,130);
      randomY=f.random(-130,130);
    }
    var x=f.currentPoint.x+randomX;
    var y=f.currentPoint.y+randomY;
    if(x<0 || x>f.CW || y<0 || y>f.CH-4){
      //超出屏幕界限
      // console.log(x,y);
      obj=f.generateNext();
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
