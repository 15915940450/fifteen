class GA{
  constructor(){
    this.tutorial='https://www.bilibili.com/video/av10257437/?p=4';
    this.canvasWidth=800;
    this.canvasHeight=200;
    this.ctx=null;
    this.ctxAfter=null;
    this.elePercent=document.querySelector('.percent');

    this.startPointAlsoEndPoint=null; //起點
    this.gthAllPoints=13;  //除起點外的所經過點的個數
    this.points=[]; //所經過的點
    this.isUseConstantPoints=true;  //是否使用恆定的點
    //目標：最好的路綫
    this.best={
      distance:0,
      DNA:[]
    };
    this.completeSearch=false; //是否繼續生成下一代

    this.gthPopulation=1000;
    this.population=[];
  }

  //初始化
  initPoints(){
    var es6This=this;
    //計時開始
    console.time('time_timeEnd_GA');
    //生成起點（同時也是終點）
    //生成所經過的點
    var i,DNA=[];
    if(es6This.isUseConstantPoints){
      es6This.startPointAlsoEndPoint={ id: -1, x: 522, y: 122 };
      es6This.points=[{'id':0,'x':488,'y':31},{'id':1,'x':702,'y':140},{'id':2,'x':581,'y':93},{'id':3,'x':207,'y':77},{'id':4,'x':37,'y':68},{'id':5,'x':471,'y':28},{'id':6,'x':602,'y':87},{'id':7,'x':459,'y':172},{'id':8,'x':70,'y':41},{'id':9,'x':465,'y':164},{'id':10,'x':709,'y':130},{'id':11,'x':578,'y':130},{'id':12,'x':771,'y':155}];
      for(i=0;i<es6This.gthAllPoints;i++){
        DNA[i]=i;
      }
    }else{
      es6This.startPointAlsoEndPoint=es6This.generateRandomPoint(-1);
      es6This.points.length=0;
      for(i=0;i<es6This.gthAllPoints;i++){
        es6This.points.push(es6This.generateRandomPoint(i));
        DNA[i]=i;
      }
      console.log(JSON.stringify(es6This.points));
    }
    //生成種群
    for(i=0;i<es6This.gthPopulation;i++){
      es6This.population[i]=_.shuffle(DNA);
    }

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
  //交換數組兩個元素
  swap(arr,i,j){
    var es6This=this;
    var tmp=arr[i];
    arr[i]=arr[j];
    arr[j]=tmp;
    return es6This;
  }
  //計算所有點長度
  calcDistance(DNA){
    var es6This=this;
    var initialValue=es6This.calcDistanceAbout2point(es6This.startPointAlsoEndPoint,es6This.points[DNA[0]]);
    var distance=DNA.reduce(function(acc,cur,idx,src){
      var distance2idx;

      if(idx===es6This.gthAllPoints-1){
        distance2idx=es6This.calcDistanceAbout2point(es6This.points[cur],es6This.startPointAlsoEndPoint);
      }else{
        distance2idx=es6This.calcDistanceAbout2point(es6This.points[cur],es6This.points[src[idx+1]]);
      }

      return (acc+distance2idx);
    },initialValue)>>0;

    //set best(初次或當前比歷史更短)
    es6This.setBest(distance,DNA);
    return distance;
  }
  setBest(distance,DNA){
    var es6This=this;
    if(!es6This.best.distance || distance<es6This.best.distance){
      es6This.best={
        distance:distance,
        DNA:DNA.slice()
      };
      es6This.drawBest();
    }else if(distance===es6This.best.distance){
      console.log('again best:',DNA);
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
  //當前代中找到最優的解
  findBestInCureentGeneration(){
    var es6This=this;
    es6This.population.reduce(function(acc,cur){
      var distance=es6This.calcDistance(cur);
      if(distance<acc){
        acc=distance;
      }
      return (acc);
    },Infinity);
    return es6This;
  }

  /*
   *渲染：在canvas中繪製
  */
  //渲染繪製開始，初始化ctx
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
  //渲染
  drawWithCTX(ctx,DNA){
    var es6This=this;
    ctx=ctx || es6This.ctx;
    DNA=DNA || es6This.population[0];
    ctx.clearRect(0,0,es6This.canvasWidth,es6This.canvasHeight);

    //畫點
    ctx.beginPath();
    ctx.fillStyle='crimson';
    ctx.arc(es6This.startPointAlsoEndPoint.x,es6This.startPointAlsoEndPoint.y,10,0,Math.PI*2,true);
    ctx.fill();

    for(var i=0;i<es6This.gthAllPoints;i++){
      ctx.beginPath();
      ctx.fillStyle='ghostwhite';
      ctx.arc(es6This.points[DNA[i]].x,es6This.points[DNA[i]].y,4,0,Math.PI*2,true);
      ctx.fill();
    }

    //畫曲綫
    //start-0
    ctx.beginPath();
    ctx.moveTo(es6This.startPointAlsoEndPoint.x,es6This.startPointAlsoEndPoint.y);
    ctx.lineTo(es6This.points[DNA[0]].x,es6This.points[DNA[0]].y);
    ctx.strokeStyle='crimson';
    ctx.stroke();
    //0-1-2-last-start
    ctx.beginPath();
    ctx.moveTo(es6This.points[DNA[0]].x,es6This.points[DNA[0]].y);
    for(i=1;i<es6This.gthAllPoints;i++){
      ctx.lineTo(es6This.points[DNA[i]].x,es6This.points[DNA[i]].y);
    }
    ctx.lineTo(es6This.startPointAlsoEndPoint.x,es6This.startPointAlsoEndPoint.y);
    ctx.strokeStyle='ghostwhite';
    ctx.stroke();
    return es6This;
  }
  //渲染繪製最優解
  drawBest(){
    var es6This=this;
    es6This.draw('canvasAfter').drawWithCTX(es6This.ctxAfter,es6This.best.DNA);
    return es6This;
  }

}

var obj=new GA();
obj.initPoints().draw().findBestInCureentGeneration().drawWithCTX();
