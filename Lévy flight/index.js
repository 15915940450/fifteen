// console.log('Lévy flight');
class Levy{
  constructor(){
    this.eleCanvas=document.querySelector('#levy');
    this.ctx=this.eleCanvas.getContext('2d');
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;

    this.currentPoint=null; //当前点
    this.startPoint=null; //开始点(原点)
    this.timerN=0;
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
    f.timerN++;
    var ctx=f.ctx;
    var rafCallback=function(){
      var nextPoint=f.generateNext();


      ctx.lineTo(nextPoint.x,nextPoint.y);
      ctx.stroke();

      //如果回到原点(轨迹经过原点)
      if(f.back2o(f.startPoint,f.currentPoint,nextPoint)){
        var time=new Date();
        alert('已经回到原点('+time+')');
        return true;
      }

      //赋值于当前点
      f.currentPoint={
        x:nextPoint.x,
        y:nextPoint.y
      };

      window.requestAnimationFrame(rafCallback);
    };
    window.requestAnimationFrame(rafCallback);
    return f;
  }
  //判断点p(x,y)在直线p0(x0,y0)p1(x1,y1)上
  back2o(p,p0,p1){
    var f=this;
    var x=p.x;
    var x0=p0.x;
    var x1=p1.x;
    var y=p.y;
    var y0=p0.y;
    var y1=p1.y;
    
    //3.最终判断确在直线上还是延伸线上
    if((x<x0 && x<x1) || (x>x0 && x>x1)){
      return false;
    }

    //2.x1!=x0
    // 要y==(y1-y0)*(x-x0)/(x1-x0)+y0;
    if(x1!==x0 && y!==(y1-y0)*(x-x0)/(x1-x0)+y0){
      return false;
    }

    

    //1.x1=x0
    // 要y==y0
    if(x1===x0 && y!==y0){
      return false;
    }
    if(f.timerN<=1){
      return false;
    }
    console.log(f.timerN,p,p0,p1);
    return true;
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
