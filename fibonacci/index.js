class Fibonacci{
  constructor(){
    this.clientW=document.documentElement.clientWidth || document.body.clientWidth;
    this.clientH=document.documentElement.clientHeight || document.body.clientHeight;
    this.eleCanvas=document.querySelector('canvas');
    this.eleCanvas.width=this.clientW;
    this.eleCanvas.height=this.clientH-4;
    this.sxw2d=this.eleCanvas.getContext('2d'); //上下文：2d

    // this.initStartPoint=[430,270]; //this.clientW/2,(this.clientH-4)/2  斐波那契曲綫起點
    this.initStartPoint=[this.clientW/2,(this.clientH-4)/2];
  }

  //Dynamic Programming(记住求过的解来节省时间)
  fibonacci(index){
    if(index<=1){
      return (1);
    }
    var vIndex; //index下的斐波那契數值
    var vIndex_1=1;
    var vIndex_2=1;
    for(var i=2;i<=index;i++){
      vIndex=vIndex_1+vIndex_2;
      //此時 vIndex_2 已無用,替換為新值
      vIndex_2=vIndex_1;
      vIndex_1=vIndex;
    }
    return (vIndex);
  }
  fibonacciArr(index){
    if(index===0){
      return ([1]);
    }
    if(index===1){
      return ([1,1]);
    }
    var arrFibonacci=[1,1];
    var vIndex; //index下的斐波那契數值
    var vIndex_1=1;
    var vIndex_2=1;
    for(var i=2;i<=index;i++){
      vIndex=vIndex_1+vIndex_2;
      arrFibonacci.push(vIndex);
      //此時 vIndex_2 已無用,替換為新值
      vIndex_2=vIndex_1;
      vIndex_1=vIndex;
    }
    return (arrFibonacci);
  }

  //斐波那契数(索引)
  //index:0,1,2,3  F0=1,F1=1,F2=2,,,,Fn=F(n-1)+F(n-2)
  fibonacciNum(index){
    var num=1;
    if(index===0 || index===1){
      return 1;
    }
    num=this.fibonacciNum(index-1)+this.fibonacciNum(index-2);
    return num;
  }

  //邊長
  px10(i){
    return (3*this.fibonacciNum(i));
  }

  //左上點以及圓弧中心點
  ltPoint(i,sideLen){
    //初始化變量
    var x,y,arcX,arcY;

    //方向0：3->1,1:0->2,2:1->3,3:3->0
    var direction=i%4;
    //弧綫起始點坐標
    var startPoint=this.startPoint(i);
    //畫矩形的起始點與弧綫起始點坐標(主因)的關係
    switch(direction){
    case 0:
      x=startPoint.x-sideLen;
      y=startPoint.y;
      arcX=startPoint.x;
      arcY=startPoint.y+sideLen;
      break;
    case 1:
      x=startPoint.x;
      y=startPoint.y;
      arcX=startPoint.x+sideLen;
      arcY=startPoint.y;
      break;
    case 2:  //向右1--》3
      x=startPoint.x;
      y=startPoint.y-sideLen;
      arcX=startPoint.x;
      arcY=startPoint.y-sideLen;
      break;
    case 3:
      x=startPoint.x-sideLen;
      y=startPoint.y-sideLen;
      arcX=startPoint.x-sideLen;
      arcY=startPoint.y;
      break;
    default:
      alert('impossible');
    }

    return ({
      arcX:arcX,
      arcY:arcY,
      x:x,
      y:y
    });
  }

  //弧綫起始點坐標算法
  startPoint(i){
    // 初始化變量
    var x,y;

    //遞歸出口
    if(i===0){
      return ({
        x:this.initStartPoint[0],
        y:this.initStartPoint[1]
      });
    }

    var direction=i%4;
    var sideLen=this.px10(i-1);
    //弧綫起始點坐標與上一個弧綫起始點坐標的關係，建立遞歸
    switch(direction){
    case 0:
      x=this.startPoint(i-1).x-sideLen;
      y=this.startPoint(i-1).y-sideLen;
      break;
    case 1:
      x=this.startPoint(i-1).x-sideLen;
      y=this.startPoint(i-1).y+sideLen;
      break;
    case 2:  //向右 1->3
      x=this.startPoint(i-1).x+sideLen;
      y=this.startPoint(i-1).y+sideLen;
      break;
    case 3:
      x=this.startPoint(i-1).x+sideLen;
      y=this.startPoint(i-1).y-sideLen;
      break;
    default:
      alert('impossible');
    }

    return ({
      x:x,
      y:y
    });
  }

  // 繪製第i個正方形
  // drawRect(i){
  //   var es6This=this;

  //   //正方形
  //   /*
  //   要素：起始點，邊長
  //   */
  //   var sideLen=es6This.px10(i);
  //   var ltPoint=es6This.ltPoint(i,sideLen);
  //   // console.log(ltPoint);
  //   es6This.sxw2d.strokeRect(ltPoint.x,ltPoint.y,sideLen,sideLen);

  //   return es6This;
  // }
  // 繪製第i段弧綫
  drawArc(i,isDrawRect){
    var es6This=this;

    es6This.sxw2d.beginPath();

    var sideLen=es6This.px10(i);
    var ltPoint=es6This.ltPoint(i,sideLen);
    var radius=sideLen;
    var startAngle=(-Math.PI/2)*((i+1)%4);
    var endAngle=(-Math.PI/2)*((i+2)%4);

    if(isDrawRect){
      //繪製矩形
      es6This.sxw2d.strokeStyle='#83d0f2';
      es6This.sxw2d.lineWidth=1;
      es6This.sxw2d.strokeRect(ltPoint.x,ltPoint.y,sideLen,sideLen);
    }

    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    es6This.sxw2d.arc(ltPoint.arcX,ltPoint.arcY,radius,startAngle,endAngle,true);
    es6This.sxw2d.strokeStyle='#000';
    es6This.sxw2d.lineWidth=3;
    es6This.sxw2d.stroke();

    return es6This;
  }

  forI(I){
    for(var i=0;i<I;i++){
      // this.drawRect(i);
      this.drawArc(i,true);
    }
  }



} //class

var obj=new Fibonacci();
obj.forI(13);
