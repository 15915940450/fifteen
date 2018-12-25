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
        id:1,
        weight:2,
        values:3
      },
      {
        id:2,
        weight:6,
        values:5
      },
      {
        id:3,
        weight:5,
        values:4
      },
      {
        id:4,
        weight:4,
        values:6
      }
    ];
    this.nLength=this.n.length;

    this.result=[];
  }

  solve(){
    var es6This=this;
  
    return es6This;
  }
}

var obj=new O1knapsack();
console.log(obj.nLength);