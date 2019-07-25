/*
Pierre Dellacherie
*/
class PD{
  constructor(){
    this.arr3fixed=[]; //計算所有當前方塊下落固定後的數據（消除行之前）（三維數組）
    this.C=[
      {
        name:'Landing Height',
        value:-4.500158825082766
      },
      {
        name:'Rows eliminated',
        value:3.4181268101392694
      },
      {
        name:'Row Transitions',
        value:-3.2178882868487753
      },
      {
        name:'Column Transitions',
        value:-9.348695305445199
      },
      {
        name:'Number of Holes',
        value:-7.899265427351652
      },
      {
        name:'Well Sums',
        value:-3.3855972247263626
      }
    ];
  }

  init(){
    // this.calcD(obj.active,obj.activeForm,obj.activePosition.j);
    this.calc3();
    //可視化所有落腳點
    this.raf();
  }
  calc3(){
    var f=this;
    //初始化
    this.arr3fixed=[];
    var active=obj.active;  //"j"
    var form=obj.f_f[active].form;
    // 當前字母的所有變形，方塊可移動的最左到最右
    for(var formIndex=0;formIndex<form.length;formIndex++){
      for(var j=form[formIndex].minJ;j<=form[formIndex].maxJ;j++){
        var row=f.calcD(active,formIndex,j);
        f.arr3fixed.push({
          row:row,
          j:j,
          LETTER:active,
          form:formIndex,
          AI:f.calcAI({
            row:row,
            j:j,
            LETTER:active,
            form:formIndex
          })
          /*,
          arr:f.addLETTER({
            row:row,
            j:j,
            LETTER:active,
            form:formIndex
          })*/
        });
      }
      
    }
    console.log(f.arr3fixed);
    return f;

  }
  calcAI(param){
    var f=this;
    var arrFixed=f.addLETTER(param);
    var AI=f.LandingHeight(arrFixed)*f.C[0].value+
           f.RowsEliminated(arrFixed)*f.C[1].value+
           f.RCTransitions(arrFixed)*f.C[2].value+
           f.RCTransitions(arrFixed,true)*f.C[3].value+
           f.Holes(arrFixed)*f.C[4].value+
           f.Well(arrFixed)*f.C[5].value;
    
    return AI;
  }
  addLETTER(param){
    var LETTER01=obj.F2(param.LETTER,param.form);
    var row=param.row;
    var j=param.j;

    var arrTetrisAppendFixed=_.cloneDeep(obj.arrTetris);

    for(var rowLETTER=0;rowLETTER<LETTER01.length;rowLETTER++){
      for(var k=0;k<LETTER01[0].length;k++){
        var rowTetris=row+rowLETTER;
        var jTerris=j+k;
        if(obj.checkBorder(rowTetris,jTerris)){
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
    var UD=obj.f_f[LETTER].form[formIndex];
    var b=true;

    for(var i=0-UD.up;i<=20;i++){
      b=obj.check({
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
    // obj.renderCanvas(f.arr3fixed[rad].arr);
    obj.renderCanvas(f.addLETTER({
      row:f.arr3fixed[rad].row,
      j:f.arr3fixed[rad].j,
      LETTER:f.arr3fixed[rad].LETTER,
      form:f.arr3fixed[rad].form
    }));
    console.log(f.arr3fixed[rad].AI);
    return f;
  }
  //固定的數據消除行衍生的數據
  calcARReliminated(arrFixed){
    var arrEliminated=_.cloneDeep(arrFixed);
    var arrLine=obj.findLine(arrFixed);
    var len=arrLine.length;
    if(len){
      arrEliminated=arrFixed.filter(function(v,i){
        return (!arrLine.includes(i));
      });
      for(var i=0;i<len;i++){
        arrEliminated.unshift(_.cloneDeep(obj.pureRow));
      }
    }
    return arrEliminated;
  }


  /*
    Landing Height:3,4,5,6列最高點所在的row索引
  */
  LandingHeight(arrFixed){
    var f=this;
    var H=-1;
    //消除行
    var arrEliminated=f.calcARReliminated(arrFixed);
    
    forRow:
    for(var i=0;i<arrEliminated.length;i++){
      for(var j=3;j<=6;j++){
        // console.log(i,j,arrEliminated[i][j].v);
        if(arrEliminated[i][j].v){
          H=i;
          break forRow;
        }
      }
    }

    // console.log(H);
    return (20-H);
  }
  /*
    Rows eliminated:消行层数与当前方块贡献出的方格数乘积
  */
  RowsEliminated(arrFixed){
    var arrLine=obj.findLine(arrFixed);
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
  RCTransitions(arrFixed,isC){
    var f=this;
    var arrEliminated=f.calcARReliminated(arrFixed);
    if(isC){
      arrEliminated=obj.ijji(arrEliminated);
    }
    var arrT=arrEliminated.map(function(v){
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
    var f=this;
    var arrEliminated=f.calcARReliminated(arrFixed);
    var arrIJJI=obj.ijji(arrEliminated);
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
  /*
    Well:两边皆有方块的空列。该指标为所有井的深度连加到1再求总和 注意一列中可能有多个井
  */
  Well(arrFixed){
    var f=this;
    var arrEliminated=f.calcARReliminated(arrFixed);
    var arrIJJI=obj.ijji(arrEliminated);
    
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





}

var dellacherie=new PD();
dellacherie.init();
