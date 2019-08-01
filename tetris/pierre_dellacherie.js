/*
Pierre Dellacherie
*/

export default class PD{
  constructor(obj){
    this.arr3fixed=[]; //計算所有當前方塊下落固定後的數據（消除行之前）（三維數組）
    this.C=[
      {
        index:0,
        name:'Landing Height',
        value:-4.500158825082766
      },
      {
        index:1,
        name:'Rows eliminated',
        value:0.718281828
      },
      {
        index:2,
        name:'Row Transitions',
        value:-3.2178882868487753
      },
      {
        index:3,
        name:'Column Transitions',
        value:-9.348695305445199
      },
      {
        index:4,
        name:'Number of Holes',
        value:-7.899265427351652
      },
      {
        index:5,
        name:'Well Sums',
        value:-3.3855972247263626
      },
      {
        index:6,
        name:'calcHighestHoleAndBlocksAboveHighestHole',
        value:-8
      }
    ];
    this.obj=obj;
  }

  init(){
    this.calc3();
    //可視化所有落腳點
    var theone=this.hint();
    if(this.obj.dev){
      this.raf();
    }
    return (theone);
  }
  //獲取最高分
  hint(){
    var f=this;
    var initN=-1e9;
    var result;
    var len=f.arr3fixed.length;
    for(var i=0;i<len;i++){
      if(f.arr3fixed[i].AI>initN){
        initN=f.arr3fixed[i].AI;
        result=f.arr3fixed[i];
        result.index=i;
      }
    }
    
    return result;
  }
  /*
  計算所有情況,生成arr3fixed
  */
  calc3(){
    var f=this;
    //初始化
    this.arr3fixed=[];
    var active=this.obj.active;  //"j"
    var form=this.obj.f_f[active].form;
    // 當前字母的所有變形，方塊可移動的最左到最右
    for(var formIndex=0;formIndex<form.length;formIndex++){
      for(var j=form[formIndex].minJ;j<=form[formIndex].maxJ;j++){
        var row=f.calcD(active,formIndex,j);

        var arr0=f.addLETTER({
          row:row,
          j:j,
          LETTER:active,
          form:formIndex
        });
        //排除gameover的情況
        if(!f.obj.checkGameOver(arr0[0])){
          f.arr3fixed.push({
            row:row,
            j:j,
            LETTER:active,
            form:formIndex,
            // arr:arr0,
            AI:f.calcAI({
              row:row,
              j:j,
              LETTER:active,
              form:formIndex
            })
          });
        }else{
          // console.log(JSON.stringify(arr0[0]));
          //[{"color":"black","v":0},{"color":"black","v":0},{"color":"black","v":0},{"color":"black","v":0},{"color":"black","v":0},{"color":"black","v":0},{"color":"black","v":0},{"color":"black","v":0},{"color":"black","v":0},{"color":"midnightblue","v":1}]
          /*var str01=arr0[0].map(function(v){
            var x=v.v;
            if(v.color==='midnightblue'){
              x=''+v.v;
            }
            return (x);
          });
          console.log(str01);*/
        }

        
      }
      
    }
    // console.log(f.arr3fixed);
    return f;

  }
  calcAI(param){
    var f=this;
    var arrFixed=f.addLETTER(param);
    // f.RCTransitions(arrFixed)
    var objHighestHole=f.calcHighestHoleAndBlocksAboveHighestHole(arrFixed);
    var AI=f.RowsEliminated(arrFixed)*f.C[1].value*(this.obj.HIGHEST-9)+
           f.RCTransitions(arrFixed)*f.C[2].value+
           f.RCTransitions(arrFixed,true)*f.C[3].value+
           f.Holes(arrFixed)*f.C[4].value+
           f.Well(arrFixed)*f.C[5].value+
           objHighestHole.fixedHighestHole*f.C[6].value+
           objHighestHole.sumBlocksAboveHighestHole*f.C[6].value/4+
           f.LandingHeight(arrFixed)*f.C[0].value;
    
    // console.log(arrFixed);
    return AI;
  }
  addLETTER(param){
    var LETTER01=this.obj.F2(param.LETTER,param.form);
    var row=param.row;
    var j=param.j;

    var arrTetrisAppendFixed=_.cloneDeep(this.obj.arrTetris);

    for(var rowLETTER=0;rowLETTER<LETTER01.length;rowLETTER++){
      for(var k=0;k<LETTER01[0].length;k++){
        var rowTetris=row+rowLETTER;
        var jTerris=j+k;
        if(this.obj.checkBorder(rowTetris,jTerris)){
          if(LETTER01[rowLETTER][k].v){
            LETTER01[rowLETTER][k].color='midnightblue';
            arrTetrisAppendFixed[rowTetris][jTerris]=LETTER01[rowLETTER][k];
          }
        }
      }
    }
    return arrTetrisAppendFixed;
  }
  //計算方塊在j列下最多可下落的row
  calcD(LETTER,formIndex,j){
    var row=0;
    var UD=this.obj.f_f[LETTER].form[formIndex];
    var b=true;

    for(var i=0-UD.up;i<=20;i++){
      b=this.obj.check({
        active:LETTER,
        activeForm:formIndex,
        row:i,
        j:j
      });
      if(!b){
        row=i;
        break;
      }
    }
    return (row-1);
  }

  //落腳點動畫
  raf(){
    var f=this;
    var rad=0;
    var frame=20;
    var rafCallback=function(){
      //also time
      rad++;
      var index=(rad/frame)>>0;
      if(rad<1e4){
        if(+(rad%frame)===1 && index<f.arr3fixed.length){
          f.drawFixed(index);
        }
        window.requestAnimationFrame(rafCallback);
      }
    };
    window.requestAnimationFrame(rafCallback);
    return f;
  }
  drawFixed(rad){
    var f=this;
    var el=document.querySelector('.canvas_ai');
    this.obj.renderCanvas(f.addLETTER({
      row:f.arr3fixed[rad].row,
      j:f.arr3fixed[rad].j,
      LETTER:f.arr3fixed[rad].LETTER,
      form:f.arr3fixed[rad].form
    }),30,el);
    // console.log(f.arr3fixed[rad].AI);
    return f;
  }
  //固定的數據消除行衍生的數據
  calcARReliminated(arrFixed){
    var arrEliminated=_.cloneDeep(arrFixed);
    var arrLine=this.obj.findLine(arrFixed);
    var len=arrLine.length;
    if(len){
      arrEliminated=arrFixed.filter(function(v,i){
        return (!arrLine.includes(i));
      });
      for(var i=0;i<len;i++){
        arrEliminated.unshift(_.cloneDeep(this.obj.pureRow));
      }
    }
    return arrEliminated;
  }


  /*
  Landing Height: The height at which the last Tetromino has been placed.
  */
  LandingHeight(arrFixed){
    var H=-1;

    forRow:
    for(var i=0;i<arrFixed.length;i++){
      for(var j=0;j<arrFixed[0].length;j++){
        if(arrFixed[i][j].color==='midnightblue'){
          H=20-i;
          break forRow;
        }
      }
    }

    // console.log(H);
    return (H);
  }
  /*
  Rows eliminated:消行层数与当前方块贡献出的方格数乘积
  */
  RowsEliminated(arrFixed){
    var arrLine=this.obj.findLine(arrFixed);
    var numLine=arrLine.length;
    var numFixed=0;
    arrLine.forEach(function(v){
      arrFixed[v].forEach(function(v2){
        if(v2.color==='midnightblue'){
          numFixed++;
        }
      });
    });
    // console.log(numFixed);

    return (numFixed*numLine);
  }

  /*
  Row Transitions:行变换从一定程度上反映出一行的平整程度，越平整值越小
    Column Transitions:列变换从一定程度上反映出一列中空洞的集中程度，空洞越集中值越小
  */
  RCTransitions(paramFixed,isC){
    //因住改變數組數據
    var arrFixed=_.cloneDeep(paramFixed);
    // var arrFixed=paramFixed;
    if(isC){
      arrFixed=this.obj.ijji(arrFixed);
    }
    var arrT=arrFixed.map(function(v){
      var t=0;
      //游戏池边界算作有方块
      var obj_1={color: 'white', v: 1};
      v.push(obj_1);
      v.unshift(obj_1);
      for(var i=0;i<v.length-1;i++){
        if(+v[i].v!==+v[i+1].v){
          t++;
        }
      }
      return t;
    });
    // console.log(arrT);
    return _.sum(arrT);
  }
  /*
  Holes:A hole is an empty cell that has at least one filled cell above it in the same column.
  */
  Holes(arrFixed){
    var arrIJJI=this.obj.ijji(arrFixed);
    // console.log(arrIJJI);
    var arrH=arrIJJI.map(function(v){
      var H=0,i,max1=20;
      for(i=0;i<v.length;i++){
        if(+v[i].v){
          max1=i; //最高的1值索引
          break;
        }
      }

      for(i=v.length-1;i>0;i--){
        if(!+v[i].v && i>max1){
          //該值為0，該索引大於max1
          H++;
        }
      }

      return H;
    });

    // console.log(arrH);


    return _.sum(arrH);
  }
  calcHighestHoleAndBlocksAboveHighestHole(arrFixed){
    var arrEliminated=this.calcARReliminated(arrFixed);
    var i,j,lenI=arrEliminated.length,lenJ=arrEliminated[0].length;
    var fixedHighestHole=1e2;
    var oHighestHole=1e2;
    var arrHighestHole=[];

    //step1:arrHighestHole
    forRow:
    for(i=1;i<lenI;i++){
      for(j=0;j<lenJ;j++){
        var c1=(+arrEliminated[i][j].v===0); //該行沒有方塊
        var c2=(+arrEliminated[i-1][j].v===1); //上一行為有方塊
        var c3=(arrEliminated[i-1][j].color!=='midnightblue'); //不是新產生的空洞
        if(c1 && c2){
          if(i<fixedHighestHole){
            fixedHighestHole=(i);
          }
          if(i<oHighestHole && c3){
            oHighestHole=i; //原有局面空洞的高度(上到下)
            break forRow;
          }
        }
      }
    }

    // console.log(oHighestHole);
    if(oHighestHole===1e2){
      return ({
        oHighestHole:0,
        fixedHighestHole:0,
        sumBlocksAboveHighestHole:0
      });
    }

    //step2:BlocksAboveHighestHole
    var arrRow=[];
    arrEliminated[oHighestHole].forEach(function(v,i){
      if(!+v.v){
        arrRow.push(i);
      }
    });
    var arrIJJI=this.obj.ijji(arrEliminated);
    arrHighestHole=arrRow.map(function(v){
      var BlocksAboveHighestHole=0;
      var arrCol=arrIJJI[v];
      for(i=0;i<oHighestHole;i++){
        if(+arrCol[i].v){
          BlocksAboveHighestHole++;
        }
      }
      return ({
        col:v,
        BlocksAboveHighestHole:BlocksAboveHighestHole
      });
    });
    // console.log(arrHighestHole);

    var sumBlocksAboveHighestHole=(_.sumBy(arrHighestHole,'BlocksAboveHighestHole'));
    var result={
      oHighestHole:20-oHighestHole,
      fixedHighestHole:20-fixedHighestHole,
      sumBlocksAboveHighestHole:sumBlocksAboveHighestHole
    };
    // console.log(result);
    return (result);
  }
  /*
  Well:两边皆有方块的空列。该指标为所有井的深度连加到1再求总和 注意一列中可能有多个井
  */
  Well(arrFixed){
    var f=this;
    var arrEliminated=f.calcARReliminated(arrFixed);
    var arrIJJI=this.obj.ijji(arrEliminated);
    
    var arrWell=arrIJJI.map(function(v,index){
      var arrW=[];
      for(var i=0;i<v.length;i++){
        //非首尾列
        var b1=(index<=8 && index>=1 && !+v[i].v && +arrIJJI[index-1][i].v && +arrIJJI[index+1][i].v);
        var b2=(index===0 && !+v[i].v && +arrIJJI[index+1][i].v);
        var b3=(index===9 && !+v[i].v && +arrIJJI[index-1][i].v);
        if(b1 || b2 || b3){
          arrW.push('WELL');
        }else{
          arrW.push(0);
        }
      }
      return arrW.reverse();
    });
    arrWell=arrWell.map(function(v){
      var arrResult=[];
      var arrWellNum=0;
      for(var i=0;i<v.length-1;i++){
        if(v[i]==='WELL'){
          arrWellNum++;
          if(!v[i+1]){
            arrResult.push(f.sumNumTo1(arrWellNum));
            arrWellNum=0;
          }
        }
      }
      return (arrResult);
    });
    arrWell=arrWell.map(function(v){
      return (_.sum(v));
    });

    return _.sum(arrWell);
  }
  //數字num一直加到1
  sumNumTo1(num){
    var result=0;
    for(var i=num;i>0;i--){
      result+=i;
    }
    return (result);
  }





} //class PD

