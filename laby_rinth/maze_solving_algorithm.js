// Maze solving algorithm
//迷宮尋路算法
//廣度優先搜索
// https://en.wikipedia.org/wiki/Maze_solving_algorithm
class MazeSolvingAlgorithm{
  constructor(){
    this.grid='[{"index":0,"row":0,"col":0,"visited":true,"walls":[true,false,true,false]},{"index":1,"row":0,"col":1,"visited":true,"walls":[true,true,false,false]},{"index":2,"row":0,"col":2,"visited":true,"walls":[true,false,false,true]},{"index":3,"row":0,"col":3,"visited":true,"walls":[true,true,true,false]},{"index":4,"row":1,"col":0,"visited":true,"walls":[true,true,false,true]},{"index":5,"row":1,"col":1,"visited":true,"walls":[false,false,false,true]},{"index":6,"row":1,"col":2,"visited":true,"walls":[false,false,false,false]},{"index":7,"row":1,"col":3,"visited":true,"walls":[true,true,false,false]},{"index":8,"row":2,"col":0,"visited":true,"walls":[false,false,true,true]},{"index":9,"row":2,"col":1,"visited":true,"walls":[false,true,true,false]},{"index":10,"row":2,"col":2,"visited":true,"walls":[false,true,false,true]},{"index":11,"row":2,"col":3,"visited":true,"walls":[false,true,false,true]},{"index":12,"row":3,"col":0,"visited":true,"walls":[true,false,true,true]},{"index":13,"row":3,"col":1,"visited":true,"walls":[true,false,true,false]},{"index":14,"row":3,"col":2,"visited":true,"walls":[false,true,true,false]},{"index":15,"row":3,"col":3,"visited":true,"walls":[false,false,true,true]}]';

    this.eleMaze=document.querySelector('#maze');
    this.ctx=this.eleMaze.getContext('2d');
    this.w=150;

    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;

    this.rows=4;
    this.cols=4;


    this.startIndex=-1;
    this.endIndex=-1;
    // BFS
    this.queue=[];
    this.pathBFS=[];

    this.complete=false;

    this.n=0;
  }

  init(){
    var f=this;
    
    f.eleMaze.width=f.CW;
    f.eleMaze.height=f.CH-4;

    obj.addAdj();

    f.startIndex=0;
    f.endIndex=f.grid[f.grid.length-1].index;
    this.queue.push(f.startIndex);
    this.grid[f.startIndex].marked=true;

    return f;
  }
  //解決方案
  addAdj(){
    var f=this;
    f.grid=JSON.parse(f.grid);
    f.grid=f.grid.map(function(v){
      v.adj=f.gAdj(v);
      v.marked=false;
      v.edgeTo=-1;
      v.isPath=false;
      delete v.visited;

      return (v);
    });
    return f;
  }
  gAdj(v){
    var objAdj,i,arr=[];
    for(i=0;i<4;i++){
      if(!v.walls[i]){
        //沒有墻，連通
        switch(i){
        case 0:
          objAdj=this.grid[v.index-this.cols];
          break;
        case 1:
          objAdj=this.grid[v.index+1];
          break;
        case 2:
          objAdj=this.grid[v.index+this.cols];
          break;
        case 3:
          objAdj=this.grid[v.index-1];
          break;
        default:
        
        }
        if(objAdj){
          arr.push(objAdj.index);
        }
      }
    }
    
    return arr;
  }
  findPath(w){
    var f=this;
    f.pathBFS.unshift(w);
    if(w===f.startIndex){
      return true;
    }
    var b=f.findPath(f.grid[w].edgeTo);
    return b;
  }
  markedThePath(){
    var f=this;
    f.pathBFS.forEach(function(v){
      f.grid[v].isPath=true;
    });
    return f;
  }

  dealGrid(){
    var f=this,i;
    var currentIndex=f.queue.shift();
    for(i=0;i<f.grid[currentIndex].adj.length;i++){
      var vertex=f.grid[f.grid[currentIndex].adj[i]];
      if(!vertex.marked){
        // 未訪問過
        f.queue.push(vertex.index);
        vertex.marked=true;
        vertex.edgeTo=currentIndex;
      }
    }
    return f;
  }

  //動畫
  raf(){
    var f=this;
    var rafCallback=function(){
      f.n++;
      if(!f.grid[f.endIndex].marked){
        f.dealGrid();
        f.draw();
        window.requestAnimationFrame(rafCallback);
      }else{
        //終止條件:出口已被標志
        console.log('complete');
        f.findPath(f.endIndex);
        f.markedThePath();
        f.draw();
      }
    };
    window.requestAnimationFrame(rafCallback);
    return f;
  }
  //根據grid繪製canvas
  draw(){
    var f=this;
    var ctx=f.ctx;
    ctx.translate(130.5,30.5);
    ctx.clearRect(0,0,f.CW,f.CH);
    ctx.moveTo(0,0);
    ctx.strokeStyle='black';
    
    var color='blanchedalmond';
    
    for(var i=0;i<f.grid.length;i++){
      var cell=f.grid[i];
      
      
      //已訪問
      if(cell.marked){
        ctx.fillStyle=color;
        ctx.fillRect(cell.col*f.w,cell.row*f.w,f.w+1,f.w+1);
      }
      //是路徑
      if(cell.isPath){
        ctx.fillStyle='lawngreen';
        ctx.fillRect(cell.col*f.w,cell.row*f.w,f.w+1,f.w+1);
        ctx.fillStyle=color;
      }

      // console.log(cell);
      ctx.beginPath();
      if(cell.walls[0]){
        //上邊
        ctx.moveTo(cell.col*f.w,cell.row*f.w);
        ctx.lineTo((cell.col+1)*f.w,cell.row*f.w);
      }
      if(cell.walls[1]){
        //右邊
        ctx.moveTo((cell.col+1)*f.w,cell.row*f.w);
        ctx.lineTo((cell.col+1)*f.w,(cell.row+1)*f.w);
      }
      if(cell.walls[2]){
        //下邊
        ctx.moveTo((cell.col+1)*f.w,(cell.row+1)*f.w);
        ctx.lineTo(cell.col*f.w,(cell.row+1)*f.w);
      }
      if(cell.walls[3]){
        //左邊
        ctx.moveTo(cell.col*f.w,(cell.row+1)*f.w);
        ctx.lineTo(cell.col*f.w,cell.row*f.w);
      }
      ctx.stroke();

      ctx.font='13px serif';
      ctx.fillStyle='black';
      ctx.fillText(cell.index,cell.col*f.w+f.w/2,cell.row*f.w+f.w/2);
      ctx.fillStyle=color;
    } //for
    // ctx.closePath();
    ctx.translate(-130.5,-30.5);
    return f;
  }
}

var obj=new MazeSolvingAlgorithm();
obj.init();
obj.raf();