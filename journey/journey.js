class Journey{
  constructor(){
    this.arrStep=[];  //0，1,2,3,,,63(記錄每一步)

    this.direction=[
      {
        xPlus:2,
        yPlus:-1,
        greedLevel:0,
        ZH:'右下'
      },
      {
        xPlus:1,
        yPlus:-2,
        greedLevel:0,
        ZH:'下右'
      },
      {
        xPlus:-1,
        yPlus:-2,
        greedLevel:0,
        ZH:'下左'
      },
      {
        xPlus:-2,
        yPlus:-1,
        greedLevel:0,
        ZH:'左下'
      },
      {
        xPlus:-2,
        yPlus:1,
        greedLevel:0,
        ZH:'左上'
      },
      {
        xPlus:-1,
        yPlus:2,
        greedLevel:0,
        ZH:'上左'
      },
      {
        xPlus:1,
        yPlus:2,
        greedLevel:0,
        ZH:'上右'
      },
      {
        xPlus:2,
        yPlus:1,
        greedLevel:0,
        ZH:'右上'
      }
    ];  //八個方向
    this.gth=8; //棋盤大小8*8
    
    this.okay=false;  //是否已經找到解
  }

  solve(){
    var es6This=this;
    //第0步：x和y都為0的位置開始跳
    es6This.okay=es6This.nextStep({
      step:0,
      x:0,
      y:0
    });
    return es6This;
  }

  nextStep(stepInfo){
    var es6This=this;
    //step:0,1,2,3,4,,,64
    if(stepInfo.step>=6){
      //走完64步，成功
      return true;
    }

    //當前步信息存貯到 arrStep
    es6This.arrStep[stepInfo.step]=stepInfo;

    //下一步8個位置（分支）
    for(var dir=0;dir<8;dir++){
      var nextStepInfo={
        step:stepInfo.step+1,
        x:stepInfo.x+es6This.direction[dir].xPlus,
        y:stepInfo.y+es6This.direction[dir].yPlus
      };
      //檢查該位置是否可以跳
      if(!es6This.check(nextStepInfo)){
        //不可以跳，嘗試下一個位置
        continue;
      }
      //可以跳，下一步
      var success=es6This.nextStep(nextStepInfo);

      //回溯，還原數組arrStep
      if(!success){
        es6This.arrStep.length=stepInfo.step+1;
        continue;
      }

      //遞歸結束，跳完64步，已經找到一個解，退出循環
      return true;

    }
    //所有分支都試了
    return false;
    

    
  }

  check(stepInfo){
    var es6This=this;
    //1.超出邊界
    if(stepInfo.x>=8 || stepInfo.y>=8 || stepInfo.x<0 || stepInfo.y<0){
      return false;
    }
    //2.已經走過
    var some=es6This.arrStep.some(function(v){
      return (v.x===stepInfo.x && v.y===stepInfo.y);
    });
    return !some;
  }

  xy2step(){
    var es6This=this;
    es6This.arrStep=es6This.arrStep.map(function(v){
      var cellIndex;
      cellIndex=v.x+v.y*8;
      return ({
        cellIndex:cellIndex,
        x:v.x,
        y:v.y,
        step:v.step
      });
    }).sort(function(a,b){
      return (a.cellIndex-b.cellIndex);
    });
    var arrTemp=[];
    for(var i=0;i<64;i++){
      var ele=es6This.arrStep.find(function(v){
        return (v.cellIndex===i);
      });
      if(ele){
        arrTemp[i]=ele;
      }else{
        arrTemp[i]={
          cellIndex:i,
          step:-1
        };
      }
    }
    es6This.arrStep=arrTemp;
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
console.log(JSON.stringify(obj.arrStep));
console.log(obj.okay);


