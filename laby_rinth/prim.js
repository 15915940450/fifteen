/*
* js注釋：
http://weblog.jamisbuck.org/2011/1/10/maze-generation-prim-s-algorithm

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

    this.w=100;
    this.grid=[]; //網格(包含cell)
    this.rows=3;
    this.cols=3;

    //STEP A1
    this.n=0;
  }

  init(){
    var es6This=this;
    es6This.eleMaze.width=es6This.CW;
    es6This.eleMaze.height=es6This.CH-4;

    for(var i=0;i<es6This.rows;i++){
      for(var j=0;j<es6This.cols;j++){
        var falseFirst=true;
        var falseLast=true;
        if(i+j===0){
          falseFirst=false;
        }
        if(i===es6This.rows-1 && j===es6This.cols-1){
          falseLast=false;
        }
        es6This.grid.push({
          index:i*es6This.cols+j,
          row:i,
          col:j,
          walls:[true,falseLast,true,falseFirst] //上，右，下，左
        });
      }
    }
    return es6This;
  }

  //動畫
  raf(){
    var es6This=this;
    var rafCallback=function(){
      es6This.n++;
      if(es6This.n<1e1){
        console.log(es6This.n);
        es6This.draw();
        window.requestAnimationFrame(rafCallback);
      }
    };
    window.requestAnimationFrame(rafCallback);
    return es6This;
  }

  //根據grid繪製canvas
  draw(){
    var es6This=this;
    var ctx=es6This.ctx;
    ctx.translate(130.5,30.5);
    ctx.clearRect(0,0,es6This.CW,es6This.CH);
    ctx.moveTo(0,0);
    ctx.strokeStyle='snow';
    /*
    //完成時
    var color='crimson';
    if(es6This.complete){
      color='midnightblue';
    }
    */
    for(var i=0;i<es6This.grid.length;i++){
      var cell=es6This.grid[i];
      /*

      //已訪問
      if(cell.visited && es6This.process){
        ctx.fillStyle=color;
        ctx.fillRect(cell.col*es6This.w,cell.row*es6This.w,es6This.w+1,es6This.w+1);
      }
      //當前
      if(cell.index===es6This.currentIndex && es6This.process){
        ctx.fillStyle='snow';
        ctx.beginPath();
        ctx.arc(cell.col*es6This.w+es6This.w/2,cell.row*es6This.w+es6This.w/2,es6This.w/5,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
      }
      ctx.fillStyle=color;
      */

      // console.log(cell);
      ctx.beginPath();
      if(cell.walls[0]){
        //上邊
        ctx.moveTo(cell.col*es6This.w,cell.row*es6This.w);
        ctx.lineTo((cell.col+1)*es6This.w,cell.row*es6This.w);
      }
      if(cell.walls[1]){
        //右邊
        ctx.moveTo((cell.col+1)*es6This.w,cell.row*es6This.w);
        ctx.lineTo((cell.col+1)*es6This.w,(cell.row+1)*es6This.w);
      }
      if(cell.walls[2]){
        //下邊
        ctx.moveTo((cell.col+1)*es6This.w,(cell.row+1)*es6This.w);
        ctx.lineTo(cell.col*es6This.w,(cell.row+1)*es6This.w);
      }
      if(cell.walls[3]){
        //左邊
        ctx.moveTo(cell.col*es6This.w,(cell.row+1)*es6This.w);
        ctx.lineTo(cell.col*es6This.w,cell.row*es6This.w);
      }
      ctx.stroke();

    }
    // ctx.closePath();
    ctx.translate(-130.5,-30.5);
    return es6This;
  }



} //class

var obj=new Maze();
obj.init().raf();
