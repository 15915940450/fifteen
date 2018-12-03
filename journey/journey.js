class Journey{
  constructor(){
    this.arrStep=[];  //(記錄每一步)

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
      x:Math.random()*es6This.gth>>0,
      y:Math.random()*es6This.gth>>0
    });
    return es6This;
  }

  nextStep(stepInfo){
    var es6This=this;

    //當前步信息存貯到 arrStep
    es6This.arrStep[stepInfo.step]=stepInfo;

    //step:0,1,2,3,4,,,63,走完64步，成功
    if(stepInfo.step===Math.pow(es6This.gth,2)-1){
      return true;
    }



    //=====下一步8個位置（分支）(貪心選擇)
    var arrDirGreed=es6This.dirGreed(stepInfo);


    for(var dir=0;dir<arrDirGreed.length;dir++){
      // var nextStepInfo={
      //   step:stepInfo.step+1,
      //   x:stepInfo.x+arrDirGreed[dir].xPlus,
      //   y:stepInfo.y+arrDirGreed[dir].yPlus
      // };
      // //檢查該位置是否可以跳
      // if(!es6This.check(nextStepInfo)){
      //   //不可以跳，嘗試下一個位置
      //   continue;
      // }
      //可以跳，下一步
      var success=es6This.nextStep(JSON.parse(arrDirGreed[dir].nextStepInfo));

      //回溯，還原數組arrStep
      if(!success){
        console.log('回溯:'+stepInfo.step);
        es6This.arrStep.length=stepInfo.step+1;
        continue;
      }

      //遞歸結束，跳完64步，已經找到一個解，退出循環
      return true;

    }
    //所有分支都試了
    return false;

  }
  //貪心計算:返回目前爲止最優的下一步數組集合，按貪心級別從高到低排序
  dirGreed(stepInfo){
    var es6This=this;
    var arrDirGreed=es6This.direction.map(function(v){
      //八個方向上其中的一個點
      var nextStepInfo=es6This.getNextStep(stepInfo,v);
      var greedLevel=0;

      if(es6This.check(nextStepInfo)){
        //該點有多少個不通的出口？
        greedLevel=_.compact(es6This.direction.map(function(v2){
          return (!es6This.check(es6This.getNextStep(nextStepInfo,v2)));
        })).length;
      }

      return (Object.assign({},v,{
        nextStepInfo:JSON.stringify(nextStepInfo),
        greedLevel:greedLevel
      }));

    }).filter(function(v){
      //過濾掉不符合條件的下一步
      return (v.greedLevel);
    }).sort(function(a,b){
      return (b.greedLevel-a.greedLevel);
    });

    // console.log(arrDirGreed);
    return arrDirGreed;
  }
  getNextStep(currentStep,objDirection){
    return ({
      step:currentStep.step+1,
      x:currentStep.x+objDirection.xPlus,
      y:currentStep.y+objDirection.yPlus
    });
  }
  

  check(stepInfo){
    var es6This=this;
    //1.超出邊界
    // if(stepInfo.x>=8 || stepInfo.y>=8 || stepInfo.x<0 || stepInfo.y<0){
    if(stepInfo.x>>>3 || stepInfo.y>>>3){
      return false;
    }
    //2.已經走過
    var isJumped=es6This.arrStep.some(function(v){
      return (v.x===stepInfo.x && v.y===stepInfo.y);
    });
    return !isJumped;
  }

  
  html(){
    var es6This=this;
    var arrCell=es6This.step2cell();
    console.log(arrCell);

    var strCell=arrCell.map(function(v,i){
      //第偶數行的奇數列 或者 第奇數行的偶數列  (0-base)
      //單目運算符 > 雙目運算符（*/% > +- > >>> > > > === > & > ^ > | > && > || > ?: > ^= > ,）
      var oddEven='';
      if(i&1^i>>>3&1){
        oddEven=' black_cell';
      }
      return (`<div class="cell${oddEven}">${v.step}</div>`);
    }).join('');
    document.getElementById('container').innerHTML=strCell;
    return es6This;
  }
  //將步數數組（解）轉化為按單元格排序的數組
  step2cell(){
    var es6This=this;
    var arrCell=[];
    if(es6This.arrStep.length===Math.pow(es6This.gth,2)){
      arrCell=es6This.arrStep.map(function(v){
        return (Object.assign({
          cellIndex:v.x+v.y*es6This.gth
        },v));
      }).sort(function(a,b){
        return (a.cellIndex-b.cellIndex);
      });
    }else{
      //測試，如果沒走完64步
      for(var i=0;i<Math.pow(es6This.gth,2);i++){
        var ele=es6This.arrStep.find(function(v){
          return (v.x+v.y*es6This.gth===i);
        });
        if(ele){
          arrCell[i]=Object.assign({
            cellIndex:i
          },ele);
        }else{
          arrCell[i]={
            cellIndex:i,
            step:''
          };
        }
      }
    }
    return (arrCell);
  }


} //class

var obj=new Journey();
console.time('貪心算法');
obj.solve().html();
console.timeEnd('貪心算法');  //9ms
console.log(obj.okay);
console.log(JSON.stringify(obj.arrStep));

/*
 * **純碎回溯
  class Journey{
    constructor(){
      this.arrStep=[];  //(記錄每一步)

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

      //當前步信息存貯到 arrStep
      es6This.arrStep[stepInfo.step]=stepInfo;

      if(stepInfo.step===63){
        //走完64步，成功
        return true;
      }



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
          // console.log('回溯:'+stepInfo.step);
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
      // if(stepInfo.x>=8 || stepInfo.y>=8 || stepInfo.x<0 || stepInfo.y<0){
      if(stepInfo.x>>>3 || stepInfo.y>>>3){
        return false;
      }
      //2.已經走過
      var some=es6This.arrStep.some(function(v){
        return (v.x===stepInfo.x && v.y===stepInfo.y);
      });
      return !some;
    }

    step2cell(){
      var es6This=this;
      var arrCell=[];
      for(var i=0;i<Math.pow(this.gth,2);i++){
        var ele=es6This.arrStep.find(function(v){
          return (v.x+v.y*es6This.gth===i);
        });
        if(ele){
          arrCell[i]=Object.assign({
            cellIndex:i
          },ele);
        }else{
          arrCell[i]={
            cellIndex:i,
            step:''
          };
        }
      }
      return (arrCell.sort(function(a,b){
        return (a.cellIndex-b.cellIndex);
      }));
    }
    html(){
      var es6This=this;
      var arrCell=es6This.step2cell();
      // console.log(JSON.stringify(arrCell));

      var strCell=arrCell.map(function(v,i){
        //第偶數行的奇數列 或者 第奇數行的偶數列  (0-base)
        //單目運算符 > 雙目運算符（/% > +- > >>> > > > === > & > ^ > | > && > || > ?: > ^= > ,）
        var oddEven='';
        if(i&1^i>>>3&1){
          oddEven=' black_cell';
        }
        return (`<div class="cell${oddEven}">${v.step}</div>`);
      }).join('');
      document.getElementById('container').innerHTML=strCell;
      return es6This;
    }
  } //class

  var obj=new Journey();
  console.time('回溯');
  obj.solve().html();
  console.timeEnd('回溯');  //回溯: 21999ms(19559ms)
  console.log(obj.okay);
  console.log(JSON.stringify(obj.arrStep));


*/
