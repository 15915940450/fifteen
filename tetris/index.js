/*
**電子遊戲： 俄羅斯方塊
**Video Games: Tetris
*12-3-6-9
*Artificial Intelligence
*/
class TETRIS{
  constructor(){
    this.arrTetris=[];  //20*10

    /*界面設置*/
    this.eleCanvas=document.querySelector('.canvas_main');
    this.eleCanvasNext=document.querySelector('.canvas_next');
    this.W=10;  //寬度：10
    this.H=20;  //高度：20
    this.cell=30; //每個格子大小

    /*遊戲中的狀態*/
    this.score=0; //遊戲得分
    this.HiScore=0; //歷史最高分
    this.next=['Z',1];  //下一個方塊
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

    //定義方塊形狀(4*4)(IJLOSTZ)(four times four)
    this.f_f={
      I:['4_4_4_4','0_15_0_0'],
      J:['4_4_6_0','0_1_7_0','6_2_2_0','0_7_4_0'],
      L:['2_2_6_0','0_7_1_0','6_4_4_0','0_4_7_0'],
      O:['0_6_6_0'],
      S:['0_6_3_0','2_6_4_0'],
      T:['0_7_2_0','4_6_4_0','0_2_7_0','2_6_2_0'],
      Z:['0_3_6_0','4_6_2_0']
    };

  }

  init(){
    this.initArrTetris();
    this.render();
    // this.raf(); //動畫：每秒60幀
  }

  // 動畫
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
    for(var row=0;row<f.H;row++){
      if(!this.arrTetris[row]){
        this.arrTetris[row]=[];
      }
      for(var j=0;j<f.W;j++){
        if(row>=12){
          //最後8行(13,20)
          this.arrTetris[row][j]=Math.random()>.4?0:1;
        }else{
          this.arrTetris[row][j]=0;
        }
      }
    }
    return f;
  }

  //繪製canvas
  render(){
    var f=this;
    f.renderCanvas(f.eleCanvas.getContext('2d'),f.arrTetris,f.cell);
    f.renderCanvas(f.eleCanvasNext.getContext('2d'),f.F2(f.f_f[f.next[0]][f.next[1]]),22);
    return f;
  }
  //由二維數組繪製成canvas
  renderCanvas(ctx,arr,perW){
    var f=this;
    var arrBCC=[1,4];
    ctx.clearRect(0,0,1e4,1e4);
    ctx.beginPath();
    for(var row=0;row<arr.length;row++){
      for(var j=0;j<arr[0].length;j++){
        if(arr[row][j]){
          ctx.fillStyle='dimgray';
          ctx.fillRect(perW*j+arrBCC[0],perW*row+arrBCC[0],perW-2,perW-2);

          //主要的顏色
          var arrColor=['#fffeff','#ca4679','#2eb788'];
          ctx.fillStyle=arrColor[0];
          ctx.fillRect(perW*j+arrBCC[1],perW*row+arrBCC[1],perW-2*arrBCC[1],perW-2*arrBCC[1]);
        }
      }

    }
    ctx.fill();
    return f;
  }

  //將字母轉化為01二維數組 ('4_4_4_4' ==> [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]])
  F2(LETTER){
    var arr=LETTER.split('_').map(function(v){
      var arr01=[];

      // 15>>4(0) 15>>3(1) 15>>2(3) 15>>1(7) 15>>0(15)
      // 2<<0(2) 2<<1(4) 2<<2(8) 2<<3(16)
      // 4>>4(0) 4>>3(0) 4>>2(1) 4>>1(2) 4>>0(4)
      for(var bit=3;bit>=0;bit--){
        if(v>>bit){
          //該位有值
          arr01.unshift(1);
          //減去該位餘值繼續檢測
          v=v-(2<<(bit-1));
        }else{
          arr01.unshift(0);
        }
      }
      return (arr01);
    });
    return arr;
  }

} //class

var obj=new TETRIS();
obj.init();