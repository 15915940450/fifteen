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
      b=obj.check(LETTER,formIndex,{row:i,j:j});
      if(!b){
        row=i;
        break;
      }
    }
    return (row-1);
  }
}

var dellacherie=new PD();
dellacherie.init();