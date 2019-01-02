class GA{
  constructor(){
    this.tutorial='https://www.bilibili.com/video/av10257437/?p=4';
    this.canvasWidth=800;
    this.canvasHeight=200;
    this.ctx=null;
    this.ctxAfter=null;
    this.elePercent=document.querySelector('.percent');

    this.startPointAlsoEndPoint=null; //起點
    this.points=[]; //所經過的點
    this.isUseConstantPoints=true;  //是否使用恆定的點
    //目標：最好的路綫
    this.best={
      distance:0,
      DNA:[]
    };
    this.completeSearch=false; //是否繼續生成下一代
    this.currentGeneration=0;
    //參數
    this.gthAllPoints=13;  //除起點外的所經過點的個數
    this.gthPopulation=1e2; //種群DNA總數
    this.allGeneration=1e4; //要進化多少代
    this.mutateRate=0.01;
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
    //roulette
    //在每一代，根据问题域中个体的适应度（fitness）大小选择（selection）个体，并借助于自然遗传学的遗传算子（genetic operators）进行组合交叉（crossover）和变异（mutation），产生出代表新的解集的种群。这个过程将导致种群像自然进化一样的后生代种群比前代更加适应于环境，末代种群中的最优个体经过解码（decoding），可以作为问题近似最优解。
    var es6This=this;
    //選擇（selection）（組合交叉：crossover）
    es6This.selection();
    // es6This.population=es6This.population.map(function(v){
    //   return ((v));
    // });
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
    var start=_.random(es6This.gthAllPoints);
    var end=_.random(start+1,es6This.gthAllPoints);
    // console.log(start,end);
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
      v.fitness=1e11/(Math.pow(es6This.calcDistance(v.DNA),4)+1);
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
    es6This.population.forEach(function(objDNA){
      var DNA=objDNA.DNA;
      DNA.forEach(function(gene,i){
        if(Math.random()<mutateRate){
          es6This.swap(DNA,i,(i+1)%DNA.length);
        }
      });
    });
    return es6This;
  }
  //不斷產生下一代
  timer(){
    var es6This=this;
    var rafCallback=function(){
      es6This.currentGeneration++;
      if(es6This.currentGeneration<es6This.allGeneration){
        es6This.nextGeneration();
        window.requestAnimationFrame(rafCallback);
      }else{
        es6This.completeSearch=true;
        console.log(es6This.population);
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
    es6This.draw('canvasAfter').drawWithCTX(es6This.ctxAfter,es6This.best.DNA);
    return es6This;
  }

}

var obj=new GA();
obj.initPoints().draw().findBestInCureentGeneration().timer();
