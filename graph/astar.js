/*
  * A* search algorithm：
  https://en.wikipedia.org/wiki/A*_search_algorithm


  https://www.redblobgames.com/pathfinding/a-star/introduction.html
  http://theory.stanford.edu/~amitp/GameProgramming/AStarComparison.html

  A* is a modification of Dijkstra’s Algorithm that is optimized for a single destination. Dijkstra’s Algorithm can find paths to all locations; A* finds paths to one location, or the closest of several locations. It prioritizes paths that seem to be leading closer to a goal.

  Compare the algorithms:
    Dijkstra’s Algorithm calculates the distance from the start point.
    Greedy Best-First Search estimates the distance to the goal point.
    A* is using the sum of those two distances.


  f(n)=g(n)+h(n)
    g = the movement cost to move from the starting point to a given square on the grid, following the path generated to get there.
    h = the estimated movement cost to move from that given square on the grid to the final destination.
        This is often referred to as the heuristic, which isnothing but a kind of smart guess. We really don’t know the actual distance until we find the path, because all sorts of things can be in the way (walls, water, etc.). There can be many ways to calculate this ‘h’ which are discussed in the later sections.


  算法步驟
  * 初始化open_set和close_set；
  * 将起点加入open_set中，并设置优先级为0（优先级最高）；
  * 如果open_set不为空，则从open_set中选取优先级最高的节点n：
      * 如果节点n为终点，则：
          * 从终点开始逐步追踪parent节点，一直达到起点；
          * 返回找到的结果路径，算法结束；
      * 如果节点n不是终点，则：
          * 将节点n从open_set中删除，并加入close_set中；
          * 遍历节点n所有的邻近节点：
              * 如果邻近节点m在close_set中，则：
                  * 跳过，选取下一个邻近节点
              * 如果邻近节点m也不在open_set中，则：
                  * 设置节点m的parent为节点n
                  * 计算节点m的优先级
                  * 将节点m加入open_set中

  The following pseudocode describes the algorithm:
  function reconstruct_path(cameFrom, current)
      total_path := {current}
      while current in cameFrom.Keys:
          current := cameFrom[current]
          total_path.append(current)
      return total_path

  function A_Star(start, goal)
      // The set of nodes already evaluated
      closedSet := {}

      // The set of currently discovered nodes that are not evaluated yet.
      // Initially, only the start node is known.
      openSet := {start}

      // For each node, which node it can most efficiently be reached from.
      // If a node can be reached from many nodes, cameFrom will eventually contain the
      // most efficient previous step.
      cameFrom := an empty map

      // For each node, the cost of getting from the start node to that node.
      gScore := map with default value of Infinity

      // The cost of going from start to start is zero.
      gScore[start] := 0

      // For each node, the total cost of getting from the start node to the goal
      // by passing by that node. That value is partly known, partly heuristic.
      fScore := map with default value of Infinity

      // For the first node, that value is completely heuristic.
      fScore[start] := heuristic_cost_estimate(start, goal)

      while openSet is not empty
          current := the node in openSet having the lowest fScore[] value
          if current = goal
              return reconstruct_path(cameFrom, current)

          openSet.Remove(current)
          closedSet.Add(current)

          for each neighbor of current
              if neighbor in closedSet
                  continue    // Ignore the neighbor which is already evaluated.

              // The distance from start to a neighbor
              tentative_gScore := gScore[current] + dist_between(current, neighbor)

              if neighbor not in openSet  // Discover a new node
                  openSet.Add(neighbor)
              else if tentative_gScore >= gScore[neighbor]
                  continue

              // This path is the best until now. Record it!
              cameFrom[neighbor] := current
              gScore[neighbor] := tentative_gScore
              fScore[neighbor] := gScore[neighbor] + heuristic_cost_estimate(neighbor, goal)


  (在极端情况下，当启发函数h(n)始终为0，则将由g(n)决定节点的优先级，此时算法就退化成了Dijkstra算法。
  //Dijkstra's algorithm, as another example of a uniform-cost search algorithm, can be viewed as a special case of A* where h(x) = 0 for all x.
  如果h(n)始终小于等于节点n到终点的代价，则A*算法保证一定能够找到最短路径。
  但是当h(n)的值越小，算法将遍历越多的节点，也就导致算法越慢。
  如果h(n)完全等于节点n到终点的代价，则A*算法将找到最佳路径，并且速度很快。
  可惜的是，并非所有场景下都能做到这一点。因为在没有达到终点之前，我们很难确切算出距离终点还有多远。
  如果h(n)的值比节点n到终点的代价要大，则A*算法不能保证找到最短路径，不过此时会很快。
  在另外一个极端情况下，如果h(n)相较于g(n)大很多，则此时只有h(n)产生效果，这也就变成了最佳优先搜索。
  由上面这些信息我们可以知道，通过调节启发函数我们可以控制算法的速度和精确度。因为在一些情况，我们可能未必需要最短路径，而是希望能够尽快找到一个路径即可。这也是A*算法比较灵活的地方。)

  //时空并不是无限可分的
*/

class Astar{
  constructor(){
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;
    this.eleCanvas=document.querySelector('#canvas');
    this.ctx=this.eleCanvas.getContext('2d');
    this.color='#0077ee';
    this.d=30;  //網格單位長度

    this.n=-1;  //raf多少次
    this.interval=10; //每幀的間隔
    this.currentStep=-1; //當前。。。
    this.rows=3;
    this.cols=3;

    this.adj=[];

    this.s=0; //開始位置
    this.w=this.rows*this.cols-1; //結束位置
    this.closedSet=[];
    this.openSet=[this.s];
    this.SPT=[];
    this.gScore=[];
    this.fScore=[];
  }
  init(){
    this.eleCanvas.width=this.CW;
    this.eleCanvas.height=this.CH-4;
    this.initAdj();
    for(var i=0;i<=this.w;i++){
      this.gScore[i]=Infinity;
      this.fScore[i]=Infinity;
    }
    this.gScore[this.s]=0;
    this.fScore[this.s]=this.funHeuristic(this.s);
  }
  //啓發函數
  funHeuristic(index){
    var f=this;
    var x1=f.index2center(f.w).x;
    var y1=f.index2center(f.w).y;
    var x0=f.index2center(index).x;
    var y0=f.index2center(index).y;
    var d=Math.sqrt(Math.pow(x1-x0,2),Math.pow(y1-y0,2));
    return (d);
  }

  initAdj(){
    var f=this;
    for(var i=0;i<f.rows;i++){
      for(var j=0;j<f.cols;j++){
        var index=f.ij2index(i,j);
        var objV={
          index:index,
          row:i,
          col:j,
          neighbor:f.addNeighbor(i,j)
        };
        f.adj[index]=objV;
      }
    }
    return f;
  }
  ij2index(i,j){
    var f=this;
    if(i<0 || j<0 || i>f.rows-1 || j>f.cols-1){
      return (-1);
    }
    return (i*f.cols+j);
  }
  index2ij(index){
    var f=this;
    if(index<0 || index>f.w){
      return (-1);
    }
    return ({
      i:index/f.cols>>0,
      j:index%f.cols
    });
  }
  index2center(index){
    var f=this;
    return ({
      x:f.d*f.adj[index].col+f.d/2,
      y:f.d*f.adj[index].row+f.d/2
    });
  }
  addNeighbor(i,j){
    var f=this;

    //八個方向
    var arrDerection=[];
    //上
    arrDerection[0]=f.ij2index(i-1,j); //-1,0,1,2...
    //上-右
    arrDerection[1]=f.ij2index(i-1,j+1);
    //右
    arrDerection[2]=f.ij2index(i,j+1);
    //下-右
    arrDerection[3]=f.ij2index(i+1,j+1);
    //下
    arrDerection[4]=f.ij2index(i+1,j);
    //下-左
    arrDerection[5]=f.ij2index(i+1,j-1);
    //左
    arrDerection[6]=f.ij2index(i,j-1);
    //上-左
    arrDerection[7]=f.ij2index(i-1,j-1);

    //過濾掉-1
    arrDerection=arrDerection.filter(function(v){
      return (v+1 && Math.random()<.4);
    });



    return arrDerection;
  }


  // 算法
  solve(){
    var f=this;
    f.raf();
    return f;
  }
  //執行動畫
  raf(){
    var f=this;
    var rafCallback=function(){
      f.n++;
      //動畫終止條件
      if(f.n<1e1*f.interval){
        if(!(f.n%f.interval)){
          //若n加了10, currentStep加了1
          f.currentStep=f.n/f.interval;
          f.doINeveryframe();
        }
        window.requestAnimationFrame(rafCallback);
      }
    };
    window.requestAnimationFrame(rafCallback);
    return f;
  } //raf
  //每一幀你要做點什麽？
  doINeveryframe(){
    var f=this;
    console.log(f.currentStep);
    f.draw();
    return f;
  }
  draw(){
    var f=this,i;
    f.ctx.clearRect(0,0,f.CW,f.CH);
    f.ctx.translate(10.5,10.5);
    f.ctx.fillStyle=f.color;
    f.ctx.strokeStyle='dimgray';
    f.ctx.font='11px serif';

    for(i=0;i<f.adj.length;i++){
      f.drawEdge(i);
    }
    for(i=0;i<f.adj.length;i++){
      f.drawVertex(i);
    }

    f.ctx.translate(-10.5,-10.5);
    return f;
  }
  drawVertex(index){
    var f=this;
    f.ctx.beginPath();

    //arc(x, y, radius, startAngle, endAngle, anticlockwise)
    f.ctx.arc(f.index2center(index).x,f.index2center(index).y,4,0,2*Math.PI,true);
    f.ctx.fill();
    //f.ctx.fillText(index,f.index2center(index).x-5,f.index2center(index).y+3);

    f.ctx.closePath();
    f.ctx.stroke();
  }
  drawEdge(index){
    var f=this;
    //畫邊
    f.adj[index].neighbor.forEach(function(v){
      f.ctx.beginPath();
      f.ctx.moveTo(f.index2center(index).x,f.index2center(index).y);
      f.ctx.lineTo(f.index2center(v).x,f.index2center(v).y);
      f.ctx.closePath();
      f.ctx.stroke();
    });
    return f;
  }

} //class

var obj =new Astar();
obj.init();
obj.solve();
