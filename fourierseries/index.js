class Fourier{
  constructor(){
    this.rad=0; //time
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;

    this.eleFourier=document.querySelector('#fourier');
    this.ctx=this.eleFourier.getContext('2d');

    this.radius=130;  //圓半徑
    this.radSpeed=0.02;
    this.largestRad=1e6;
    this.originXY=300;
    this.maxLength=1e3;
    this.percent='0.000000000000000000000000000000000000000%';

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
      es6This.rad+=es6This.radSpeed;
      es6This.percent=(es6This.rad*100/es6This.largestRad).toFixed(6)+'%';
      if(es6This.rad<es6This.largestRad){
        // console.log(es6This.rad);
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

    ctx.translate(es6This.originXY,es6This.originXY);

    //畫圓(圓心0，0)
    ctx.beginPath();
    ctx.arc(0,0,es6This.radius,0,Math.PI*2);
    // ctx.closePath();
    ctx.stroke();

    //畫小圓點
    ctx.beginPath();
    var x=es6This.radius*Math.sin(es6This.rad);
    var y=es6This.radius*Math.cos(es6This.rad);
    ctx.arc(x,y,5,0,Math.PI*2);
    ctx.fill();

    //畫圓心到小圓點的連綫
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(x,y);
    ctx.stroke();

    //arrSineWavePointOrigin==>arrSineWavePoint
    es6This.arrSineWavePointOrigin.unshift({
      x:-es6This.rad*es6This.radius/2,
      y:y
    });
    if(es6This.arrSineWavePointOrigin.length>es6This.maxLength){
      es6This.arrSineWavePointOrigin.length=es6This.maxLength;
    }
    //arrSineWavePoint首個元素x為0
    var gap=es6This.arrSineWavePointOrigin[0].x;
    es6This.arrSineWavePoint=es6This.arrSineWavePointOrigin.map(function(v){
      return ({
        x:v.x-gap+es6This.radius*2,
        y:v.y
      });
    });

    //畫小圓點映射到正弦波的連綫
    ctx.strokeStyle='darkviolet';
    ctx.beginPath();
    ctx.moveTo(x,y);
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

    //畫sine wave
    ctx.beginPath();
    ctx.moveTo(es6This.arrSineWavePoint[0].x,es6This.arrSineWavePoint[0].y);
    for(var i=1;i<es6This.arrSineWavePoint.length;i++){
      ctx.lineTo(es6This.arrSineWavePoint[i].x,es6This.arrSineWavePoint[i].y);
    }
    ctx.stroke();
    
    
    //描邊，恢復坐標原點到（0，0）
    ctx.translate(-es6This.originXY,-es6This.originXY);
    
    return es6This;
  }



} //class

var obj=new Fourier();
obj.init().Timer();
