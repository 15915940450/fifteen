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
      [1,2,5],  //0
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
    f.findPathByBFS(0,4);
    return f;
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
      console.log(f.edgeTo);
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

    f.findPathByBFS(w);
    return false;
  }
} //class

var obj=new Graph();
obj.init();
console.log(obj.pathDFS);
