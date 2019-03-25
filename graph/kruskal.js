class Kruskal{
  constructor(){
    this.n=-1;  //raf多少次
    this.interval=10; //每幀的間隔
    this.currentStep=-1; //當前。。。

    this.adj=[];

    this.queue=[];  //邊的隊列
  }

  init(){
    //鄰接表
    this.adj=[
      //v:0
      [
        {
          vertex:4,
          weight:38
        },
        {
          vertex:2,
          weight:26
        },
        {
          vertex:7,
          weight:16
        },
        {
          vertex:6,
          weight:58
        }
      ],
      // v:1
      [
        {
          vertex:5,
          weight:32
        },
        {
          vertex:7,
          weight:19
        },
        {
          vertex:2,
          weight:36
        },
        {
          vertex:3,
          weight:29
        }
      ],
      // v:2
      [
        {
          vertex:1,
          weight:36
        },
        {
          vertex:3,
          weight:17
        },
        {
          vertex:7,
          weight:34
        },
        {
          vertex:0,
          weight:26
        },
        {
          vertex:6,
          weight:40
        }

      ],
      // v:3
      [
        {
          vertex:1,
          weight:29
        },
        {
          vertex:2,
          weight:17
        }
      ],
      // v:4
      [
        {
          vertex:5,
          weight:35
        },
        {
          vertex:7,
          weight:37
        },
        {
          vertex:0,
          weight:38
        },
        {
          vertex:6,
          weight:93
        }
      ],
      // v:5
      [
        {
          vertex:4,
          weight:35
        },
        {
          vertex:1,
          weight:32
        },
        {
          vertex:7,
          weight:28
        }
      ],
      // v:6
      [
        {
          vertex:4,
          weight:93
        },
        {
          vertex:0,
          weight:58
        },
        {
          vertex:2,
          weight:40
        }
      ],
      // v:7
      [
        {
          vertex:5,
          weight:28
        },
        {
          vertex:4,
          weight:37
        },
        {
          vertex:0,
          weight:16
        },
        {
          vertex:2,
          weight:34
        },
        {
          vertex:1,
          weight:19
        }
      ]
    ];

    //優先隊列（邊）
    for(var i=0;i<this.adj.length;i++){
      for(var j=0;j<this.adj[i].length;j++){
        var v=this.adj[i][j];
        this.queue.push({
          weight:v.weight,
          edge:i+'-'+v.vertex
        });
      }
    } //for

    //優先隊列（去重）
    this.queue=this.uniq(this.queue,function(v){
      var v0=+v.edge.split('-')[0];
      var v1=+v.edge.split('-')[1];
      var edge=v0+'-'+v1;
      if(v0>v1){
        edge=v1+'-'+v0;
      }
      return (edge);
    });
    //優先隊列（排序）
    this.queue.sort(function(a,b){
      return (a.weight-b.weight);
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
    console.log(f.queue);
    return f;
  }

  //fun:生成hash[x]=true中的x
  uniq(arr,fun){
    var arrTemp=[],hash={},i;

    for(i=0;i<arr.length;i++){
      var hashKey=arr[i];
      
      //若果傳入了key生成函數
      if(fun){
        hashKey=fun(arr[i]);
      }
      if(!hash[hashKey]){
        arrTemp.push(arr[i]);
        hash[hashKey]=true;
      }
    }

    return arrTemp;
  }

} //class

var obj=new Kruskal();
obj.init();
obj.solve();


