/*
**電子遊戲： 俄羅斯方塊
**Video Games: Tetris
*12-3-6-9
*Artificial Intelligence
*/
class TETRIS{
  constructor(){
    this.arrTetris=[];
    //arrTetris:20*10(沒有當前活動的數據，當一個方塊固定後需要更新)
    //arrTetrisAppendActive:20*10（加上當前活動的方塊，即係展示給用戶的數據，每一幀，每一個操作都要更新）
    this.arrTetrisAppendActive=[];

    /*界面設置*/
    this.eleCanvas=document.querySelector('.canvas_main');
    this.eleCanvasNext=document.querySelector('.canvas_next');
    this.W=10;  //寬度：10
    this.H=20;  //高度：20
    this.cell=30; //每個格子大小

    /*遊戲中的狀態*/
    this.active=null;  //當前方塊
    this.activeForm=null;  //當前方塊形態索引
    this.activePosition={ //當前方塊的位置
      row:null,
      j:3  //列
    };  //下一個方塊
    this.next=null;  //下一個方塊
    this.nextForm=null;  //下一個方塊形態索引
    this.score=0; //遊戲得分
    this.HiScore=0; //歷史最高分
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
      I:{
        color:'#fffeff',
        form:['4_4_4_4','0_15_0_0']
      },
      J:{
        color:'#ca4679',
        form:['4_4_6_0','0_1_7_0','6_2_2_0','0_7_4_0']
      },
      L:{
        color:'#2eb788',
        form:['2_2_6_0','0_7_1_0','6_4_4_0','0_4_7_0']
      },
      O:{
        color:'#fffeff',
        form:['0_6_6_0']
      },
      S:{
        color:'#ca4679',
        form:['0_6_3_0','2_6_4_0']
      },
      T:{
        color:'#2eb788',
        form:['0_7_2_0','4_6_4_0','0_2_7_0','2_6_2_0']
      },
      Z:{
        color:'#fffeff',
        form:['0_3_6_0','4_6_2_0']
      }
    };

  }

  init(){
    this.initArrTetris();
    this.render();
    // this.raf(); //動畫：每秒60幀
    this.listen();
  }

  // 動畫
  /*raf(){
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
  }*/

  //初始化遊戲板數據
  initArrTetris(){
    var f=this;
    //初始雜亂數據
    for(var row=0;row<f.H;row++){
      if(!this.arrTetris[row]){
        this.arrTetris[row]=[];
      }
      for(var j=0;j<f.W;j++){
        if(row>=12){
          //最後8行(13,20)
          this.arrTetris[row][j]={
            color:'crimson',
            v:Math.random()>.4?0:1
          };
        }else{
          this.arrTetris[row][j]={
            color:'black',
            v:0
          };
        }
      }
    }
    //第一個當前活動的方塊
    var active=f.gLETTER();
    // f.active='I';
    // f.activeForm=0;

    f.active=active.LETTER;
    f.activeForm=active.form;
    
    f.activePosition.row=f.calcAppearRow();
    // f.activePosition.row=-2;  //0,1,2,3,4

    return f;
  }
  //計算當前活動方塊出現的行數值
  calcAppearRow(){
    var f=this;
    var row=-3;
    var activeLETTER=f.f_f[f.active].form[f.activeForm].split('_').reverse();
    // console.log(activeLETTER);
    for(var i=0;i<activeLETTER.length;i++){
      if(!+activeLETTER[i]){
        row++;
      }else{
        //跳出
        break;
      }
    }
    return (row);
  }


  //繪製canvas
  render(){
    var f=this;
    f.addActiveLETTER();
    f.renderCanvas(f.eleCanvas.getContext('2d'),f.arrTetrisAppendActive,f.cell);
    //從該形狀中隨機選取一個
    var next=f.gLETTER();
    f.next=next.LETTER;
    f.nextForm=next.form;
    f.renderCanvas(f.eleCanvasNext.getContext('2d'),f.F2(f.next,f.nextForm),22);
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
        if(arr[row][j].v){
          ctx.fillStyle='dimgray';
          ctx.fillRect(perW*j+arrBCC[0],perW*row+arrBCC[0],perW-2,perW-2);

          //格子的顏色
          ctx.fillStyle=arr[row][j].color;
          ctx.fillRect(perW*j+arrBCC[1],perW*row+arrBCC[1],perW-2*arrBCC[1],perW-2*arrBCC[1]);
        }
      }

    }
    ctx.fill();
    return f;
  }
  //隨機生成字母
  gLETTER(){
    var f=this;
    var LETTER=_.sample('IJLOSTZ'.split(''));
    var form=_.random(f.f_f[LETTER].form.length-1);
    return ({
      LETTER:LETTER,
      form:form
    });
  }
  //數據添加當前活動方塊數據
  addActiveLETTER(){
    var f=this;
    var LETTER01=f.F2(f.active,f.activeForm);
    // console.log(LETTER01);
    
    //偏移量
    var row=f.activePosition.row;
    var j=f.activePosition.j;

    //arrTetris是相對穩定的，由arrTetris與LETTER01(active)生成arrTetrisAppendActive
    f.arrTetrisAppendActive=_.cloneDeep(f.arrTetris);

    for(var rowLETTER=0;rowLETTER<LETTER01.length;rowLETTER++){
      for(var k=0;k<LETTER01[0].length;k++){
        //出現在視野中
        if(row+rowLETTER>=0){
          f.arrTetrisAppendActive[row+rowLETTER][j+k]=LETTER01[rowLETTER][k];
        }
      }
    }

    return f;
  }

  /*
  將字母轉化為01二維數組 ('4_4_4_4')
  next:下一個字母，比如'J'
  nextForm:下一個字母的形態序號，比如1
  */
  F2(next,nextForm){
    var f=this;
    var color=f.f_f[next].color;
    var LETTER=f.f_f[next].form[nextForm];
    var arr=LETTER.split('_').map(function(v){
      var arr01=[];

      // 15>>4(0) 15>>3(1) 15>>2(3) 15>>1(7) 15>>0(15)
      // 2<<0(2) 2<<1(4) 2<<2(8) 2<<3(16)
      // 4>>4(0) 4>>3(0) 4>>2(1) 4>>1(2) 4>>0(4)
      for(var bit=3;bit>=0;bit--){
        var objCell={
          color:color,
          v:0
        };
        if(v>>bit){
          //該位有值
          objCell={
            color:color,
            v:1
          };
          //減去該位餘值繼續檢測
          v=v-(2<<(bit-1));
        }
        arr01.unshift(objCell);
      }
      return (arr01);
    });
    return arr;
  }

  //監聽鍵盤
  listen(){
    var f=this;
    document.onkeydown =function(ev){
      var keyCode=(ev.keyCode);
      //32:空格（變形）
      //37:向左
      //39:向右
      //40:向下
      if(+keyCode===40){

      }
    };
    return f;
  }

} //class

var obj=new TETRIS();
obj.init();