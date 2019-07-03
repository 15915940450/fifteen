/*
**電子遊戲： 俄羅斯方塊
**Video Games: Tetris
*12-3-6-9
*Artificial Intelligence
*/
class TETRIS{
  constructor(){
    this.arrTetris=[];  //10*20

    /*界面設置*/
    this.eleCanvas=document.querySelector('.canvas_main');
    this.eleCanvasNext=document.querySelector('.canvas_next');
    this.ctx=this.eleCanvas.getContext('2d');
    this.W=10;  //寬度：10
    this.H=20;  //高度：20
    this.cell=30; //每個格子大小

    /*遊戲中的狀態*/
    this.score=0; //遊戲得分
    this.HiScore=0; //歷史最高分
    this.next='I0';  //下一個方塊
    this.level=18;  //18級
    this.lines=0; //已消除的行數


    this.rule=[
      {
        level:0,
        removeLine:10,
        frame:48
      },
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
    ];  //級數規則

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
    ];  //消除行數得分

    //定義方塊形狀(4*4)(IJLOSTZ)
    this.f_f={
      'I':[
        [4,4,4,4],[0,15,0,0]
      ],
      'J':[
        [4,4,6,0],[0,1,7,0],[6,2,2,0],[0,7,4,0]
      ],
      'L':[
        [2,2,6,0],[0,7,1,0],[6,4,4,0],[0,4,7,0]
      ],
      'O':[
        [0,6,6,0]
      ],
      'S':[
        [0,6,3,0],[2,6,4,0]
      ],
      'T':[
        [0,7,2,0],[4,6,4,0],[0,2,7,0],[2,6,2,0]
      ],
      'Z':[
        [0,3,6,0],[4,6,2,0]
      ]
    };

  }

  init(){
    this.initArrTetris();
    this.render();
    // this.raf(); //動畫：每秒60幀
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
        if(j>=12){
          //最後8行(13,20)
          this.arrTetris[i][j]=Math.random()>.4?0:1;
        }else{
          this.arrTetris[i][j]=0;
        }
      }
    }
    return f;
  }

  //繪製canvas
  render(){
    var f=this;
    var ctx=f.ctx;
    var w=f.cell;
    var arrBCC=[1,4];
    // var arrBCC=[1,5,9];

    ctx.clearRect(0,0,300,600);
    

    ctx.beginPath();
    for(var i=0;i<f.W;i++){
      for(var j=0;j<f.H;j++){
        if(f.arrTetris[i][j]){
          ctx.fillStyle='black';
          ctx.fillRect(w*i,w*j,w,w);

          ctx.fillStyle='dimgray';
          ctx.fillRect(w*i+arrBCC[0],w*j+arrBCC[0],w-2,w-2);

          //主要的顏色
          var arrColor=['#fffeff','#ca4679','#2eb788'];
          ctx.fillStyle=arrColor[0];
          ctx.fillRect(w*i+arrBCC[1],w*j+arrBCC[1],w-2*arrBCC[1],w-2*arrBCC[1]);

          // ctx.fillRect(w*i+arrBCC[2],w*j+arrBCC[2],w-2*arrBCC[2],w-2*arrBCC[2]);
        }
      }

    }
    ctx.fill();

    
    
    
    

    return f;
  }

} //class

var obj=new TETRIS();
obj.init();

