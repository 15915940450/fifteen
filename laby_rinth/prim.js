/*
* js注釋：
http://weblog.jamisbuck.org/2011/1/10/maze-generation-prim-s-algorithm
1.You start by marking a random cell:
2.Then, you simply iterate until the frontier set is empty:
3.Within the loop, we choose a frontier cell at random:
4.Then we choose a random “in” neighbor of that frontier cell:
5.Then, we record a passage from the neighbor cell to the frontier cell:
6.And finally, we mark the frontier cell as being “in” the maze (and add any of its outside neighbors to the frontier):
7.And you’re done! 

=========================================

Randomized Prim's algorithm
This algorithm is a randomized version of Prim's algorithm.

    A1.Start with a grid full of walls.
    A2.Pick a cell, mark it as part of the maze. Add the walls of the cell to the wall list.
    A3.While there are walls in the list:
        B1.Pick a random wall from the list. If only one of the two cells that the wall divides is visited, then:
            C1.Make the wall a passage and mark the unvisited cell as part of the maze.
            C2.Add the neighboring walls of the cell to the wall list.
        B2.Remove the wall from the list.

It will usually be relatively easy to find the way to the starting cell, but hard to find the way anywhere else.

Note that simply running classical Prim's on a graph with random edge weights would create mazes stylistically identical to Kruskal's, because they are both minimal spanning tree algorithms.
*/

class Maze{
  //basic要素
  constructor(){
    this.eleMaze=document.querySelector('#maze');
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;
    this.ctx=this.eleMaze.getContext('2d');

    this.w=200;
    this.grid=[]; //網格(包含cell)
    this.rows=(this.CH-100)/this.w>>0;
    this.cols=(this.CW-300)/this.w>>0;

    this.adjacentFrontier=[]; //sure is visited(最重要的數據)
    this.complete=false;

    this.n=0;

    //尋路所需
    this.startIndex=-1;
    this.endIndex=-1;
    this.queue=[];
    this.pathBFS=[];
    this.search0=true;

  }

  init(){
    var f=this;
    f.eleMaze.width=f.CW;
    f.eleMaze.height=f.CH-4;

    for(var i=0;i<f.rows;i++){
      for(var j=0;j<f.cols;j++){
        var falseFirst=true;
        var falseLast=true;
        if(i+j===0){
          falseFirst=false;
        }
        if(i===f.rows-1 && j===f.cols-1){
          falseLast=false;
        }

        f.grid.push({
          index:i*f.cols+j,
          row:i,
          col:j,
          visited:false,
          walls:[true,falseLast,true,falseFirst] //上，右，下，左
        });
      }
    }

    f.startIndex=0;
    f.endIndex=f.grid[f.grid.length-1].index;
    this.queue.push(f.startIndex);
    this.grid[f.startIndex].marked=true;

    //STEP1
    f.adjacentFrontier.push(f.getRandomOne(f.grid));
    f.adjacentFrontier[0].visited=true;
    return f;
  }
  //從數組中隨機選擇一個元素
  getRandomOne(arr){
    return (arr[Math.random()*arr.length>>0]);
  }
  //檢測是否生成完成
  checkIsComplete(){
    var f=this;
    var isComplete=f.grid.every(function(v){
      return (v.visited);
    });
    return isComplete;
  }
  // 生成未訪問的鄰居數組
  checkNeighbour(objCell){
    var f=this;
    var arr=[];

    //當前，上，右，下，左
    var topNeighbour=f.grid[objCell.index-f.cols];
    var rightNeighbour=f.grid[objCell.index+1];
    var bottomNeighbour=f.grid[objCell.index+f.cols];
    var leftNeighbour=f.grid[objCell.index-1];

    if(objCell.row && !topNeighbour.visited){
      arr.push(topNeighbour);  //上
    }
    if(objCell.col!==f.cols-1 && !rightNeighbour.visited){
      arr.push(rightNeighbour);  //右
    }
    if(objCell.row!==f.rows-1 && !bottomNeighbour.visited){
      arr.push(bottomNeighbour);  //下
    }
    if(objCell.col && !leftNeighbour.visited){
      arr.push(leftNeighbour);  //左
    }
    return arr;
  }
  //隨機選擇frontier
  chooseRandomFrontier(objCell){
    var f=this;
    var neighbors=f.checkNeighbour(objCell);
    return (f.getRandomOne(neighbors));
  }
  //移除墻體
  removeWall(currentCell,chosenCell){
    var f=this;
    switch(chosenCell.row-currentCell.row){
    case 1:
      chosenCell.walls[0]=false;
      currentCell.walls[2]=false;
      break;
    case -1:
      chosenCell.walls[2]=false;
      currentCell.walls[0]=false;
      break;
    default:

    }

    switch(chosenCell.col-currentCell.col){
    case 1:
      chosenCell.walls[3]=false;
      currentCell.walls[1]=false;
      break;
    case -1:
      chosenCell.walls[1]=false;
      currentCell.walls[3]=false;
      break;
    default:
    
    }

    return f;
  }
  dealGrid(){
    var f=this;
    // STEP2
    if(!f.checkIsComplete()){
      // STEP3&4
      var randomAdjacent=f.getRandomOne(f.adjacentFrontier);
      var randomFrontier=f.chooseRandomFrontier(randomAdjacent);
      // STEP5
      f.removeWall(randomAdjacent,randomFrontier);
      // STEP6
      randomFrontier.visited=true;
      //can not just push
      f.adjacentFrontier.push(randomFrontier);
      //need to filter
      f.adjacentFrontier=f.adjacentFrontier.filter(function(v){
        return (f.checkNeighbour(v).length);
      });
      
    }else{
      f.complete=true;
    }
    return f;
  }
  addAdj(){
    var f=this;
    f.grid=f.grid.map(function(v){
      v.adj=f.gAdj(v);
      v.marked=false;
      v.edgeTo=-1;
      v.isPath=false;

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
  dealGridSearch(){
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
  //動畫
  raf(){
    var f=this;
    var rafCallback=function(){
      f.n++;
      // console.log(f.n);
      if(!f.complete){
        f.dealGrid();
        window.requestAnimationFrame(rafCallback);
      }else if(!f.grid[f.endIndex].marked){
        if(f.search0){
          f.addAdj();
          f.search0=false;
        }
        f.dealGridSearch();
        window.requestAnimationFrame(rafCallback);
      }else{
        console.log('completeSearch');
        f.findPath(f.endIndex);
        f.markedThePath();
      }
      f.draw();
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



} //class

var obj=new Maze();
obj.init().raf();
