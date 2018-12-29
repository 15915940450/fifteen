class Travelling{
  constructor(){
    this.canvasWidth=800;
    this.canvasHeight=200;
    this.startPoint=null;

    this.gthAllPoints=5;
    this.points=[];
    this.numAllPermutation=0;

    this.ctx=null;
    this.ctxAfter=null;
    this.best={
      distance:0,
      points:[]
    };
    this.times=-1;
    this.completePermutation=false;
  }

  initPoints(){
    var es6This=this;
    es6This.points.length=0;
    for(var i=0;i<es6This.gthAllPoints;i++){
      es6This.points.push(es6This.generateRandomPoint(i));
    }
    // console.log(JSON.stringify(es6This.points));


    // es6This.points=[
    //   {'id':10,'x':195,'y':162},
    //   {'id':11,'x':125,'y':191},
    //   {'id':12,'x':750,'y':107},
    //   {'id':14,'x':72,'y':113},
    //   {'id':19,'x':520,'y':56}
    // ];
    // es6This.points=[{'id':0,'x':575,'y':242},{'id':1,'x':52,'y':249},{'id':2,'x':602,'y':230},{'id':3,'x':625,'y':265},{'id':4,'x':427,'y':207},{'id':5,'x':450,'y':186},{'id':6,'x':114,'y':43},{'id':7,'x':374,'y':141},{'id':8,'x':78,'y':61},{'id':9,'x':731,'y':103},{'id':10,'x':171,'y':221},{'id':11,'x':598,'y':131},{'id':12,'x':608,'y':82},{'id':13,'x':639,'y':230},{'id':14,'x':496,'y':33},{'id':15,'x':37,'y':114},{'id':16,'x':731,'y':273},{'id':17,'x':476,'y':49},{'id':18,'x':720,'y':71},{'id':19,'x':293,'y':242},{'id':20,'x':340,'y':103},{'id':21,'x':310,'y':62},{'id':22,'x':228,'y':56},{'id':23,'x':211,'y':268},{'id':24,'x':71,'y':190},{'id':25,'x':706,'y':175},{'id':26,'x':705,'y':120},{'id':27,'x':90,'y':90},{'id':28,'x':639,'y':48},{'id':29,'x':716,'y':175}];
    es6This.numAllPermutation=es6This.calcAllPermutation(es6This.gthAllPoints);

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
    for(var i=0;i<points.length;i++){
      ctx.beginPath();

      if(i){
        ctx.fillStyle='ghostwhite';
        ctx.arc(points[i].x,points[i].y,4,0,Math.PI*2,true);
      }else{
        ctx.fillStyle='crimson';
        ctx.arc(points[0].x,points[0].y,10,0,Math.PI*2,true);
      }

      ctx.fill();
    }

    //畫曲綫
    ctx.beginPath();
    //0-1
    ctx.moveTo(points[0].x,points[0].y);
    ctx.lineTo(points[1].x,points[1].y);
    ctx.strokeStyle='crimson';
    ctx.stroke();

    ctx.beginPath();
    //1-2-3----(gth-1)-0
    ctx.moveTo(points[1].x,points[1].y);
    for(i=2;i<points.length;i++){
      ctx.lineTo(points[i].x,points[i].y);
    }
    ctx.lineTo(points[0].x,points[0].y);

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
      var xMax=arr.reduce(function(acc,cur,idx,src){
        if(idx!==src.length-1 && cur[key]<src[idx+1][key]){
          acc=idx;
        }
        return acc;
      },-1);
      // console.log('xMax',xMax);
      if(xMax+1){
        var yMax=arr.reduce(function(acc,cur,idx,src){
          if(src[xMax][key]<src[idx][key]){
            acc=idx;
          }
          return acc;
        },-1);
        // console.log('yMax',yMax);
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
    var distance=es6This.points.reduce(function(acc,cur,idx,src){
      var lastIndex=src.length-1;
      if(idx){
        //1,2,3,4...
        lastIndex=idx-1;
      }

      var powX=Math.pow(src[idx].x-src[lastIndex].x,2);
      var powY=Math.pow(src[idx].y-src[lastIndex].y,2);
      var distance2idx=Math.sqrt(powX+powY);
      return (acc+distance2idx);
    },0)>>0;
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
