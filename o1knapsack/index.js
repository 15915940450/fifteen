class O1knapsack{
  constructor(){
    this.W=10;  //能够携重W的背包
    this.n=[
      {
        id:0,
        weight:2,
        values:6
      },
      {
        id:3,
        weight:5,
        values:4
      },
      {
        id:2,
        weight:6,
        values:5
      },
      {
        id:1,
        weight:2,
        values:3
      },
      {
        id:4,
        weight:4,
        values:6
      }
    ];
    this.nLength=this.n.length;

    this.matrix=[]; //矩陣表：二維數組
    this.maxValues=0; //最大價值
    this.result=[]; //構成最大價值的那些物品
  }

  //解決方案
  solve(){
    var es6This=this;
    

    //第一行：邊界i===0
    for(var j=0;j<=es6This.W;j++){
      es6This.matrix[0]=es6This.matrix[0] || [];
      if(j<es6This.n[0].weight){
        es6This.matrix[0][j]=0;
      }else{
        es6This.matrix[0][j]=this.n[0].values;
      }
    }

    //動態規劃遞推
    for(j=0;j<=es6This.W;j++){
      for(var i=1;i<es6This.nLength;i++){
        es6This.matrix[i]=es6This.matrix[i] || [];
        if(j<es6This.n[i].weight){
          //公式part1
          es6This.matrix[i][j]=es6This.matrix[i-1][j];
        }else{
          //公式part2
          var vNoChooseI=es6This.matrix[i-1][j];
          var vChooseI=es6This.matrix[i-1][j-es6This.n[i].weight]+es6This.n[i].values;
          
          es6This.matrix[i][j]=Math.max(vNoChooseI,vChooseI);
        }
      }
    }

    //最右下角的值即爲最大價值
    es6This.maxValues=es6This.matrix[es6This.nLength-1][es6This.W]; //得出最大值

    //查找解的物品構成
    es6This.findN(es6This.nLength-1,es6This.W);
    return es6This;
  }
  findN(i,j){
    var es6This=this;
    if(i<=0){
      if(es6This.matrix[0][j]){
        //第0個物品是否可選
        es6This.result.push(es6This.n[0]);
      }
      return false;
    }

    if(es6This.matrix[i][j]===es6This.matrix[i-1][j]){
      es6This.findN(i-1,j);
    }else{
      es6This.result.push(es6This.n[i]);
      es6This.findN(i-1,j-es6This.n[i].weight);
    }

  }
}

var obj=new O1knapsack();
obj.solve();
console.log(obj.result,obj.maxValues);  //[obj.nLength-1][obj.W]