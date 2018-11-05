class Fifteen{
  constructor(){
    this.arr=new Array(9).fill(0);
  }

  //解決方案
  solve(){
    this.fillCell(0);
  }
  fillCell(cell){
    if(cell>8){
      //結束條件：cell>8
      return true;
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

  checkNum(){
    return true;
  }

} //class

var fifteen=new Fifteen();
fifteen.solve();
console.log(fifteen.arr);