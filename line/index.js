class Line{
  constructor(){
    this.arrPoints=[
      [600,0],
      [500,100],
      [550,110],
      [200,300],
      [150,500]
    ];
  }
  
  init(){
    this.el=document.getElementById('el');
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;
    this.el.width=this.CW;
    this.el.height=this.CH-4;

    this.ctx=this.el.getContext('2d');


    this.currentPoint={
      x:this.arrPoints[0][0],
      y:this.arrPoints[0][1]
    };

    // this.test();
    this.ctx.beginPath();
    this.ctx.moveTo(this.arrPoints[0][0],this.arrPoints[0][1]);
    this.raf();
  }

  //測試繪圖代碼
  test(){
    var f=this;
    var ctx=this.ctx;
    var arrPoints=this.arrPoints;
    ctx.beginPath();
    ctx.moveTo(arrPoints[0][0],arrPoints[0][1]);
    ctx.lineTo(arrPoints[1][0],arrPoints[1][1]);
    ctx.lineTo(arrPoints[2][0],arrPoints[2][1]);
    ctx.lineTo(arrPoints[3][0],arrPoints[3][1]);
    ctx.strokeStyle='white';
    ctx.stroke();
    //清除畫布
    // ctx.clearRect(0,0,f.CW,f.CH);
    
    return f;
  }

  raf(){
    var f=this;
    var rafCallback=function(){
      // console.log('kk');
      f.doInEveryStep();
      window.requestAnimationFrame(rafCallback);
    };
    window.requestAnimationFrame(rafCallback);
    return f;
  }
  doInEveryStep(){
    var f=this;
    var ctx=f.ctx;
    var currentPoint=f.currentPoint;

    ctx.lineTo();
    return f;
  }
}

var obj=new Line();

obj.init();