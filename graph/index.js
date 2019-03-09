class Graph{
  constructor(){
    this.queue=[];  //隊列
    this.marked=[]; //標志是否已經經過
    this.edgeTo=[]; //軌跡
    this.adj=[]; //鄰接表

    this.depth=0;

    this.gthV=6;  //頂點個數

    this.pathDFS=[];  //由深度優先搜索所得路徑
    
    this.pathBFS=[];  //由廣度優先搜索所得路徑
  }

  //初始化
  init(){
    var es6This=this;
    es6This.initAdj();
    es6This.initMarked();
    // console.log(es6This.adj);
    // es6This.findPathByDFS(0,4);
    // es6This.initQueue();
    es6This.findPathByBFS(0,4);
    return es6This;
  }
  initQueue(){
    var es6This=this;
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
  initAdj(){
    var es6This=this;
    es6This.adj=[
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
    for(var i=0;i<this.adj[v].length;i++){
      var nextV=this.adj[v][i];
      if(this.marked[nextV]){
        continue;
      }
      this.findPathByDFS(nextV,w);
      break;
    }
    return false;

  }
  //廣度優先搜索
  findPathByBFS(v,w){
    var es6This=this;
    if(w===undefined){
      w=v;
    }else{
      es6This.queue.push(v);
    }
    //終止條件
    if(es6This.queue.includes(w)){
      console.log(es6This.queue);
      console.log(es6This.edgeTo);
      return true;
    }

    // 循環
    var currentV=es6This.queue.shift();
    es6This.marked[currentV]=true;
    for(var i=0;i<es6This.adj[currentV].length;i++){
      var vertex=es6This.adj[currentV][i];
      if(!es6This.marked[vertex]){
        es6This.queue.push(vertex);
        es6This.marked[vertex]=true;
        es6This.edgeTo[vertex]=currentV;
      }
    }

    es6This.findPathByBFS(w);
    return false;
  }
} //class

var obj=new Graph();
obj.init();
console.log(obj.pathDFS);