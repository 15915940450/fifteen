class Fifteen{
  constructor(){
    this.arr=new Array(9).fill(0);
    this.i=0;
  }

  //解決方案
  solve(){
    this.fillCell(0);
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
    if(cell>6 && num+currentArr[cell-3]+currentArr[cell-6]!==15){
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
console.log(fifteen.i);
// console.log(fifteen.arr);