class Graph{
  constructor(){
    this.queue=[];  //隊列
    this.stack=[];  //堆
    this.marked=[]; //標志是否已經訪問過
    this.edgeTo=[]; //軌跡，由哪個頂點過來的
    this.adj=[]; //鄰接表

    this.gthV=0;  //頂點個數

    this.pathDFS=[];  //由深度優先搜索所得路徑
    this.pathBFS=[];  //由廣度優先搜索所得路徑
  }

  //初始化
  init(){
    var f=this;
    var i;
    //初始化圖
    f.adj=[
      //[1,2,5],  //0
      [5,1,2],  //0
      [0,2],    //1
      [0,1,3,4],//2
      [2,4,5],  //3
      [2,3],    //4
      [0,3]     //5
    ];
    //初始化頂點個數
    f.gthV=f.adj.length;
    //初始化各個節點的訪問情況
    for(i=0;i<f.gthV;i++){
      f.marked[i]=false;
    }
    return f;
  }
  //深度優先搜索
  /*
  DFS(v,w){
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
      var b=this.DFS(nextV,w);
      if(b){
        return true;
      }
    }
    return false;
  }
  */
  //LIFO
  DFS(v,w){
    var f=this;
    var i;
    if(w===undefined){
      w=v;
    }else{
      f.stack.push(v);
      f.edgeTo[v]=-1;
    }
    if(f.stack.includes(w)){
      return true;
    }
    var currentV=f.stack[f.stack.length-1];
    f.marked[currentV]=true;
    for(i=0;i<f.adj[currentV].length;i++){
      var vertex=f.adj[currentV][i];
      if(!f.marked[vertex]){
        f.stack.push(vertex);
        f.marked[vertex]=true;
        f.edgeTo[vertex]=currentV;
        //when has found,return true and break the loop
        var b=f.DFS(w);
        if(b){
          return true;
        }
      }
    }
    //when go here, it is running back
    return false;
  }
  //廣度優先搜索
  BFS(v,w){
    var f=this;
    var i;
    if(w===undefined){
      w=v;
    }else{
      //初始化隊列
      f.queue.push(v);
      f.edgeTo[v]=-1;
    }
    //終止條件
    //if(!f.queue.length){
    if(f.queue.includes(w)){
      return true;
    }

    // 重複步驟
    var currentV=f.queue.shift();
    f.marked[currentV]=true;
    for(i=0;i<f.adj[currentV].length;i++){
      var vertex=f.adj[currentV][i];
      if(!f.marked[vertex]){
        f.queue.push(vertex);
        f.edgeTo[vertex]=currentV;
        f.marked[vertex]=true;
      }
    }

    f.BFS(w);
    return false;
  }
  //查找路徑
  findPath(v,w,isDepth){
    var f=this;
    if(isDepth){
      f.pathDFS.unshift(w);
    }else{
      f.pathBFS.unshift(w);
    }
    if(v===w){
      return true;
    }
    f.findPath(v,f.edgeTo[w],isDepth)
    return false;
  }
} //class

var obj=new Graph();
obj.init();
obj.DFS(0,4);
obj.findPath(0,4,true);
//obj.BFS(0,4);
//obj.findPath(0,4);

console.log(obj.pathDFS);
//console.log(obj.pathBFS);
