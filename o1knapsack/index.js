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

    this.matrix=[]; //nLength*W

    this.result=[];
  }

  solve(){
    var es6This=this;
    this.initMatrix();

    //第一行：邊界i===0
    for(var j=0;j<=es6This.W;j++){
      es6This.matrix[0]=es6This.matrix[0] || [];
      if(j<es6This.n[0].weight){
        es6This.matrix[0][j]=0;
      }else{
        es6This.matrix[0][j]=this.n[0].values;
      }
    }

    for(j=0;j<=es6This.W;j++){
      for(var i=1;i<es6This.nLength;i++){
        es6This.matrix[i]=es6This.matrix[i] || [];
        if(j<es6This.n[i].weight){
          es6This.matrix[i][j]=es6This.matrix[i-1][j];
        }else{
          var vNoChooseI=es6This.matrix[i-1][j];
          var vChooseI=es6This.matrix[i-1][j-es6This.n[i].weight]+es6This.n[i].values;
          es6This.matrix[i][j]=Math.max(vNoChooseI,vChooseI);
        }
      }
    }

    return es6This;
  }
  initMatrix(){
    var es6This=this;
    return es6This;
  }
}

var obj=new O1knapsack();
obj.solve();
console.log(obj.matrix[obj.nLength-1][obj.W]);