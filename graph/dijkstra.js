class Dijkstra{
  constructor(){
    this.n=-1;  //raf多少次
    this.interval=1; //每幀的間隔
    this.currentStep=-1; //當前。。。

    this.startV=0;
    this.endV=6;
    this.adj=[];

    this.queue=[];
    this.distTo=[];

    this.SPT=[];
  }

  init(){
    var f=this;
    //初始化鄰接表
    f.adj=[
      // vertex:0
      [
        {
          vertex:4,
          distance:38
        },
        {
          vertex:2,
          distance:26
        }
      ],
      // vertex:1
      [
        {
          vertex:3,
          distance:29
        }
      ],
      // vertex:2
      [
        {
          vertex:7,
          distance:34
        }
      ],
      // vertex:3
      [
        {
          vertex:6,
          distance:52
        }
      ],
      // vertex:4
      [
        {
          vertex:7,
          distance:37
        },
        {
          vertex:5,
          distance:35
        }
      ],
      // vertex:5
      [
        {
          vertex:7,
          distance:28
        },
        {
          vertex:1,
          distance:32
        },
        {
          vertex:4,
          distance:35
        }
      ],
      // vertex:6
      [
        {
          vertex:2,
          distance:40
        },
        {
          vertex:0,
          distance:58
        },
        {
          vertex:4,
          distance:93
        }
      ],
      // vertex:7
      [
        {
          vertex:5,
          distance:228
        },
        {
          vertex:3,
          distance:39
        }
      ]
    ];

    //初始化distTo
    for(var i=0;i<f.adj.length;i++){
      f.distTo[i]=Infinity;
    }
    f.distTo[f.startV]=0;
    //初始化優先隊列
    f.queue.push({
      vertex:f.startV,
      distance:0
    });


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
      if(f.queue.length){
        if(!(f.n%f.interval)){
          //若n加了10, currentStep加了1
          f.currentStep=f.n/f.interval;
          f.doINeveryframe();
        }
        window.requestAnimationFrame(rafCallback);
      }else{
        f.success();
      }
    };
    window.requestAnimationFrame(rafCallback);
    return f;
  } //raf
  success(){
    var f=this;
    console.log(JSON.stringify(f.SPT));
    return f;
  }
  //每一幀你要做點什麽？
  doINeveryframe(){
    var f=this;
    //從優先隊列中刪除頂點0
    var currentV=f.queue.shift();


    //將頂點2，4加入優先隊列
    f.adj[currentV.vertex].forEach(function(v){
      var distance=f.distTo[currentV.vertex]+v.distance;
      if(distance<f.distTo[v.vertex]){
        var edge=currentV.vertex+'-'+v.vertex;
        if(f.distTo[v.vertex]!==Infinity){
          console.log(edge);
        }
        //放鬆邊
        f.distTo[v.vertex]=distance;
        f.queue.push(v);
        //將0-2添加到樹中
        f.SPT.push(edge);
      }
    });

    return f;
  }

} //class

var obj=new Dijkstra();
obj.init();
obj.solve();
