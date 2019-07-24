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
          arr:obj.addActiveLETTER({
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
  //計算方塊在j列下最多可下落的row
  calcD(LETTER,formIndex,j){
    var row=0;
    var up=obj.f_f[LETTER].form[formIndex].up;
    var b=true;

    for(var i=0;i<20;i++){
      b=obj.check(LETTER,formIndex,{row:(i-up),j:j});
      if(!b){
        row=i-1;
        break;
      }
    }
    return (row);
  }
}

var dellacherie=new PD();
dellacherie.init();