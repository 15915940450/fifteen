class Greedy{
  constructor(){
    this.eleCanvas=document.querySelector('#canvas');
    this.cW=document.documentElement.clientWidth || document.body.clientWidth;
    this.cH=document.documentElement.clientHeight || document.body.clientHeight;
    this.canvasWidth=this.cW-30;
    this.canvasHeight=this.cH/2-90;
    this.ctx=null;

    this.startPointAlsoEndPoint=null; //起點
    this.points=[]; //所經過的點
    
    //參數
    this.isUseConstantPoints=true;  //是否使用恆定的點
    this.gthAllPoints=30;  //除起點外的所經過點的個數

    this.order=[];  //求解order
    this.newOrder=[];
  }

  //初始化
  initPoints(){
    var es6This=this;
    
    //計時開始
    console.time('time_timeEnd_Greedy');
    //設置canvas
    es6This.eleCanvas.width=es6This.canvasWidth;
    es6This.eleCanvas.height=es6This.canvasHeight;
    //生成所經過的點
    var i,DNA=[];
    if(es6This.isUseConstantPoints){
      //生成起點（同時也是終點）
      es6This.startPointAlsoEndPoint={ id: -1, x: 555, y: 131 };
      es6This.points=[{'id':0,'x':797,'y':40},{'id':1,'x':58,'y':330},{'id':2,'x':1041,'y':261},{'id':3,'x':559,'y':316},{'id':4,'x':1173,'y':67},{'id':5,'x':1139,'y':210},{'id':6,'x':269,'y':247},{'id':7,'x':75,'y':61},{'id':8,'x':624,'y':42},{'id':9,'x':112,'y':295},{'id':10,'x':378,'y':223},{'id':11,'x':28,'y':108},{'id':12,'x':698,'y':214},{'id':13,'x':648,'y':229},{'id':14,'x':41,'y':171},{'id':15,'x':351,'y':69},{'id':16,'x':607,'y':243},{'id':17,'x':1145,'y':111},{'id':18,'x':626,'y':189},{'id':19,'x':298,'y':203},{'id':20,'x':656,'y':124},{'id':21,'x':1033,'y':247},{'id':22,'x':1130,'y':80},{'id':23,'x':830,'y':142},{'id':24,'x':730,'y':175},{'id':25,'x':552,'y':192},{'id':26,'x':631,'y':364},{'id':27,'x':219,'y':336},{'id':28,'x':1130,'y':265},{'id':29,'x':332,'y':365}];
      for(i=0;i<es6This.gthAllPoints;i++){
        DNA[i]={
          gene:i
        };
      }
    }else{
      es6This.startPointAlsoEndPoint=es6This.generateRandomPoint(-1);
      es6This.points.length=0;
      for(i=0;i<es6This.gthAllPoints;i++){
        es6This.points.push(es6This.generateRandomPoint(i));
        DNA[i]={
          gene:i
        };
      }
      // console.log(JSON.stringify(es6This.points));
    }
    this.order=DNA;
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

  draw(id){
    var es6This=this;
    id=id || 'canvas';
    var canvas=document.getElementById(id);
    if(id==='canvasBest'){
      es6This.ctxAfter=canvas.getContext('2d');
    }else{
      es6This.ctx=canvas.getContext('2d');
    }
    es6This.drawWithCTX();
    return es6This;
  }
  drawWithCTX(ctx,DNA){
    var es6This=this;
    ctx=ctx || es6This.ctx;
    DNA=DNA || es6This.newOrder;
    ctx.clearRect(0,0,es6This.canvasWidth,es6This.canvasHeight);
    
    //畫點
    ctx.beginPath();
    ctx.fillStyle='crimson';
    ctx.arc(es6This.startPointAlsoEndPoint.x,es6This.startPointAlsoEndPoint.y,10,0,Math.PI*2,true);
    ctx.fill();

    for(var i=0;i<es6This.gthAllPoints;i++){
      ctx.beginPath();
      ctx.fillStyle='ghostwhite';
      ctx.arc(es6This.points[DNA[i].gene].x,es6This.points[DNA[i].gene].y,4,0,Math.PI*2,true);
      ctx.fill();
    }

    //畫曲綫
    //start-0
    ctx.beginPath();
    ctx.moveTo(es6This.startPointAlsoEndPoint.x,es6This.startPointAlsoEndPoint.y);
    ctx.lineTo(es6This.points[DNA[0].gene].x,es6This.points[DNA[0].gene].y);
    ctx.strokeStyle='crimson';
    ctx.stroke();
    //0-1-2-last-start
    ctx.beginPath();
    ctx.moveTo(es6This.points[DNA[0].gene].x,es6This.points[DNA[0].gene].y);
    for(i=1;i<es6This.gthAllPoints;i++){
      ctx.lineTo(es6This.points[DNA[i].gene].x,es6This.points[DNA[i].gene].y);
    }
    ctx.lineTo(es6This.startPointAlsoEndPoint.x,es6This.startPointAlsoEndPoint.y);
    ctx.strokeStyle='ghostwhite';
    ctx.stroke();
    return es6This;
  }

  findNearestFromM(M){
    var es6This=this;
    var theIdx; 
    es6This.order.reduce(function(acc,cur,idx){
      var distance=es6This.calcDistanceAbout2point(M,es6This.points[cur.gene]);
      if(distance<acc){
        acc=distance;
        theIdx=idx;
      }
      return (acc);
    },window.Infinity);
    return theIdx;
  }
  //計算兩點之間的距離
  calcDistanceAbout2point(m,n){
    var powX=Math.pow(m.x-n.x,2);
    var powY=Math.pow(m.y-n.y,2);
    var distanceMN=Math.sqrt(powX+powY);
    return (distanceMN);
  }
  solve(){
    var es6This=this;
    var currentPoint=null;
    for(var i=0;i<es6This.gthAllPoints;i++){
      if(i){
        currentPoint=es6This.points[_.last(es6This.newOrder).gene];
      }else{
        currentPoint=es6This.startPointAlsoEndPoint;
      }
      var nextPoint=es6This.findNearestFromM(currentPoint);
      es6This.newOrder[i]=es6This.order.splice(nextPoint,1)[0];
    }
    console.timeEnd('time_timeEnd_Greedy');
    return es6This;
  }
}

var obj=new Greedy();
obj.initPoints().solve().draw();