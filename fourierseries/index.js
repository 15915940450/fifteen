class Fourier{
  constructor(){
    this.rad=0; //time
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;

    this.eleFourier=document.querySelector('#fourier');
    this.ctx=this.eleFourier.getContext('2d');

    this.radius=130;  //圓半徑
    this.arrSineWavePoint=[];
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
    ctx.fillStyle='snow';
    ctx.strokeStyle='floralwhite';
    
    var rafCallback=function(){
      es6This.rad+=0.01;
      if(es6This.rad<100){
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
    
    //清除畫布
    ctx.translate(0,0);
    ctx.clearRect(0,0,es6This.CW,es6This.CH-4);

    ctx.translate(190,190);

    //畫圓
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

    //arrSineWavePoint
    es6This.arrSineWavePoint.unshift({
      x:-es6This.rad*es6This.radius/5+200,
      y:y
    });
    if(es6This.arrSineWavePoint.length>3500){
      es6This.arrSineWavePoint.length=3500;
    }

    //畫連綫
    ctx.strokeStyle='darkviolet';
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(es6This.arrSineWavePoint[0].x,es6This.arrSineWavePoint[0].y);
    ctx.stroke();
    ctx.strokeStyle='floralwhite';
    

    //畫sine wave
    ctx.beginPath();
    // ctx.arc(es6This.rad*es6This.radius/10,y,3,0,Math.PI*2);
    for(var i=1;i<es6This.arrSineWavePoint.length;i++){
      ctx.lineTo(es6This.arrSineWavePoint[i].x,es6This.arrSineWavePoint[i].y);
    }
    ctx.stroke();
    
    
    //描邊，恢復坐標原點到（0，0）
    ctx.translate(-190,-190);
    
    return es6This;
  }



} //class

var obj=new Fourier();
obj.init().Timer();
