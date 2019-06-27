/*
*12-3-6-9
*Artificial Intelligence
shapes:
*/
class TETRIS{
  constructor(){
    this.arrTetris=[];  //10*20

    this.eleCanvas=document.querySelector('canvas');
    this.ctx=this.eleCanvas.getContext('2d');

    this.W=10;
    this.H=20;
    this.cell=30;

    this.rule=[
      {
        level:18,
        removeLine:130,
        frame:3
      },
      {
        level:[19,20,21,22,23,24,25,26,27,28],
        removeLine:10,
        frame:2
      }
    ];
    this.tetrisScore=[
      {
        name:'single',
        value:40
      },
      {
        name:'double',
        value:100
      },
      {
        name:'triple',
        value:300
      },
      {
        name:'tetris',
        value:1200
      }
    ];
  }

  init(){
    this.initArrTetris();
    this.render();
    this.raf();
  }

  raf(){
    var f=this;
    var iRAF=0;
    var t0=new Date().getTime();
    var rafCallback=function(){
      iRAF++;
      // if(){}
      var t=new Date().getTime()-t0;  
      if(t>1000 && t<2000){

        console.log('x'); //每秒60幀
      }
      window.requestAnimationFrame(rafCallback);
    };
    window.requestAnimationFrame(rafCallback);
    return f;
  }

  //初始化遊戲板數據
  initArrTetris(){
    var f=this;
    for(var i=0;i<f.W;i++){
      if(!this.arrTetris[i]){
        this.arrTetris[i]=[];
      }
      for(var j=0;j<f.H;j++){
        this.arrTetris[i][j]=Math.random()>.5?0:1;
      }
    }
    return f;
  }

  //繪製canvas
  render(){
    var f=this;
    var ctx=f.ctx;

    ctx.clearRect(0,0,300,600);
    ctx.fillStyle='dimgray';

    ctx.beginPath();
    for(var i=0;i<f.W;i++){
      for(var j=0;j<f.H;j++){
        if(f.arrTetris[i][j]){
          ctx.rect(f.cell*i,f.cell*j,f.cell,f.cell);
        }
      }

    }
    ctx.fill();

    
    
    
    

    return f;
  }

} //class

var obj=new TETRIS();
obj.init();


