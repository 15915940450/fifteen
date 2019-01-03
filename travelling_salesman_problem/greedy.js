class Greedy{
  constructor(){
    this.tutorial='https://www.bilibili.com/video/av10257437/?p=4';
    this.elePercent=document.querySelector('.percent');
    this.eleRecord=document.querySelector('.record');
    this.eleCanvas=document.querySelector('#canvas');
    this.eleCanvasBest=document.querySelector('#canvasBest');
    this.cW=document.documentElement.clientWidth || document.body.clientWidth;
    this.cH=document.documentElement.clientHeight || document.body.clientHeight;
    this.canvasWidth=this.cW-30;
    this.canvasHeight=this.cH/2-90;
    this.ctx=null;
    this.ctxAfter=null;

    this.startPointAlsoEndPoint=null; //起點
    this.points=[]; //所經過的點
    //目標：最好的路綫
    this.best={
      distance:0,
      DNA:[]
    };
    this.completeSearch=false; //是否繼續生成下一代
    this.currentGeneration=0;
    //參數
    this.isUseConstantPoints=true;  //是否使用恆定的點
    this.gthAllPoints=30;  //除起點外的所經過點的個數
    this.gthPopulation=1e3; //種群DNA總數
    this.allGeneration=3e3; //要進化多少代
    this.mutateRate=1e-2;   //突變率,一般取0.001－0.1

    this.order=[];  //求解order
  }

  //初始化
  initPoints(){
    var es6This=this;
    //計時開始
    console.time('time_timeEnd_GA');
    //設置canvas
    es6This.eleCanvas.width=es6This.canvasWidth;
    es6This.eleCanvas.height=es6This.canvasHeight;
    es6This.eleCanvasBest.width=es6This.canvasWidth;
    es6This.eleCanvasBest.height=es6This.canvasHeight;
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
    DNA=DNA || es6This.order;
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
  
}

var obj=new Greedy();
obj.initPoints().draw();