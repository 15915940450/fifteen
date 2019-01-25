class Fourier{
  constructor(){
    this.rad=0; //time
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;

    this.eleFourier=document.querySelector('#fourier');
    this.ctx=this.eleFourier.getContext('2d');

    this.radius=130;  //圓半徑
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
      es6This.rad++;
      if(es6This.rad<200){
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

    //畫圓
    ctx.translate(200,200);
    ctx.beginPath();
    ctx.arc(0,0,es6This.radius,0,Math.PI*2);
    // ctx.closePath();
    //描邊，恢復坐標原點到（0，0）
    ctx.stroke();
    ctx.translate(-200,-200);
    
    return es6This;
  }



} //class

var obj=new Fourier();
obj.init().Timer();
