// Maze solving algorithm
// https://en.wikipedia.org/wiki/Maze_solving_algorithm
class MazeSolvingAlgorithm{
  constructor(){
    this.grid='[{"index":0,"row":0,"col":0,"visited":true,"walls":[true,false,true,false]},{"index":1,"row":0,"col":1,"visited":true,"walls":[true,true,false,false]},{"index":2,"row":0,"col":2,"visited":true,"walls":[true,false,false,true]},{"index":3,"row":0,"col":3,"visited":true,"walls":[true,true,true,false]},{"index":4,"row":1,"col":0,"visited":true,"walls":[true,true,false,true]},{"index":5,"row":1,"col":1,"visited":true,"walls":[false,false,false,true]},{"index":6,"row":1,"col":2,"visited":true,"walls":[false,false,false,false]},{"index":7,"row":1,"col":3,"visited":true,"walls":[true,true,false,false]},{"index":8,"row":2,"col":0,"visited":true,"walls":[false,false,true,true]},{"index":9,"row":2,"col":1,"visited":true,"walls":[false,true,true,false]},{"index":10,"row":2,"col":2,"visited":true,"walls":[false,true,false,true]},{"index":11,"row":2,"col":3,"visited":true,"walls":[false,true,false,true]},{"index":12,"row":3,"col":0,"visited":true,"walls":[true,false,true,true]},{"index":13,"row":3,"col":1,"visited":true,"walls":[true,false,true,false]},{"index":14,"row":3,"col":2,"visited":true,"walls":[false,true,true,false]},{"index":15,"row":3,"col":3,"visited":true,"walls":[false,false,true,true]}]';

    this.eleMaze=document.querySelector('#maze');
    this.ctx=this.eleMaze.getContext('2d');
    this.w=200;

    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;
  }

  init(){
    var f=this;
    f.grid=JSON.parse(f.grid);

    f.eleMaze.width=f.CW;
    f.eleMaze.height=f.CH-4;


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
    
    var color='snow';
    
    for(var i=0;i<f.grid.length;i++){
      var cell=f.grid[i];
      
      //已訪問
      if(cell.visited){
        ctx.fillStyle=color;
        ctx.fillRect(cell.col*f.w,cell.row*f.w,f.w+1,f.w+1);
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

    }
    // ctx.closePath();
    ctx.translate(-130.5,-30.5);
    return f;
  }
}

var obj=new MazeSolvingAlgorithm();
obj.init();
obj.draw();