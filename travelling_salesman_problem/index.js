class Travelling{
  constructor(){
    this.ctx=null;
    this.ctxAfter=null;
    this.elePercent=document.querySelector('.percent');
    this.eleCanvas=document.querySelector('#canvas');
    this.eleCanvasBest=document.querySelector('#canvasBest');
    this.cW=document.documentElement.clientWidth || document.body.clientWidth;
    this.cH=document.documentElement.clientHeight || document.body.clientHeight;
    this.canvasWidth=this.cW-30;
    this.canvasHeight=this.cH/2-90;

    this.startPointAlsoEndPoint=null; //起點
    this.gthAllPoints=13;  //除起點外的所經過點的個數
    this.points=[]; //所經過的點
    this.numAllPermutation=0;
    //最好的路綫
    this.best={
      distance:0,
      order:[]
    };
    this.times=-1;  //運行了多少次
    this.completePermutation=false; //是否已經遍歷完成

    this.order=[];  //決定經過順序
  }

  //初始化
  initPoints(){
    var es6This=this;
    //計時開始
    console.time('time_timeEnd_lexical');
    //設置canvas
    es6This.eleCanvas.width=es6This.canvasWidth;
    es6This.eleCanvas.height=es6This.canvasHeight;
    es6This.eleCanvasBest.width=es6This.canvasWidth;
    es6This.eleCanvasBest.height=es6This.canvasHeight;

    es6This.points.length=0;
    es6This.startPointAlsoEndPoint={ id: -1, x: 555, y: 131 };
    // es6This.points=[{'id':0,'x':797,'y':40},{'id':1,'x':58,'y':330},{'id':2,'x':1041,'y':261},{'id':3,'x':559,'y':316},{'id':4,'x':1173,'y':67},{'id':5,'x':1139,'y':210},{'id':6,'x':269,'y':247},{'id':7,'x':75,'y':61},{'id':8,'x':624,'y':42},{'id':9,'x':112,'y':295},{'id':10,'x':378,'y':223},{'id':11,'x':28,'y':108},{'id':12,'x':698,'y':214},{'id':13,'x':648,'y':229},{'id':14,'x':41,'y':171},{'id':15,'x':351,'y':69},{'id':16,'x':607,'y':243},{'id':17,'x':1145,'y':111},{'id':18,'x':626,'y':189},{'id':19,'x':298,'y':203},{'id':20,'x':656,'y':124},{'id':21,'x':1033,'y':247},{'id':22,'x':1130,'y':80},{'id':23,'x':830,'y':142},{'id':24,'x':730,'y':175},{'id':25,'x':552,'y':192},{'id':26,'x':631,'y':364},{'id':27,'x':219,'y':336},{'id':28,'x':1130,'y':265},{'id':29,'x':332,'y':365}];

    // es6This.startPointAlsoEndPoint=es6This.generateRandomPoint(-1);
    for(var i=0;i<es6This.gthAllPoints;i++){
      es6This.points.push(es6This.generateRandomPoint(i));
      es6This.order[i]=i;
    }
    //console.log(JSON.stringify(es6This.points));
    es6This.numAllPermutation=es6This.calcAllPermutation(es6This.gthAllPoints);
    //console.log(es6This.numAllPermutation);

    return es6This;
  }
  //生成點
  generateRandomPoint(id){
    var es6This=this;
    return ({
      id:id,
      x:(Math.random()*(es6This.canvasWidth-50)>>0)+25,
      y:(Math.random()*(es6This.canvasHeight-50)>>0)+25
    });
  }
  //計算所有排列個數(階乘)
  calcAllPermutation(n){
    var es6This=this;
    if(n===1){
      return (1);
    }
    return (n*es6This.calcAllPermutation(n-1));
  }


  //定時器
  timer(){
    var es6This=this;
    var Timer1=window.setInterval(function(){
      es6This.times++;
      es6This.elePercent.innerHTML=((es6This.times/es6This.numAllPermutation*100).toFixed(9)+'%'+'('+es6This.gthAllPoints+')');
      if(es6This.completePermutation){
        console.log('complete,最短距離是：',es6This.best.distance);
        console.log(JSON.stringify(es6This.best.order));
        window.clearInterval(Timer1);
        console.timeEnd('time_timeEnd_lexical');
      }
      //lexical
      es6This.order=es6This.nextLexical();
      es6This.drawWithCTX();
      es6This.calcDistance();
    },1); //最小时间间隔,但未必一定是1毫秒執行一次
    // },1);
    return es6This;
  }
  //典順序遍歷數組
  nextLexical(){
    var es6This=this;
    var arr=es6This.order;
    if(!es6This.completePermutation){
      var yMax=-1;
      var xMax=arr.reduce(function(acc,cur,idx,src){
        if(idx+1-src.length && cur<src[idx+1]){
          acc=idx;
        }
        if(acc+1 && src[acc]<cur){
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
  //交換數組兩個元素
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
    var initialValue=es6This.calcDistanceAbout2point(es6This.startPointAlsoEndPoint,es6This.points[es6This.order[0]]);
    var distance=es6This.order.reduce(function(acc,cur,idx,src){
      var distance2idx;

      if(idx===es6This.gthAllPoints-1){
        distance2idx=es6This.calcDistanceAbout2point(es6This.points[cur],es6This.startPointAlsoEndPoint);
      }else{
        distance2idx=es6This.calcDistanceAbout2point(es6This.points[cur],es6This.points[src[idx+1]]);
      }

      return (acc+distance2idx);
    },initialValue)>>0;
    //set best(初次或當前比歷史更短)
    if(!es6This.best.distance || distance<es6This.best.distance){
      es6This.best={
        distance:distance,
        order:es6This.order.slice()
      };
      es6This.drawBest();
    }else if(distance===es6This.best.distance){
      console.log('again best:',es6This.order);
    }
    return es6This;
  }
  //計算兩點之間的距離
  calcDistanceAbout2point(m,n){
    var powX=Math.pow(m.x-n.x,2);
    var powY=Math.pow(m.y-n.y,2);
    var distanceMN=Math.sqrt(powX+powY);
    return (distanceMN);
  }

  /*
   *渲染：在canvas中繪製
  */
  //渲染繪製開始，初始化ctx
  draw(id){
    var es6This=this;
    id=id || 'canvas';
    var canvas=document.getElementById(id);
    if(id==='canvasBest'){
      es6This.ctxAfter=canvas.getContext('2d');
    }else{
      es6This.ctx=canvas.getContext('2d');
    }
    return es6This;
  }
  //渲染
  drawWithCTX(ctx,order){
    var es6This=this;
    ctx=ctx || es6This.ctx;
    order=order || es6This.order;
    ctx.clearRect(0,0,es6This.canvasWidth,es6This.canvasHeight);

    //畫點
    ctx.beginPath();
    ctx.fillStyle='crimson';
    ctx.arc(es6This.startPointAlsoEndPoint.x,es6This.startPointAlsoEndPoint.y,10,0,Math.PI*2,true);
    ctx.fill();

    for(var i=0;i<es6This.gthAllPoints;i++){
      ctx.beginPath();
      ctx.fillStyle='ghostwhite';
      ctx.arc(es6This.points[order[i]].x,es6This.points[order[i]].y,4,0,Math.PI*2,true);
      ctx.fill();
    }

    //畫曲綫
    //start-0
    ctx.beginPath();
    ctx.moveTo(es6This.startPointAlsoEndPoint.x,es6This.startPointAlsoEndPoint.y);
    ctx.lineTo(es6This.points[order[0]].x,es6This.points[order[0]].y);
    ctx.strokeStyle='crimson';
    ctx.stroke();
    //0-1-2-last-start
    ctx.beginPath();
    ctx.moveTo(es6This.points[order[0]].x,es6This.points[order[0]].y);
    for(i=1;i<es6This.gthAllPoints;i++){
      ctx.lineTo(es6This.points[order[i]].x,es6This.points[order[i]].y);
    }
    ctx.lineTo(es6This.startPointAlsoEndPoint.x,es6This.startPointAlsoEndPoint.y);
    ctx.strokeStyle='ghostwhite';
    ctx.stroke();
    return es6This;
  }
  //渲染繪製最優解
  drawBest(){
    var es6This=this;
    es6This.draw('canvasBest').drawWithCTX(es6This.ctxAfter,es6This.best.order);
    console.log(es6This.best.distance,'at '+es6This.times+'th time');
    return es6This;
  }

}  //class


var obj=new Travelling();
obj.initPoints().draw().drawWithCTX().calcDistance().timer();

//http://localhost/fifteen/travelling_salesman_problem/
//https://www.bilibili.com/video/av10257437/?p=2
