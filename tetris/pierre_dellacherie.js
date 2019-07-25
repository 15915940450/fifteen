/*
Pierre Dellacherie
*/
class PD{
  constructor(){
    this.arr3fixed=[]; //計算所有當前方塊下落固定後的數據（消除行之前）（三維數組）
  }

  init(){
    // this.calcD(obj.active,obj.activeForm,obj.activePosition.j);
    this.calc3();
    //可視化所有落腳點
    // this.raf();
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
          arr:f.addLETTER({
            row:row,
            j:j,
            LETTER:active,
            form:formIndex
          })
        });
      }
      
    }
    console.log(f.arr3fixed);
    return f;

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
    obj.renderCanvas(f.arr3fixed[rad].arr);
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
    //1.消除行
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
    return (H);
  }
}

var dellacherie=new PD();
dellacherie.init();
dellacherie.LandingHeight(dellacherie.arr3fixed[0].arr);