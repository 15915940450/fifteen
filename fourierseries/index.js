class Fourier{
  constructor(){
    this.radian=0; //time
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;

    this.eleRange=document.querySelector('#n');
    this.eleFourier=document.querySelector('#fourier');
    this.ctx=this.eleFourier.getContext('2d');

    this.radius=0;  //圓半徑
    this.smallRadius=3;
    this.radSpeed=1;
    this.divideRad=2e2;
    this.largestRad=1e6;
    this.originXY={
      x:this.CW/4,
      y:this.CW/5
    };
    this.maxLength=this.divideRad*8;
    this.percent='0.0000%';
    this.n=4;  //級數n

    this.arrSineWavePoint=[]; //真正的正弦波點
    this.arrSineWavePointOrigin=[];
  }


  //初始化
  init(){
    var es6This=this;
    es6This.eleFourier.width=es6This.CW;
    es6This.eleFourier.height=es6This.CH-4;

    return es6This;
  }

  //定時器
  Timer(){
    var es6This=this;

    var ctx=es6This.ctx;
    ctx.fillStyle='antiquewhite';
    ctx.strokeStyle='antiquewhite';
    ctx.font='20px serif';

    var rafCallback=function(){
      es6This.radian+=es6This.radSpeed;
      es6This.percent=((es6This.radian+1)*100/es6This.largestRad).toFixed(6)+'%';
      es6This.percent+=', 傅立葉級數n='+es6This.n+'.';
      if(es6This.radian<es6This.largestRad){
        es6This.draw();
        window.requestAnimationFrame(rafCallback);
      }
    };
    window.requestAnimationFrame(rafCallback);

    return es6This;
  }
  draw(){
    var es6This=this;
    var ctx=es6This.ctx;

    //清除畫布,繪製百分比
    ctx.translate(0,0);
    ctx.clearRect(0,0,es6This.CW,es6This.CH-4);
    ctx.fillText(es6This.percent,10,30);

    ctx.translate(es6This.originXY.x,es6This.originXY.y);



    var i;
    var x=0;
    var y=0;
    var xSmall=0;
    var ySmall=0;
    var radian=es6This.radian/es6This.divideRad;

    for(i=0;i<es6This.n;i++){
      var n=i*2+1;
      es6This.radius=es6This.CW*4/(Math.PI*n*10);

      //畫圓(圓心0，0)
      ctx.strokeStyle='rgba(255,255,255,.4)';
      ctx.beginPath();
      ctx.arc(xSmall,ySmall,es6This.radius,0,Math.PI*2);
      // ctx.closePath();
      ctx.stroke();
      ctx.strokeStyle='antiquewhite';

      //畫小圓點
      ctx.beginPath();
      x=es6This.radius*Math.cos(n*radian);
      y=es6This.radius*Math.sin(n*radian);
      xSmall+=x;
      ySmall+=y;

      if(i===es6This.n-1){
        //最後一個點
        ctx.fillStyle='crimson';
      }else{
        ctx.fillStyle='rgba(255,255,255,0.3)';
      }
      ctx.arc(xSmall,ySmall,es6This.smallRadius,0,Math.PI*2);
      ctx.fill();
      ctx.fillStyle='antiquewhite';

      //畫圓心到小圓點的連綫
      ctx.strokeStyle='crimson';
      ctx.lineWidth=3;
      ctx.beginPath();
      ctx.moveTo(xSmall,ySmall);
      ctx.lineTo(xSmall-x,ySmall-y);

      ctx.stroke();
      ctx.strokeStyle='antiquewhite';
      ctx.lineWidth=1;
    }






    //arrSineWavePointOrigin==>arrSineWavePoint
    es6This.arrSineWavePointOrigin.unshift({
      x:-100*radian,
      y:ySmall
    });
    if(es6This.arrSineWavePointOrigin.length>es6This.maxLength){
      es6This.arrSineWavePointOrigin.length=es6This.maxLength;
    }
    //arrSineWavePoint首個元素x為0
    var gap=es6This.arrSineWavePointOrigin[0].x;
    es6This.arrSineWavePoint=es6This.arrSineWavePointOrigin.map(function(v){
      return ({
        x:v.x-gap+es6This.originXY.x,
        y:v.y
      });
    });

    //畫小圓點映射到正弦波的連綫
    ctx.strokeStyle='darkviolet';
    ctx.beginPath();
    ctx.moveTo(xSmall,ySmall);
    ctx.lineTo(es6This.arrSineWavePoint[0].x,es6This.arrSineWavePoint[0].y);
    ctx.stroke();
    ctx.strokeStyle='antiquewhite';

    //小箭頭
    ctx.translate(es6This.arrSineWavePoint[0].x,es6This.arrSineWavePoint[0].y);
    ctx.fillStyle='darkviolet';
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(-10,3);
    ctx.lineTo(-10,-3);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle='antiquewhite';
    ctx.translate(-es6This.arrSineWavePoint[0].x,-es6This.arrSineWavePoint[0].y);

    //畫坐標軸
    ctx.strokeStyle='#222';
    ctx.beginPath();
    ctx.moveTo(es6This.arrSineWavePoint[0].x,0);
    ctx.lineTo(2e3,0);
    ctx.stroke();
    ctx.strokeStyle='antiquewhite';

    //畫sine wave
    ctx.beginPath();
    ctx.moveTo(es6This.arrSineWavePoint[0].x,es6This.arrSineWavePoint[0].y);
    for(i=1;i<es6This.arrSineWavePoint.length;i++){
      ctx.lineTo(es6This.arrSineWavePoint[i].x,es6This.arrSineWavePoint[i].y);
    }
    ctx.stroke();




    //恢復坐標原點到（0，0）
    ctx.translate(-es6This.originXY.x,-es6This.originXY.y);

    return es6This;
  }

  listenRange(){
    var es6This=this;
    es6This.eleRange.value=es6This.n;
    es6This.eleRange.onchange=function(){
      es6This.n=this.value;
    };
    return es6This;
  }



} //class

var obj=new Fourier();
obj.init().Timer().listenRange();
