class Graph{
  constructor(){
    this.arrAdj=[];
  }

  init(){
    var es6This=this;
    es6This.initArrAdj();
    console.log(es6This.arrAdj);
    return es6This;
  }
  initArrAdj(){
    var es6This=this;
    es6This.arrAdj=[
      [1,2,5],  //0
      [0,2],    //1
      [0,1,3,4],//2
      [2,4,5],  //3
      [2,3],    //4
      [0,3]     //5
    ];
    return es6This;
  }
} //class

var obj=new Graph();
obj.init();