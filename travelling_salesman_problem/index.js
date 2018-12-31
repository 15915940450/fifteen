class Travelling{
  constructor(){
    this.canvasWidth=800;
    this.canvasHeight=200;
    this.ctx=null;
    this.ctxAfter=null;

    this.startPointAlsoEndPoint=null; //起點
    this.gthAllPoints=4;  //除起點外的所經過點的個數
    this.points=[]; //所經過的點
    this.numAllPermutation=0;
    //最好的路綫
    this.best={
      distance:0,
      points:[]
    };
    this.times=-1;  //運行了多少次
    this.completePermutation=false; //是否已經遍歷完成

    this.order=[];  //決定經過順序
  }

  //初始化
  initPoints(){
    var es6This=this;
    es6This.points.length=0;
    for(var i=0;i<es6This.gthAllPoints;i++){
      es6This.points.push(es6This.generateRandomPoint(i));
      es6This.order[i]=i;
    }
    es6This.startPointAlsoEndPoint=es6This.generateRandomPoint(-1);
    //console.log(JSON.stringify(es6This.points));
    es6This.numAllPermutation=es6This.calcAllPermutation(es6This.gthAllPoints);
    //console.log(es6This.numAllPermutation);

    return es6This;
  }
  generateRandomPoint(id){
    var es6This=this;
    return ({
      id:id,
      x:(Math.random()*(es6This.canvasWidth-50)>>0)+25,
      y:(Math.random()*(es6This.canvasHeight-50)>>0)+25
    });
  }
  calcAllPermutation(n){
    var es6This=this;
    if(n===1){
      return (1);
    }
    return (n*es6This.calcAllPermutation(n-1));
  }

  draw(id){
    var es6This=this;
    id=id || 'canvas';
    var canvas=document.getElementById(id);
    if(id==='canvasAfter'){
      es6This.ctxAfter=canvas.getContext('2d');
    }else{
      es6This.ctx=canvas.getContext('2d');
    }
    return es6This;
  }
  drawWithCTX(ctx,points){
    var es6This=this;
    ctx=ctx || es6This.ctx;
    points=points || es6This.points;
    ctx.clearRect(0,0,es6This.canvasWidth,es6This.canvasHeight);

    //畫點
    ctx.beginPath();
    ctx.fillStyle='crimson';
    ctx.arc(es6This.startPointAlsoEndPoint.x,es6This.startPointAlsoEndPoint.y,10,0,Math.PI*2,true);
    ctx.fill();

    for(var i=0;i<points.length;i++){
      ctx.beginPath();
      ctx.fillStyle='ghostwhite';
      ctx.arc(points[i].x,points[i].y,4,0,Math.PI*2,true);
      ctx.fill();
    }

    //畫曲綫
    ctx.beginPath();
    ctx.moveTo(es6This.startPointAlsoEndPoint.x,es6This.startPointAlsoEndPoint.y);
    ctx.lineTo(points[0].x,points[0].y);
    ctx.strokeStyle='crimson';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(points[0].x,points[0].y);
    for(i=1;i<points.length;i++){
      ctx.lineTo(points[i].x,points[i].y);
    }
    ctx.lineTo(es6This.startPointAlsoEndPoint.x,es6This.startPointAlsoEndPoint.y);

    ctx.strokeStyle='ghostwhite';
    ctx.stroke();
    return es6This;
  }

  //定時器
  timer(){
    var es6This=this;
    var Timer1=window.setInterval(function(){
      es6This.times++;
      document.querySelector('.percent').innerHTML=((es6This.times/es6This.numAllPermutation*100).toFixed(9)+'%'+'('+es6This.gthAllPoints+')');
      if(es6This.completePermutation){
        console.log('complete,最短距離是：',es6This.best.distance);
        console.log(JSON.stringify(es6This.best.points));
        window.clearInterval(Timer1);
        // console.log(es6This.numAllPermutation);
        // console.log(es6This.times+' times');
        console.timeEnd('time_timeEnd_lexical');
      }
      // es6This.points.sort(function(){
      //   return (Math.random()-0.5);
      // });
      //lexical
      es6This.points=es6This.nextLexical(es6This.points,'id');
      es6This.drawWithCTX();
      es6This.calcDistance();
    },1); //最小时间间隔,但未必一定是1毫秒執行一次
    // },1);
    return es6This;
  }
  //典順序遍歷數組
  nextLexical(arr,key){
    var es6This=this;
    arr=arr || es6This.points;
    key=key || 'id';
    if(!es6This.completePermutation){
      var yMax=-1;
      var xMax=arr.reduce(function(acc,cur,idx,src){
        if(idx+1-src.length && cur[key]<src[idx+1][key]){
          acc=idx;
        }
        if(acc+1 && src[acc][key]<cur[key]){
          yMax=idx;
        }
        return acc;
      },-1);
      //console.log('xMax:',xMax,'yMax:',yMax);
      if(xMax+1){
        es6This.swap(arr,xMax,yMax);
        var arrNeedReverse=arr.splice(xMax+1);
        arrNeedReverse.reverse();
        arr=arr.concat(arrNeedReverse);
      }else{
        es6This.completePermutation=true;
      }
    }


    return arr;
  }
  swap(arr,i,j){
    var es6This=this;
    var tmp=arr[i];
    arr[i]=arr[j];
    arr[j]=tmp;
    return es6This;
  }
  //計算所有點長度
  calcDistance(){
    var es6This=this;
    var initialValue=es6This.calcDistanceAbout2point(es6This.startPointAlsoEndPoint,es6This.points[0]);
    var distance=es6This.points.reduce(function(acc,cur,idx,src){
      var distance2idx;

      if(idx===src.length-1){
        distance2idx=es6This.calcDistanceAbout2point(cur,es6This.startPointAlsoEndPoint);
      }else{
        distance2idx=es6This.calcDistanceAbout2point(cur,src[idx+1]);
      }

      return (acc+distance2idx);
    },initialValue)>>0;
    //set best
    if(!es6This.best.distance || distance<es6This.best.distance){
      es6This.best={
        distance:distance,
        points:es6This.points.slice()
      };
      es6This.drawBest();
    }
    return es6This;
  }
  calcDistanceAbout2point(m,n){
    var es6This=this;
    var powX=Math.pow(m.x-n.x,2);
    var powY=Math.pow(m.y-n.y,2);
    var distanceMN=Math.sqrt(powX+powY);
    return (distanceMN);
  }

  drawBest(){
    var es6This=this;
    es6This.draw('canvasAfter').drawWithCTX(es6This.ctxAfter,es6This.best.points);
    console.log(es6This.best.distance,'at '+es6This.times+'th time');
    return es6This;
  }

}  //class

console.time('time_timeEnd_lexical');

var obj=new Travelling();
obj.initPoints().draw().drawWithCTX().calcDistance().timer();

//http://localhost/fifteen/travelling_salesman_problem/
//https://www.bilibili.com/video/av10257437/?p=2
