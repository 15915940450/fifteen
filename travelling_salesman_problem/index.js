class Travelling{
  constructor(){
    this.canvasWidth=800;
    this.canvasHeight=300;
    this.points=[];

    this.ctx=null;
    this.ctxAfter=null;
    this.best={
      distance:0,
      points:[]
    };
    this.times=0;
    this.completePermutation=false;
  }

  initPoints(){
    console.time('time_timeEnd_lexical');
    var es6This=this;
    es6This.points.length=0;
    // for(var i=0;i<50;i++){
    //   es6This.points.push({
    //     id:i,
    //     x:(Math.random()*(800-50)>>0)+25,
    //     y:(Math.random()*(300-50)>>0)+25
    //   });
    // }
    // console.log(JSON.stringify(es6This.points));
    es6This.points=[{'id':0,'x':470,'y':235},{'id':1,'x':603,'y':164},{'id':2,'x':532,'y':200},{'id':3,'x':769,'y':99},{'id':4,'x':163,'y':178},{'id':5,'x':371,'y':91},{'id':6,'x':583,'y':79},{'id':7,'x':231,'y':209},{'id':8,'x':548,'y':272},{'id':9,'x':306,'y':154},{'id':10,'x':195,'y':162},{'id':11,'x':125,'y':191},{'id':12,'x':750,'y':107},{'id':13,'x':733,'y':135},{'id':14,'x':72,'y':113},{'id':15,'x':660,'y':203},{'id':16,'x':241,'y':206},{'id':17,'x':25,'y':219},{'id':18,'x':53,'y':30},{'id':19,'x':520,'y':56},{'id':20,'x':628,'y':237},{'id':21,'x':636,'y':145},{'id':22,'x':172,'y':90},{'id':23,'x':618,'y':46},{'id':24,'x':238,'y':152},{'id':25,'x':243,'y':112},{'id':26,'x':513,'y':47},{'id':27,'x':607,'y':48},{'id':28,'x':89,'y':109},{'id':29,'x':510,'y':47},{'id':30,'x':753,'y':236},{'id':31,'x':349,'y':47},{'id':32,'x':774,'y':142},{'id':33,'x':353,'y':192},{'id':34,'x':397,'y':173},{'id':35,'x':412,'y':169},{'id':36,'x':166,'y':85},{'id':37,'x':323,'y':214},{'id':38,'x':58,'y':81},{'id':39,'x':596,'y':42},{'id':40,'x':494,'y':103},{'id':41,'x':76,'y':29},{'id':42,'x':472,'y':33},{'id':43,'x':394,'y':104},{'id':44,'x':100,'y':265},{'id':45,'x':84,'y':122},{'id':46,'x':707,'y':47},{'id':47,'x':523,'y':76},{'id':48,'x':194,'y':173},{'id':49,'x':387,'y':37}];
    // es6This.points=[{'id':33,'x':353,'y':192},{'id':34,'x':397,'y':173},{'id':35,'x':412,'y':169},{'id':36,'x':166,'y':85},{'id':37,'x':323,'y':214},{'id':39,'x':596,'y':42}];
    return es6This;
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
      ctx.arc(points[i].x,points[i].y,4,0,Math.PI*2,true);
      ctx.fill();
    }

    //畫曲綫
    ctx.beginPath();
    ctx.moveTo(points[0].x,points[0].y);

    for(i=1;i<points.length;i++){
      ctx.lineTo(points[i].x,points[i].y);
    }

    ctx.closePath();
    ctx.stroke();
    return es6This;
  }

  //定時器
  timer(){
    var es6This=this;
    var Timer1=window.setInterval(function(){
      es6This.times++;
      if(es6This.completePermutation){
        console.log('complete',es6This.best.distance,es6This.times);
        console.log(JSON.stringify(es6This.points));
        window.clearInterval(Timer1);
        console.timeEnd('time_timeEnd_lexical');
      }
      // es6This.points.sort(function(){
      //   return (Math.random()-0.5);
      // });
      //lexical
      es6This.points=es6This.nextLexical(es6This.points);
      es6This.drawWithCTX();
      es6This.calcDistance();
    },1); //最小时间间隔,但未必一定是1毫秒執行一次
    // },1);
    return es6This;
  }
  //典順序遍歷數組
  nextLexical(arr){
    var es6This=this;
    arr=arr || es6This.points;
    if(!es6This.completePermutation){
      var xMax=arr.reduce(function(acc,cur,idx,src){
        if(src[idx+1] && cur.id<src[idx+1].id){
          acc=idx;
        }
        return acc;
      },-1);
      // console.log('xMax',xMax);
      if(xMax+1){
        var yMax=arr.reduce(function(acc,cur,idx,src){
          if(src[xMax].id<src[idx].id){
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
    if(!es6This.best.distance){
      es6This.best.distance=distance;
    }
    if(distance<es6This.best.distance){
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

var obj=new Travelling();
obj.initPoints().draw().drawWithCTX().calcDistance().timer();

//http://localhost/fifteen/travelling_salesman_problem/
