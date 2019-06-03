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

    this.arrLines=[];
    for(var i=0;i<this.arrPoints.length-1;i++){
      this.arrLines.push({
        startPoint:[this.arrPoints[i][0],this.arrPoints[i][1]],
        endPoint:[this.arrPoints[i+1][0],this.arrPoints[i+1][1]],
        dir:this.arrPoints[i+1][0]-this.arrPoints[i][0]>0?1:-1
      });
    }


    this.currentPoint={
      x:this.arrPoints[0][0],
      y:this.arrPoints[0][1],
      inLine:0
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
    var dx=2; //遞增量
    var arrLines=f.arrLines;

    var x=f.currentPoint.x;
    var y=f.currentPoint.y;
    var lineIndex=f.currentPoint.inLine;

    // 下一點
    x=x+dx*arrLines[lineIndex].dir;
    y=f.calcY(x,lineIndex);
    // console.log(x);

    f.currentPoint={
      x:x,
      y:y,
      inLine:lineIndex
    };

    ctx.lineTo(x,y);
    ctx.strokeStyle='white';
    ctx.stroke();
    return f;
  }
  calcY(x,lineIndex){
    var y;
    //(y-y1)/(y2-y1)=(x-x1)/(x2-x1)
    var arrLines=this.arrLines;
    var y1=arrLines[lineIndex].startPoint[1];
    var y2=arrLines[lineIndex].endPoint[1];
    var x1=arrLines[lineIndex].startPoint[0];
    var x2=arrLines[lineIndex].endPoint[0];

    y=(x-x1)*(y2-y1)/(x2-x1)+y1;

    return y;
  }
}

var obj=new Line();

obj.init();