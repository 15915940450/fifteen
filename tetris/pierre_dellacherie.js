/*
Pierre Dellacherie
*/
class PD{
  constructor(){
    this.arr3fixed=[]; //計算所有當前方塊下落固定後的數據（消除行之前）（三維數組）
  }

  init(){
    // console.log(obj);
    // console.log(obj.active);
    // this.calcLRD(obj.active);
  }
  /*calcLRD(active){
    var f=this;
    var LETTER01=obj.F2(active,obj.activeForm);
    var LR=obj.calcLR(LETTER01);
    var minJ=-LR.L;
    var maxJ=LR.R+6;
    console.log(minJ);
    return ({
      minJ:minJ,
      maxJ:maxJ,
      maxR:0
    });
  }*/
}

var dellacherie=new PD();
dellacherie.init();