# fifteen

### 采用回溯算法

```
class Fifteen{
  constructor(){
    this.arr=new Array(9).fill(0);
    this.i=0;
  }

  //解決方案
  solve(){
    this.fillCell(0);
    console.log(fifteen.i);
  }
  fillCell(cell){
    this.i++;
    if(cell>8){
      //結束條件：cell>8
      console.log(this.arr);
      //廣度優先還是深度優先
      // return true;
    }

    //逐個數填寫
    for(var num=1;num<=9;num++){
      if(!this.checkNum(cell,num)){
        continue;
      }

      this.arr[cell]=num;
      //填寫下一格
      if(!this.fillCell(cell+1)){ //對應備注1
        //如果下一格填寫失敗,恢復數據為0
        this.arr[cell]=0;
        continue;
      }
      return true;
    }

    //備注1：1到9都沒有符合，説明填寫失敗
    return false;
  }

  checkNum(cell,num){
    var currentArr=[...this.arr];
    // cell是否大於8
    if(cell>8){
      return false;
    }
    //1.是否已經重複
    if(currentArr.includes(num)){
      return false;
    }
    //2.所在行橫綫！==15 && cell%3==2
    if(cell%3===2 && num+currentArr[cell-1]+currentArr[cell-2]!==15){
      return false;
    }
    //3.所在列！==15
    if(cell>=6 && num+currentArr[cell-3]+currentArr[cell-6]!==15){
      return false;
    }
    //4.兩對角綫 !==15
    if(cell===6 && num+currentArr[2]+currentArr[4]!==15){
      return false;
    }
    if(cell===8 && num+currentArr[0]+currentArr[4]!==15){
      return false;
    }

    return true;
  }

} //class

var fifteen=new Fifteen();
fifteen.solve();
```

#### 數獨

```
class Shudu{
  constructor(){
    //arrGung:宮
    this.arrGung=[
      [],[],[],
      [],[],[],
      [],[],[]
    ];
    //arrRow:行
    this.arrRow=[[],[],[],[],[],[],[],[],[]];
    //arrCol列
    this.arrCol=[[],[],[],[],[],[],[],[],[]];

    this.arr1_9=[1,2,3,4,5,6,7,8,9];
    //for程序嘗試縂次數
    this.for=0;
    //okay是否生成成功
    this.okay=true;
  }

  //解決方案
  solve(){
    this.tryGung().html();
  }
  
  tryGung(){
    var es6This=this;
    //首先生成1，5，9這三個宮，索引是0，4，8
    es6This.first159();

    //依次生成索引為1，2，3，5，6，7的宮數據
    for(var gung=1;gung<=7;gung++){
      if(gung===4){
        continue;
      }
      var tryCellSuccess=es6This.tryCell(gung,0);
      if(!tryCellSuccess){
        es6This.okay=false;
        //生成失敗之後終止往下嘗試宮
        break;
      }
    }

    //生成失敗重新再來一遍，知道成功爲止
    if(!es6This.okay){
      es6This.tryGung();
    }

    return es6This; //return true;
  }

  //重置初始值arrGung,arrRow,arrCol,okay==>宮159
  first159(){
    var es6This=this;
    for(var i=0;i<9;i++){
      for(var j=0;j<9;j++){
        es6This.arrGung[i][j]=0;
        es6This.arrRow[i][j]=0;
        es6This.arrCol[i][j]=0;
      }
    }
    es6This.arrGung[0]=_.shuffle(es6This.arr1_9);
    es6This.arrGung[4]=_.shuffle(es6This.arr1_9);
    es6This.arrGung[8]=_.shuffle(es6This.arr1_9);

    // es6This.for=0;
    //默認值：假定是可以生成成功的
    es6This.okay=true;
    
    return es6This;
  }

  //填寫單元格
  tryCell(gung,cell){
    //共有9個格子
    if(cell===9){
      return true;
    }
    for(var num=1;num<=9;num++){
      // console.log("for");
      //統計所有循環次數，此變量代表性能
      this.for++;

      //先把數字num往格子裏填上
      this.arrGung[gung][cell]=num;

      //檢查當前單元格是否可以填上num，如果返回false，重置單元格數據為0（保險的做法），並繼續嘗試下一個數字num+1
      if(!this.checkCan(gung,cell)){
        this.arrGung[gung][cell]=0;
        continue;
      }

      //回溯：下一個單元格如果嘗試所有數字都不能生成解決方案，則代表當前單元格的此數字num不可以填寫，繼續下一個數num+1
      var nextCellCan=this.tryCell(gung,cell+1);
      if(!nextCellCan){
        this.arrGung[gung][cell]=0;
        continue;
      }

      // console.log("for return");
      return true;
    } //end for

    return false;
  }

  //當前位置填上數字之後，檢查this.arrGung，this.arrRow，this.arrCol是否有效
  checkCan(gung,cell){

    var canGung=this.checkByType(this.arrGung,gung);
    //如果宮數據失敗，及時返回，終止往下檢查
    if(!canGung){
      return false;
    }

    //計算出行列
    var rowcol=this.turnGungCell2rowcol(gung,cell);

    //由宮數據生成行數據，並檢查
    this.arrRowfromarrGung();
    var canRow=this.checkByType(this.arrRow,rowcol.row);
    if(!canRow){
      return false;
    }

    this.arrColfromarrRow();
    var canCol=this.checkByType(this.arrCol,rowcol.col);
    if(!canCol){
      return false;
    }

    //沒有異常。宮，行，列檢查都okay，檢查成功
    return true;
  }
  //方法：檢查方式宮，行，列
  checkByType(typeData,currentIndex){
    var es6This=this;
    var canType=true;

    //傳入當前宮（或行或列）(注意有可能為0)，檢查此宮（或行或列），否則檢查全盤
    if(currentIndex!==undefined){
      canType=this.checkIsNOTrepeat(typeData[currentIndex]);
    }else{
      //所有宮(或行或列)都不重複就爲真
      canType=typeData.every(function(arr){
        es6This.checkIsNOTrepeat(arr);
      });
    }
    
    return canType;
  }
  checkIsNOTrepeat(arr){
    //先把0去掉
    arr=_.compact(arr);
    //去重
    var arrUniq=_.uniq(arr);
    //去重之後如果和原來的數組長度沒變化，則沒有重複，可以填寫。否則不能填寫
    return (arr.length===arrUniq.length);
  }

  //變更arrRow使與arrGung相對應
  arrRowfromarrGung(){
    var es6This=this;
    for(var gungIndex=0;gungIndex<9;gungIndex++){
      for(var cellIndex=0;cellIndex<9;cellIndex++){
        var rowcol=es6This.turnGungCell2rowcol(gungIndex,cellIndex);
        es6This.arrRow[gungIndex][cellIndex]=es6This.arrGung[rowcol.row][rowcol.col];
      }
    }
    return es6This;
  }
  turnGungCell2rowcol(gungIndex,cellIndex){
    //gung[5][3]=row[4][6]
    var shangGung=Math.floor(gungIndex/3);  //商(1)
    var yuGung=gungIndex%3; //余(2)
    var shangCell=Math.floor(cellIndex/3);  //商(1)
    var yuCell=cellIndex%3; //余(0)

    var x=shangGung*3+shangCell;  //1*3+1
    var y=yuGung*3+yuCell;  //2*3+0

    return ({
      row:x,
      col:y
    });
  }
  
  //變更arrCol使與arrRow相對應
  arrColfromarrRow(){
    var es6This=this;
    es6This.arrRow.forEach(function(vRow,rowIndex){
      vRow.forEach(function(vCell,cellIndex){
        es6This.arrCol[rowIndex][cellIndex]=es6This.arrRow[cellIndex][rowIndex];
      });
    });
    return es6This;
  }

  html(){
    var es6This=this;
    var strHTML=es6This.TemplateHTML().join('');
    document.getElementById('container').innerHTML=strHTML;
    console.log(this.for);
    console.log(this.okay);
    return es6This;
  }
  //字符串模板，使用行數據
  TemplateHTML(){
    // console.log(this.arrRow);
    var arr=this.arrRow.map(function(v1,i1){
      // console.log(v1);
      var strSpan=v1.map(function(v2){
        return `<span>${v2}</span>`;
      }).join('');
      return `<div class="r r${i1+1}">
                ${strSpan}
              </div>`;
    });
    return arr;
  }
} //class

var obj=new Shudu();
obj.solve();
```
