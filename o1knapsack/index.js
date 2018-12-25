/*
* js注釋：
0-1 knapsack problem

動態規劃狀態轉移方程->
f(0,w)=0;                                                   (part0)
f(i,w)=f(i-1,w)  if wi>w                                    (part1)
f(i,w)=max{ f(i-1,w), f(i-1,w-wi)+vi }   if wi<=w           (part2)


i\w   0 1 2 3 4 5 6  7  8  9  10
    ------------------------------
0   | [0,0,0,0,0,0,0 ,0, 0, 0, 0 ],
id1 | [0,0,6,6,6,6,6 ,6 ,6 ,6 ,6 ],
id2 | [0,0,6,6,6,6,6 ,10,10,10,10],
id3 | [0,0,6,6,6,6,6 ,10,11,11,11],
id4 | [0,0,6,6,9,9,9 ,10,11,13,14],
id5 | [0,0,6,6,9,9,12,12,15,15,15]

*/
// if choose->>> matrix[i][j]=es6This.matrix[i-1][j-es6This.n[i-1].weight]+es6This.n[i-1].values;

class O1knapsack{
  constructor(){
    this.W=10;  //能够携重W的背包
    this.n=[
      {
        id:1,
        weight:2,
        values:6
      },
      {
        id:2,
        weight:5,
        values:4
      },
      {
        id:3,
        weight:6,
        values:5
      },
      {
        id:4,
        weight:2,
        values:3
      },
      {
        id:5,
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

    //動態規劃遞推
    for(var j=0;j<=es6This.W;j++){
      for(var i=0;i<=es6This.nLength;i++){
        es6This.matrix[i]=es6This.matrix[i] || [];
        if(i===0){
          //公式part0
          es6This.matrix[i][j]=0;
        }else if(es6This.n[i-1].weight>j){
          //公式part1
          es6This.matrix[i][j]=es6This.matrix[i-1][j];
        }else{
          //公式part2
          var vNoChooseIDi=es6This.matrix[i-1][j];
          var vChooseIDi=es6This.matrix[i-1][j-es6This.n[i-1].weight]+es6This.n[i-1].values;
          
          es6This.matrix[i][j]=Math.max(vNoChooseIDi,vChooseIDi);
        }
      }
    }

    //最右下角的值即爲最大價值
    es6This.maxValues=es6This.matrix[es6This.nLength][es6This.W]; //得出最大值

    //查找解的物品構成
    es6This.findN(es6This.nLength,es6This.W);
    return es6This;
  }
  findN(i,j){
    var es6This=this;
    //遞歸出口
    if(i<=0){
      return false;
    }

    if(es6This.matrix[i][j]===es6This.matrix[i-1][j]){
      es6This.findN(i-1,j);
    }else{
      es6This.result.push(es6This.n[i-1]);
      es6This.findN(i-1,j-es6This.n[i-1].weight);
    }

  }
}

var obj=new O1knapsack();
obj.solve();
console.log(obj.result,obj.maxValues);  //[obj.nLength-1][obj.W]
console.log(JSON.stringify(obj.matrix));