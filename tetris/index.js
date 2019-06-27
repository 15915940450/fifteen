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
  }

  init(){
    this.initArrTetris();
    this.render();
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
