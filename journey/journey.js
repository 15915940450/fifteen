class Journey{
  constructor(){
    this.arrX=[1,2,2,1,-1,-2,-2,-1];  //橫軸
    this.arrY=[2,1,-1,-2,2,1,-1,-2];  //豎軸
    this.chessboardLen=8;
    this.arrStep=[];  //0，1,2,3,,,63
    this.arrXY=[];  //記錄每一步的坐標xy
  }

  solve(){
    var es6This=this;
    es6This.nextStep(0,0,0);
    return es6This;
  }

  nextStep(step,x,y){
    var es6This=this;
    //step:0,1,2,3,4,,,64
    if(step>=64){
      //走完64步，成功
      return true;
    }

    //當前步信息
    es6This.arrXY[step]={
      step:step,
      x:x,
      y:y
    };
    // console.log(step);
    // console.log(JSON.stringify(es6This.arrXY));

    //下一步8個位置（分支）
    for(var dir=0;dir<8;dir++){
      var nextX=x+es6This.arrX[dir];
      var nextY=y+es6This.arrY[dir];
      //檢查該位置是否可以跳
      if(!es6This.check(nextX,nextY,step)){
        //不可以跳，嘗試下一個位置
        continue;
      }
      //可以跳，下一步
      var success=es6This.nextStep(step+1,nextX,nextY);

      //回溯
      if(!success){
        // es6This.arrXY.length=step;
        continue;
      }

      //遞歸結束，跳完64步，已經找到一個解，退出循環
      return true;

    }
    //所有分支都試了
    return false;
    

    
  }

  check(x,y,step){

    
    var es6This=this;
    //超出邊界
    if(x>=8 || y>=8 || x<0 || y<0){
      return false;
    }
    //已經走過
    // es6This.arrXY.length=step+1;
    // console.log(x,y,step);
    // for(var ii=0;ii<step+1;ii++){
    //   if(es6This.arrXY[ii].x===x && es6This.arrXY[ii].y===y){
    //     return false;
    //   }
    // }
    // var some=es6This.arrXY.some(function(v){
    //   return (v.x===x && v.y===y);
    // });
    // console.log(some);
    // if(some){
    //   return false;
    // }
    // es6This.arrXY.length=step+1;
    // var index=es6This.arrXY.findIndex(function(v){
    //   // console.log(v);
    //   if(v){
    //     return (v.x===x && v.y===y);
    //   }
    // });

    // if(index!==-1){
    //   return false;
    // }
    // if(step===52){
    //   this.arrXY.length=52;
    //   console.log(step);
    // console.log(JSON.parse(JSON.stringify(this.arrXY)));
    // console.log(index);
    // }
    return true;
  }

  xy2step(){
    var es6This=this;
    es6This.arrStep=es6This.arrXY.map(function(v){
      var cellIndex;
      cellIndex=v.x+v.y*8;
      return ({
        cellIndex:cellIndex,
        step:v.step
      });
    }).sort(function(a,b){
      return (a.cellIndex-b.cellIndex);
    });
    return es6This;
  }
  html(){
    var es6This=this;
    es6This.xy2step();
    var arrCell=es6This.arrStep.map(function(v,i){
      // console.log(v);
      var oddEven='';
      //第偶數行的奇數列 或者 第奇數行的偶數列  (0-base)
      //單目運算符 > 雙目運算符（*/% > +- > >>> > > > === > & > ^ > | > && > || > ?: > ^= > ,）
      if(i&1^i>>>3&1){
        oddEven=' black_cell';
      }
      return (`<div class="cell${oddEven}">${v.step}</div>`);
    });
    var strCell=arrCell.join('');
    document.getElementById('container').innerHTML=strCell;
    return es6This;
  }
} //class

var obj=new Journey();
obj.solve().html();
// console.log(obj.arrXY);
// console.log(obj.arrStep);

// console.log(JSON.stringify(obj.arrXY));

