class GA{
  constructor(){
    this.tutorial='https://www.bilibili.com/video/av10257437/?p=4';
    this.elePercent=document.querySelector('.percent');
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
    this.gthAllPoints=100;  //除起點外的所經過點的個數
    this.gthPopulation=1e3; //種群DNA總數
    this.allGeneration=1e3; //要進化多少代
    this.mutateRate=0.009;
    this.population=[];
  }

  //初始化
  initPoints(){
    var es6This=this;
    //計時開始
    console.time('time_timeEnd_GA');
    es6This.eleCanvas.width=es6This.canvasWidth;
    es6This.eleCanvas.height=es6This.canvasHeight;
    es6This.eleCanvasBest.width=es6This.canvasWidth;
    es6This.eleCanvasBest.height=es6This.canvasHeight;
    //生成起點（同時也是終點）
    //生成所經過的點
    var i,DNA=[];
    if(es6This.isUseConstantPoints){
      es6This.startPointAlsoEndPoint={ id: -1, x: 440, y: 144 };
      es6This.points=[{"id":0,"x":298,"y":336},{"id":1,"x":191,"y":270},{"id":2,"x":974,"y":298},{"id":3,"x":479,"y":65},{"id":4,"x":663,"y":206},{"id":5,"x":704,"y":189},{"id":6,"x":89,"y":318},{"id":7,"x":424,"y":122},{"id":8,"x":1150,"y":124},{"id":9,"x":948,"y":269},{"id":10,"x":257,"y":231},{"id":11,"x":451,"y":343},{"id":12,"x":342,"y":171},{"id":13,"x":703,"y":170},{"id":14,"x":503,"y":75},{"id":15,"x":854,"y":161},{"id":16,"x":352,"y":244},{"id":17,"x":81,"y":215},{"id":18,"x":172,"y":52},{"id":19,"x":487,"y":227},{"id":20,"x":483,"y":191},{"id":21,"x":1150,"y":209},{"id":22,"x":716,"y":293},{"id":23,"x":1195,"y":96},{"id":24,"x":745,"y":170},{"id":25,"x":301,"y":206},{"id":26,"x":803,"y":59},{"id":27,"x":648,"y":117},{"id":28,"x":1125,"y":192},{"id":29,"x":25,"y":122},{"id":30,"x":138,"y":86},{"id":31,"x":584,"y":306},{"id":32,"x":835,"y":280},{"id":33,"x":605,"y":313},{"id":34,"x":359,"y":342},{"id":35,"x":1034,"y":146},{"id":36,"x":687,"y":341},{"id":37,"x":340,"y":171},{"id":38,"x":617,"y":103},{"id":39,"x":649,"y":284},{"id":40,"x":879,"y":320},{"id":41,"x":962,"y":62},{"id":42,"x":785,"y":49},{"id":43,"x":1041,"y":324},{"id":44,"x":615,"y":41},{"id":45,"x":123,"y":181},{"id":46,"x":737,"y":42},{"id":47,"x":1167,"y":163},{"id":48,"x":699,"y":218},{"id":49,"x":734,"y":129},{"id":50,"x":1200,"y":277},{"id":51,"x":1156,"y":231},{"id":52,"x":586,"y":290},{"id":53,"x":717,"y":262},{"id":54,"x":119,"y":175},{"id":55,"x":463,"y":281},{"id":56,"x":1177,"y":367},{"id":57,"x":936,"y":91},{"id":58,"x":940,"y":184},{"id":59,"x":591,"y":233},{"id":60,"x":860,"y":303},{"id":61,"x":696,"y":37},{"id":62,"x":1108,"y":64},{"id":63,"x":597,"y":56},{"id":64,"x":1057,"y":58},{"id":65,"x":722,"y":174},{"id":66,"x":438,"y":84},{"id":67,"x":649,"y":325},{"id":68,"x":984,"y":282},{"id":69,"x":836,"y":279},{"id":70,"x":661,"y":270},{"id":71,"x":654,"y":73},{"id":72,"x":69,"y":335},{"id":73,"x":1003,"y":250},{"id":74,"x":741,"y":97},{"id":75,"x":467,"y":364},{"id":76,"x":419,"y":337},{"id":77,"x":887,"y":280},{"id":78,"x":258,"y":255},{"id":79,"x":1111,"y":141},{"id":80,"x":208,"y":314},{"id":81,"x":1001,"y":148},{"id":82,"x":652,"y":223},{"id":83,"x":249,"y":225},{"id":84,"x":218,"y":184},{"id":85,"x":273,"y":302},{"id":86,"x":245,"y":109},{"id":87,"x":329,"y":204},{"id":88,"x":1038,"y":105},{"id":89,"x":486,"y":359},{"id":90,"x":828,"y":349},{"id":91,"x":407,"y":293},{"id":92,"x":1166,"y":146},{"id":93,"x":1129,"y":181},{"id":94,"x":76,"y":360},{"id":95,"x":606,"y":299},{"id":96,"x":72,"y":181},{"id":97,"x":352,"y":339},{"id":98,"x":1141,"y":131},{"id":99,"x":1146,"y":303}];
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
      v.fitness=1e11/(Math.pow(es6This.calcDistance(v.DNA),11)+1);
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
      var percent=(es6This.currentGeneration/es6This.allGeneration*100).toFixed(3)+'% complete';
      es6This.elePercent.innerHTML=percent;
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
