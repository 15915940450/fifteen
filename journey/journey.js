class Journey{
  constructor(){
    this.arrX=[1,2,2,1,-1,-2,-2,-1];  //橫軸
    this.arrY=[2,1,-1,-2,2,1,-1,-2];  //豎軸
    this.chessboardLen=8;
    this.arrStep=[];  //1,2,3,,,64
  }

  step64(){
    var es6This=this;
    es6This.arrStep.length=Math.pow(es6This.chessboardLen,2);
    es6This.arrStep.fill(null);
    es6This.arrStep=_.shuffle(es6This.arrStep.map(function(v,i){
      return (i+1);
    }));
    return es6This;
  }
  check(){
    var pass=true;
    return pass;
  }

  html(){
    var es6This=this;
    var arrCell=es6This.arrStep.map(function(step,i){
      var oddEven='';
      //第偶數行的奇數列 或者 第奇數行的偶數列  (0-base)
      if((!!(i & 1) && !((i/es6This.chessboardLen) & 1)) || (!(i & 1) && !!((i/es6This.chessboardLen) & 1))){
        oddEven=' black_cell';
      }
      return (`<div class="cell${oddEven}">${step}</div>`);
    });
    var strCell=arrCell.join('');
    document.getElementById('container').innerHTML=strCell;
    return es6This;
  }
} //class

var obj=new Journey();
obj.check();
obj.step64().html();
