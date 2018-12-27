class Travelling{
  constructor(){
    this.canvasWidth=800;
    this.canvasHeight=300;
    this.points=[{'id':0,'x':253,'y':148},{'id':1,'x':644,'y':222},{'id':2,'x':694,'y':204},{'id':3,'x':368,'y':192},{'id':4,'x':178,'y':170},{'id':5,'x':492,'y':144},{'id':6,'x':136,'y':247},{'id':7,'x':491,'y':227},{'id':8,'x':589,'y':269},{'id':9,'x':194,'y':144},{'id':10,'x':501,'y':43},{'id':11,'x':43,'y':247},{'id':12,'x':474,'y':39},{'id':13,'x':635,'y':115},{'id':14,'x':192,'y':198},{'id':15,'x':305,'y':224},{'id':16,'x':720,'y':38},{'id':17,'x':616,'y':78},{'id':18,'x':391,'y':153},{'id':19,'x':47,'y':219},{'id':20,'x':584,'y':89},{'id':21,'x':769,'y':149},{'id':22,'x':45,'y':166},{'id':23,'x':334,'y':142},{'id':24,'x':313,'y':46},{'id':25,'x':246,'y':176},{'id':26,'x':517,'y':118},{'id':27,'x':637,'y':178},{'id':28,'x':161,'y':176},{'id':29,'x':371,'y':39},{'id':30,'x':147,'y':56},{'id':31,'x':117,'y':113},{'id':32,'x':229,'y':186},{'id':33,'x':641,'y':127},{'id':34,'x':337,'y':26},{'id':35,'x':242,'y':52},{'id':36,'x':356,'y':231},{'id':37,'x':224,'y':216},{'id':38,'x':138,'y':146},{'id':39,'x':245,'y':256},{'id':40,'x':625,'y':237},{'id':41,'x':118,'y':41},{'id':42,'x':741,'y':193},{'id':43,'x':584,'y':114},{'id':44,'x':371,'y':216},{'id':45,'x':514,'y':182},{'id':46,'x':25,'y':90},{'id':47,'x':661,'y':85},{'id':48,'x':575,'y':44},{'id':49,'x':601,'y':227}];

    this.ctx=null;
  }

  initPoints(){
    var es6This=this;
    es6This.points.length=0;
    for(var i=0;i<50;i++){
      es6This.points.push({
        id:i,
        x:(Math.random()*(800-50)>>0)+25,
        y:(Math.random()*(300-50)>>0)+25
      });
    }
    // console.log(JSON.stringify(es6This.points));
    return es6This;
  }

  draw(){
    var es6This=this;
    var canvas=document.getElementById('canvas');
    es6This.ctx=canvas.getContext('2d');

    // es6This.points.sort(function(){
    //   return (Math.random()-0.5);
    // });
    //畫點

    es6This.drawWithCTX(es6This.ctx);
    return es6This;
  }
  drawWithCTX(ctx){
    var es6This=this;
    ctx.clearRect(0,0,es6This.canvasWidth,es6This.canvasHeight);
    for(var i=0;i<es6This.points.length;i++){
      ctx.beginPath();
      ctx.arc(es6This.points[i].x,es6This.points[i].y,4,0,Math.PI*2,true);
      ctx.fill();
    }

    //畫曲綫
    ctx.beginPath();
    ctx.moveTo(es6This.points[0].x,es6This.points[0].y);

    for(i=1;i<es6This.points.length;i++){
      ctx.lineTo(es6This.points[i].x,es6This.points[i].y);
    }

    ctx.closePath();
    ctx.stroke();
    return es6This;
  }

  timer(){
    var es6This=this;
    window.setInterval(function(){
      es6This.points.sort(function(){
        return (Math.random()-0.5);
      });
      es6This.drawWithCTX(es6This.ctx);
    },1);
    return es6This;
  }

}  //class

var obj=new Travelling();
obj.draw().timer();

