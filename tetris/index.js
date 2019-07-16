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
    this.cell=40; //每個格子大小
    this.randomRow=_.random(18);  //隨機格子,false(0),1,2,3,,,18
    this.lock=false; //鎖住遊戲

    /*遊戲中的狀態*/
    this.active=null;  //當前方塊
    this.activeForm=null;  //當前方塊形態索引
    this.activePosition={ //當前方塊的位置
      row:null,
      j:3  //列
    };  //下一個方塊
    this.next=null;  //下一個方塊
    this.nextForm=null;  //下一個方塊形態索引

    this.pureRow=[];

    this.elsStatus=document.querySelectorAll('.status h4');

    this.score=0; //遊戲得分
    this.HiScore=0; //歷史最高分
    this.level=0;  //18級
    this.lines=0; //已消除的行數

    /*
    https://en.wikipedia.org/wiki/Classic_Tetris_World_Championship
    Classic Tetris World Championship
    The Classic Tetris World Championship (CTWC) is a video game competition series, hosted by the Portland Retro Gaming Expo. 
    經典俄羅斯方塊世界錦標賽 規則：
    */
    this.rule=[];  //級數規則

    this.tetrisScore=[];  //消除行數得分

    //定義方塊形狀(4*4)(IJLOSTZ)(four times four)
    this.f_f={};

  }

  init(){
    this.initRule();
    this.initArrTetris();
    this.initActive();
    this.initNext();
    this.initPureRow(); //乾淨的一行
    this.further();
    this.portrait();
    //加上當前活動方塊：arrTetrisAppendActive
    this.addActiveLETTER();
    // 渲染
    this.render();
    this.raf(); //動畫：每秒60幀
    this.listen();


    //右側文字:分數，level，行數
    this.htmlStatus();

  }

  //初始化規則
  initRule(){
    /*
    https://en.wikipedia.org/wiki/Classic_Tetris_World_Championship
    Classic Tetris World Championship
    The Classic Tetris World Championship (CTWC) is a video game competition series, hosted by the Portland Retro Gaming Expo. 
    經典俄羅斯方塊世界錦標賽 規則：
    */
    this.rule=[
      {
        level:[0],
        removeLine:10,
        frame:48
      },
      {
        level:[1],
        removeLine:20,
        frame:43
      },
      {
        level:[2],
        removeLine:30,
        frame:38
      },
      {
        level:[3],
        removeLine:40,
        frame:33
      },
      {
        level:[4],
        removeLine:50,
        frame:28
      },
      {
        level:[5],
        removeLine:60,
        frame:23
      },
      {
        level:[6],
        removeLine:70,
        frame:18
      },
      {
        level:[7],
        removeLine:80,
        frame:13
      },
      {
        level:[8],
        removeLine:90,
        frame:8
      },
      {
        level:[9],
        removeLine:100,
        frame:6
      },
      {
        level:[10,11,12],
        removeLine:100,
        frame:5
      },
      {
        level:[13,14,15],
        removeLine:100,
        frame:4
      },
      {
        level:[16],
        removeLine:110,
        frame:3
      },
      {
        level:[17],
        removeLine:120,
        frame:3
      },
      {
        level:[18],
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
        lines:1,
        name:'single',
        value:40
      },
      {
        lines:2,
        name:'double',
        value:100
      },
      {
        lines:3,
        name:'triple',
        value:300
      },
      {
        lines:4,
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
  //初始化遊戲板數據
  initArrTetris(){
    var f=this;
    //初始雜亂數據
    for(var row=0;row<f.H;row++){
      if(!this.arrTetris[row]){
        this.arrTetris[row]=[];
      }
      for(var j=0;j<f.W;j++){
        if(row>=f.H-f.randomRow){
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
    return f;
  }
  initActive(){
    var f=this;
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
  initNext(){
    var f=this;
    var next=f.gLETTER();
    f.next=next.LETTER;
    f.nextForm=next.form;
    return f;
  }
  initPureRow(){
    var f=this;
    for(var i=0;i<f.W;i++){
      f.pureRow[i]={
        color:'black',  //orchid
        v:0
      };
    }
    return f;
  }
  //改造數據(rule)
  further(){
    var f=this;
    var i=0,j=0;
    var tmp=[];
    var nowLine=0;
    for(i=0;i<f.rule.length;i++){
      for(j=0;j<f.rule[i].level.length;j++){
        // console.log(i+':'+j);
        nowLine+=f.rule[i].removeLine;
        tmp.push({
          level:f.rule[i].level[j],
          frame:f.rule[i].frame,
          nowLineLT:nowLine
        });
      }

    }

    f.rule=tmp;

    return f;
  }
  //判斷豎屏（肖像）（風景）
  portrait(){
    var f=this;
    // var CW=document.documentElement.clientWidth || document.body.clientWidth;
    // var CH=document.documentElement.clientHeight || document.body.clientHeight;
    /*if(CW<CH){
      document.querySelector('.canvas_main').style.width='59vw';
      document.querySelector('.pause').style.width='59vw';
      document.querySelector('.pause').style.height='118vw';
    }*/
    document.querySelector('.canvas_main').width=f.cell*f.W;
    document.querySelector('.canvas_main').height=f.cell*f.H;
    document.querySelector('.pause').style.width=f.cell*f.W+4+'px';
    document.querySelector('.pause').style.height=f.cell*f.H+4+'px';
    return f;
  }
  //arrTetrisAppendActive=arrTetris+LETTER01;
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
        var rowTetris=row+rowLETTER;
        var jTerris=j+k;
        if(f.checkBorder(rowTetris,jTerris)){
          if(LETTER01[rowLETTER][k].v){
            //當前方塊中的1值替換
          // if(!f.arrTetrisAppendActive[rowTetris][jTerris].v){
            //空的數據才被替換
            //{color: "#2eb788", v: 0}
            f.arrTetrisAppendActive[rowTetris][jTerris]=LETTER01[rowLETTER][k];
          }
        }
      }
    }


    return f;
  }
  // 確保arrTetris的索引
  checkBorder(rowTetris,jTerris){
    var b=(rowTetris>=0 && rowTetris<20 && jTerris>=0 && jTerris<10);
    return b;
  }
  
  //渲染：繪製canvas
  render(){
    var f=this;
    // 渲染主區
    f.renderCanvas(f.eleCanvas,f.arrTetrisAppendActive);
    
    // 渲染則區（下一個）
    f.renderCanvas(f.eleCanvasNext,f.F2(f.next,f.nextForm),22);
    return f;
  }
  //由二維數組繪製成canvas
  renderCanvas(el,arr,perW){
    var f=this;
    var arrBCC=[1,4];
    var ctx=el.getContext('2d');
    perW=perW || f.cell;
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
  


  // 動畫(handleDown)
  raf(){
    var f=this;
    var iRAF=0;
    // var t0=new Date().getTime();

    var rafCallback=function(){
      if(f.lock){
        //鎖住，不增長
        iRAF=0;
      }else{
        iRAF++;
      }
      // console.log(iRAF); //一直都在運行
      // console.log(!iRAF%48); //0
      var frame=f.rule.find(function(v){
        return (v.level===f.level);
      }).frame;
      if(+(iRAF%frame)===1){
        f.handleDown();
      }
      /*var t=new Date().getTime()-t0;  
      if(t>1000 && t<2000){

        console.log('x'); //每秒60幀
      }*/
      window.requestAnimationFrame(rafCallback);
    };
    window.requestAnimationFrame(rafCallback);
    return f;
  }


  //監聽鍵盤
  listen(){
    var f=this;
    document.onkeydown =function(ev){
      var keyCode=(ev.keyCode);

      // console.log(keyCode);
      //32:空格 (暫停)
      //38:向上（變形）

      //37:向左
      //39:向右
      //40:向下
      if(+keyCode===40 && !f.lock){
        f.handleDown();
      }
      if(+keyCode===39 && !f.lock){
        f.handleRight();
      }
      if(+keyCode===37 && !f.lock){
        f.handleLeft();
      }
      if(+keyCode===38 && !f.lock){
        f.handleForm();
      }
      if(+keyCode===32){
        f.handlePause();
      }
    };
    return f;
  }
  //處理變形
  handleForm(){
    var f=this;
    var lenForm=f.f_f[f.active].form.length;
    var tmp=f.activeForm;
    //若果是最後一個形狀，轉到第0個，否則+1
    f.activeForm=tmp>=lenForm-1?0:tmp+1;

    var b=f.check();
    if(!b){
      f.activeForm=tmp;
      return false;
    }

    f.addActiveLETTER();
    f.render();
    return f;
  }
  handleLeft(){
    var f=this;
    var tmp=f.activePosition.j;
    f.activePosition.j=f.activePosition.j-1;

    var b=f.check();
    if(!b){
      f.activePosition.j=tmp;
      return false;
    }

    f.addActiveLETTER();
    f.render();
    return f;
  }
  handleRight(){
    var f=this;
    var tmp=f.activePosition.j;
    f.activePosition.j=f.activePosition.j+1;

    var b=f.check();
    if(!b){
      f.activePosition.j=tmp;
      return false;
    }

    f.addActiveLETTER();
    f.render();
    return f;
  }
  //處理下降(定時器自動下降)
  handleDown(){
    var f=this;

    var tmp=f.activePosition.row;
    //當前行加1
    f.activePosition.row=tmp+1;

    //1.檢測是否可以繼續下降
    var b=f.check();
    if(!b){
      //不可以下降，到達底部,開始下一回合
      //2.檢測是否可以得分
      if(f.findLine().length){
        // 動畫效果 1s？
        f.animate500ms();
        //有消除得分
        f.AlexeyPazhitnovTetris();
        return false;
      }
      // 3.檢測遊戲是否結束
      if(f.checkGameOver()){
        //遊戲結束，鎖住
        f.lock=true;

        var el=document.querySelector('.pause');
        var elP=el.querySelector('p');
        el.className='pause';
        elP.innerHTML='GAME OVER';

        return false;
      }
      f.round();
    }
    //可以下降，正常渲染
    f.addActiveLETTER();
    f.render();
    

    return f;
  }
  handlePause(){
    var f=this;
    var el=document.querySelector('.pause');
    if(f.lock){
      el.className='pause hidden';
    }else{
      //遊戲暫停
      el.className='pause';
    }

    f.lock=!f.lock;
    return f;
  }

  //檢測變化後是否有重複的cell，是否出邊界
  // arrTetris,active,activeForm,activePosition
  check(){
    var f=this;
    var arrTetris=f.arrTetris;
    var active=f.active;
    var activeForm=f.activeForm;
    var activePosition=f.activePosition;
    // console.log(arrTetris);
    /*console.log(active);
    console.log(activeForm);
    console.log(activePosition);*/

    var LETTER01=f.F2(active,activeForm);
    var row=activePosition.row;
    var j=activePosition.j;
    var LR=f.calcLR(LETTER01);
    // var ____=f.f_f[active].form[activeForm];
    // console.log(LETTER01);
    // console.log(row);
    // console.log(j);
    // console.log(LR);

    //1。有重疊
    for(var rowLETTER=0;rowLETTER<LETTER01.length;rowLETTER++){
      for(var k=0;k<LETTER01[0].length;k++){
        var rowTetris=row+rowLETTER;
        var jTerris=j+k;
        //出現在視野中
        if(f.checkBorder(rowTetris,jTerris)){
          if(+LETTER01[rowLETTER][k].v && +arrTetris[rowTetris][jTerris].v){
            return false;
          }
        }
      }
    } //outer for

    //2。不超出邊界
    //下邊界
    if(row-f.calcAppearRow()>=20){
      return false;
    }
    //左右邊界
    if(j-LR.R>6 || j+LR.L<0){
      return false;
    }


    return true;
  }
  
  //下一回合
  round(){
    var f=this;
    f.arrTetris=_.cloneDeep(f.arrTetrisAppendActive);
    f.active=f.next;
    f.activeForm=f.nextForm;
    f.activePosition={
      row:f.calcAppearRow(),
      j:3
    };
    var next=f.gLETTER();
    f.next=next.LETTER;
    f.nextForm=next.form;
    return f;
  }
  /*
  俄罗斯方块的开发者是阿列克谢·帕基特诺夫，他被称为俄罗斯方块之父（Алексей Пажитнов 英文：Alexey Pazhitnov）。俄罗斯方块原名是俄语Тетрис（英语是Tetris），这个名字来源于希腊语tetra，意思是“四”，而游戏的作者最喜欢网球（tennis）。于是，他把两个词tetra和tennis合而为一，命名为Tetris，这也就是俄罗斯方块名字的由来。
  */
  //消除行，得分(修改 arrTetrisAppendActive(主要的) arrTetris)
  AlexeyPazhitnovTetris(){
    var f=this;
    // 改變 arrTetrisAppendActive
    var arrLine=f.findLine();
    var len=arrLine.length;
    if(len){
      f.arrTetrisAppendActive=f.arrTetrisAppendActive.filter(function(v,i){
        return (!arrLine.includes(i));
      });
      for(var i=0;i<len;i++){
        f.arrTetrisAppendActive.unshift(_.cloneDeep(f.pureRow));
      }
    }
    // 改變 arrTetris(可有可無，因為消除得分後立即進行下一回合 round)
    // f.arrTetris=_.cloneDeep(f.arrTetrisAppendActive);
    // 得分，行數，level
    f.lines+=len;
    f.level=f.inspectLevel();
    var score=+f.tetrisScore.find(function(v){
      return (+v.lines===len);
    }).value;
    f.score+=score;
    f.htmlStatus();

    return f;
  }




  //檢查級數
  inspectLevel(){
    var f=this;
    var level=0;
    for(var i=0;i<f.rule.length;i++){
      if(f.lines<f.rule[i].nowLineLT){
        level=f.rule[i].level;
        break;
      }
    }

    return level;
  }
  // 500毫秒的動畫
  animate500ms(){
    var f=this;
    //先鎖住
    f.lock=true;

    var arrAnimate=_.cloneDeep(f.arrTetrisAppendActive);
    var arrAnimate0=_.cloneDeep(f.arrTetrisAppendActive);

    var arrLine=f.findLine();
    for(var i=0;i<arrLine.length;i++){
      //消失
      arrAnimate[arrLine[i]]=_.cloneDeep(f.pureRow);
      /*arrAnimate[arrLine[i]]=_.cloneDeep(f.pureRow).map(function(v){
        v.color='midnightblue';
        v.v=1;
        return v;
      });*/
    }

    //立馬消失
    f.renderCanvas(f.eleCanvas,arrAnimate);
    // 出現
    window.setTimeout(function(){
      f.renderCanvas(f.eleCanvas,arrAnimate0);
    },100);
    // 消失
    window.setTimeout(function(){
      f.renderCanvas(f.eleCanvas,arrAnimate);
    },300);
    // 出現
    window.setTimeout(function(){
      f.renderCanvas(f.eleCanvas,arrAnimate0);
      //放開鎖定
      f.lock=false;
    },500);

    return f;
  }
  //查找消除哪些行
  findLine(){
    var f=this;
    var arrLine=[];
    for(var i=0;i<f.arrTetrisAppendActive.length;i++){
      var isEvery1=f.arrTetrisAppendActive[i].every(function(v){
        return (+v.v===1);
      });
      if(isEvery1){
        arrLine.push(i);
      }
    }
    
    return arrLine;
  }
  // 檢測遊戲結束(arrTetrisAppendActive 第0行 第3-6列的值是否有1)
  checkGameOver(){
    var b=false;
    var arr0=this.arrTetrisAppendActive[0];
    for(var i=3;i<=6;i++){
      if(+arr0[i].v){
        b=true;
        break;
      }
    }
    return b;
  }
  //得分等等界面
  htmlStatus(){
    var f=this;
    f.elsStatus[0].innerHTML=this.score;
    f.elsStatus[1].innerHTML=this.level;
    f.elsStatus[2].innerHTML=this.lines;
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
  // 計算當前活動方塊左右空值
  calcLR(LETTER01){
    var i;
    var L=0;
    var R=0;
    var LETTER10=[];
    for(i=0;i<LETTER01.length;i++){
      LETTER10[i]=LETTER10[i] || [];
      for(var j=0;j<LETTER01[0].length;j++){
        LETTER10[i][j]=LETTER01[j][i];
      }
    }
    var LETTER=LETTER10.map(function(v){
      return (_.sumBy(v,function(v2){
        return (v2.v);
      }));
    });
    // console.log(LETTER);
    for(i=0;i<LETTER.length;i++){
      if(!LETTER[i]){
        L++;
      }else{
        break;
      }
    }
    for(i=LETTER.length;i>0;i--){
      if(!LETTER[i-1]){
        R++;
      }else{
        break;
      }
    }
    // console.log(L);
    // console.log(R);
    return ({
      L:L,
      R:R
    });
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
  } //method F2
  



} //class

var obj=new TETRIS();
obj.init();