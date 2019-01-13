/*
* js注釋：
遗传算法求解TSP问题
*/

class GA{
  constructor(){
    this.tutorial='https://www.bilibili.com/video/av10257437/?p=4';
    this.eleBtn=document.querySelector('.btn');
    this.elePercent=document.querySelector('.percent');
    this.eleGeneration=document.getElementById('generation');
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
    this.isUseConstantPoints=false;  //是否使用恆定的點
    this.gthPopulation=200; //種群DNA總數
    this.allGeneration=1e4; //要進化多少代
    this.mutateRate=0.02;   //突變率,一般取0.001－0.1
    this.gthAllPoints=200;  //除起點外的所經過點的個數
    this.pow=8;

    this.population=[]; //種群
    //三十個城市，一千個DNA，進化三千(萬)代
  }

  //适应度函数设计直接影响到遗传算法的性能。
  funFitness(DNA){
    var es6This=this;
    var distance=es6This.calcDistance(DNA);
    var pow=Math.pow(distance,es6This.pow)+1;
    return (1/pow);
  }

  //初始化
  initPoints(){
    var es6This=this;
    es6This.eleBtn.innerHTML=es6This.calcAllPermutation(es6This.gthAllPoints);
    //計時開始
    console.time('time_timeEnd_GA');
    //設置canvas
    es6This.eleCanvas.width=es6This.canvasWidth;
    es6This.eleCanvas.height=es6This.canvasHeight;
    es6This.eleCanvasBest.width=es6This.canvasWidth;
    es6This.eleCanvasBest.height=es6This.canvasHeight;
    document.getElementById('param').innerHTML='種群DNA總數:'+es6This.gthPopulation+',要進化多少代:'+es6This.allGeneration+',突變率:'+es6This.mutateRate+',一共 '+es6This.gthAllPoints+' 個城市(pow='+es6This.pow+')';
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
      console.log(JSON.stringify(es6This.points));
    }
    //生成種群
    for(i=0;i<es6This.gthPopulation;i++){
      es6This.population[i]={
        DNA:_.shuffle(DNA),
        fitness:-1
      };
    }

    return es6This;
  }
  //計算所有排列個數(階乘)
  calcAllPermutation(n){
    var es6This=this;
    if(n===1){
      return (1);
    }
    return (n*es6This.calcAllPermutation(n-1));
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
    var initialValue=es6This.calcDistanceAbout2point(es6This.startPointAlsoEndPoint,es6This.points[DNA[0].gene]);
    var distance=DNA.reduce(function(acc,cur,idx,src){
      var distance2idx;

      if(idx===es6This.gthAllPoints-1){
        distance2idx=es6This.calcDistanceAbout2point(es6This.points[cur.gene],es6This.startPointAlsoEndPoint);
      }else{
        distance2idx=es6This.calcDistanceAbout2point(es6This.points[cur.gene],es6This.points[src[idx+1].gene]);
      }

      return (acc+distance2idx);
    },initialValue)>>0;

    //一旦找到比歷史更短的distance，立馬設置為最優解並繪製
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
      console.log('best distance:'+distance+', at '+es6This.currentGeneration+'th generation');
      es6This.eleRecord.innerHTML='最短記錄：'+distance;
      //存貯到本地(3398)
      if(!window.localStorage['bestDNA'+es6This.gthAllPoints] || (window.localStorage['bestDNA'+es6This.gthAllPoints] && +window.localStorage['bestDNA'+es6This.gthAllPoints]>distance)){
        window.localStorage['bestDNA'+es6This.gthAllPoints]=distance;
      }
      es6This.drawBest();
    }else if(distance===es6This.best.distance){
      // console.log('again best:',DNA);
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
    var bestInCurrentGeneration=[];
    es6This.population.reduce(function(acc,cur){
      var distance=es6This.calcDistance(cur.DNA);
      if(distance<acc){
        acc=distance;
      }else{
        bestInCurrentGeneration=cur.DNA;
      }
      return (acc);
    },Infinity);
    //找到之後在第一個canvas中繪製
    es6This.drawWithCTX(false,bestInCurrentGeneration);
    return es6This;
  }
  nextGeneration(){
    //在每一代，根据问题域中个体的适应度（fitness）大小选择（selection）个体，并借助于自然遗传学的遗传算子（genetic operators）进行组合交叉（crossover）和变异（mutation），产生出代表新的解集的种群。这个过程将导致种群像自然进化一样的后生代种群比前代更加适应于环境，末代种群中的最优个体经过解码（decoding），可以作为问题近似最优解。
    var es6This=this;
    //選擇（selection）（組合交叉：crossover）
    es6This.selection();
    //變異（mutation）
    es6This.mutation(es6This.mutateRate);

    //生成第二代之後找出當前代中最優解
    es6This.findBestInCureentGeneration();
    return es6This;
  }
  selection(){
    var es6This=this;
    es6This.calcFitness();
    var newPopulation=[];

    for(var i=0;i<es6This.gthPopulation;i++){
      if(i){
        var DNA1index=es6This.roulette();
        var DNA2index=es6This.roulette();
        newPopulation[i]={
          DNA:es6This.crossover(es6This.population[DNA1index].DNA,es6This.population[DNA2index].DNA),
          fitness:-1
        };
      }else{
        //最優解直接進入第二代
        newPopulation[0]={
          DNA:es6This.best.DNA,
          fitness:-1
        };
      }
    }
    es6This.population=newPopulation;
  }
  crossover(DNA1,DNA2){
    var es6This=this;
    var start=_.random(0,es6This.gthAllPoints-1);
    var end=_.random(start+1,es6This.gthAllPoints-1);
    var sniDNA1=DNA1.slice(start,end);
    DNA2.forEach(function(v){
      if(!sniDNA1.includes(v)){
        sniDNA1.push(v);
      }
    });
    return sniDNA1;
  }
  //輪盤賭
  roulette(){
    var es6This=this;
    var index=0;
    var randomNum=Math.random();
    while(randomNum>0){
      randomNum=randomNum-es6This.population[index].fitness;
      index++;
    }
    return (index-1);
  }

  //計算適應度
  calcFitness(){
    var es6This=this;
    es6This.population=es6This.population.map(function(v){
      v.fitness=es6This.funFitness(v.DNA);
      return (v);
    });
    var sumFitness=es6This.population.reduce(function(acc,cur){
      return (acc+cur.fitness);
    },0);
    es6This.population=es6This.population.map(function(v){
      v.fitness=v.fitness/sumFitness;
      return (v);
    });
    return es6This;
  }
  mutation(mutateRate){
    var es6This=this;
    var populationMutation=es6This.population.map(function(objDNA){
      var DNA=objDNA.DNA;

      var i1=_.random(0,es6This.gthAllPoints-1);
      var i2=_.random(i1,es6This.gthAllPoints-1);

      if(Math.random()<mutateRate){
        var randomABC=_.random(0,2);
        switch(randomABC){
        case 0:
          DNA=es6This.mutateA(DNA,i1,i2);
          break;
        case 1:
          DNA=es6This.mutateB(DNA,i1,i2);
          break;
        case 2:
          DNA=es6This.mutateC(DNA,i1,i2);
          break;
        default:
          console.log('it is impossible.');
        }
      }
      return ({
        DNA:DNA,
        fitness:-1
      });
    });
    es6This.population=populationMutation;
    return es6This;
  }
  //交换
  mutateA(DNA,i1,i2){
    this.swap(DNA,i1,i2);
    return DNA;
  }
  //倒序
  mutateB(DNA,i1,i2){
    var DNA1=DNA.slice(0,i1);
    var DNA2=DNA.slice(i1,i2);
    DNA2.reverse();
    var DNA3=DNA.slice(i2);
    DNA=DNA1.concat(DNA2,DNA3);
    return DNA;
  }
  //移动
  mutateC(DNA,i1,i2){
    var es6This=this;
    var i3=_.random(i2,es6This.gthAllPoints-1);
    var DNA1=DNA.slice(0,i1);
    var DNA2=DNA.slice(i1,i2);
    var DNA3=DNA.slice(i2,i3);
    var DNA4=DNA.slice(i3);
    DNA=DNA1.concat(DNA3,DNA2,DNA4);
    return DNA;
  }
  //不斷產生下一代
  timer(){
    var es6This=this;
    //https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
    var rafCallback=function(){
      es6This.currentGeneration++;

      es6This.eleGeneration.innerHTML=es6This.currentGeneration;

      var percent=(es6This.currentGeneration/es6This.allGeneration*100).toFixed(9)+'% complete';
      es6This.elePercent.innerHTML=percent;
      if(es6This.currentGeneration<es6This.allGeneration){
        es6This.nextGeneration();
        window.requestAnimationFrame(rafCallback);
      }else{
        //結束
        es6This.completeSearch=true;
        console.timeEnd('time_timeEnd_GA');
        console.log(es6This.best.DNA);
        console.log(window.localStorage['bestDNA'+es6This.gthAllPoints]);
      }
    };
    window.requestAnimationFrame(rafCallback);
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
    if(id==='canvasBest'){
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
    DNA=DNA || es6This.population[0].DNA;
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
  //渲染繪製最優解
  drawBest(){
    var es6This=this;
    es6This.draw('canvasBest').drawWithCTX(es6This.ctxAfter,es6This.best.DNA);
    return es6This;
  }

}

var obj=new GA();
obj.initPoints().draw().findBestInCureentGeneration().timer();
