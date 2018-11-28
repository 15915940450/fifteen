class Journey{
  constructor(){
    this.arrX=[1,2,2,1,-1,-2,-2,-1];  //橫軸
    this.arrY=[2,1,-1,-2,2,1,-1,-2];  //豎軸
    this.chessboardLen=8;
    this.arrStep=[];  //1,2,3,,,64
    this.arrXY=[];  //記錄每一步的坐標xy
  }

  solve(){
    var es6This=this;
    es6This.nextStep(0);
    return es6This;
  }

  nextStep(step){
    var es6This=this;
    //step:0,1,2,3,4,,,64
    if(step>=6){
      //走完64步，成功
      return true;
    }

    //當前步信息
    es6This.arrXY[step]={
      step:step,
      x:0,
      y:0
    };
    this.arrStep.push(step);

    //下一步8個位置（分支）
    for(var cell=0;cell<8;cell++){
      //檢查該位置是否可以跳
      if(!es6This.check(cell)){
        //不可以跳，嘗試下一個位置
        continue;
      }
      //可以跳，下一步
      var success=es6This.nextStep(step+1);

      //回溯
      if(!success){
        continue;
      }

      //遞歸結束，跳完64步，已經找到一個解，退出循環
      return true;

    }
    //所有分支都試了
    return false;
    

    
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
  check(cell){
    var pass=true;
    return pass;
  }

  html(){
    var es6This=this;
    var arrCell=es6This.arrStep.map(function(step,i){
      var oddEven='';
      //第偶數行的奇數列 或者 第奇數行的偶數列  (0-base)
      //單目運算符 > 雙目運算符（*/% > +- > >>> > > > === > & > ^ > | > && > || > ?: > ^= > ,）
      if(i&1^i>>>3&1){
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
obj.solve().html();
