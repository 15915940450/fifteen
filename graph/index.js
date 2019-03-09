class Graph{
  constructor(){
    this.arrAdj=[]; //鄰接表

    this.gthV=6;  //頂點個數
    this.marked=[]; //標志是否已經經過

    this.pathDFS=[];  //由深度優先搜索所得路徑
  }

  //初始化
  init(){
    var es6This=this;
    es6This.initArrAdj();
    es6This.initMarked();
    // console.log(es6This.arrAdj);
    es6This.findPathByDFS(0,2);
    return es6This;
  }
  //初始化各個節點的訪問情況
  initMarked(){
    var es6This=this;
    for(var i=0;i<es6This.gthV;i++){
      es6This.marked[i]=false;
    }
    return es6This;
  }
  //初始化圖
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
  //深度優先搜索
  findPathByDFS(v,w){
    this.pathDFS.push(v);
    if(v===w){
      return (true);  //起點與終點重合
    }
    this.marked[v]=true;
    for(var i=0;i<this.arrAdj[v].length;i++){
      var nextV=this.arrAdj[v][i];
      if(this.marked[nextV]){
        continue;
      }
      this.findPathByDFS(nextV,w);
      break;
    }
    return false;

  }
} //class

var obj=new Graph();
obj.init();
console.log(obj.pathDFS);