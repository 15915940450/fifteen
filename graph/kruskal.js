class Kruskal{
  constructor(){
    this.n=-1;  //raf多少次
    this.interval=1; //每幀的間隔
    this.currentStep=-1; //當前。。。

    this.adj=[];

    this.queue=[];  //邊的隊列
    this.MST=[];
    this.currentEdge='';
    this.union_find=[];
  }

  init(){
    var i,j;
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
    for(i=0;i<this.adj.length;i++){
      //union find
      this.union_find[i]=-1;
      for(j=0;j<this.adj[i].length;j++){
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
      //直到樹中含有V-1條邊爲止
      if(f.MST.length<f.adj.length-1){
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
    console.log(JSON.stringify(f.MST));
    return f;
  }
  //每一幀你要做點什麽？
  doINeveryframe(){
    var f=this;

    //當前邊
    f.currentEdge=f.queue.shift();

    

    //檢測當前邊
    if(f.check()){
      //更新union_find數組
      f.updateUnionFind();

      //最小生成樹
      f.MST.push(f.currentEdge);
    }

    
    return f;
  }
  updateUnionFind(){
    var f=this;
    //連通分量union_find:https://www.jb51.net/article/77331.htm
    var minV=+Math.min.apply(null,f.currentEdge.edge.split('-'));
    var maxV=+Math.max.apply(null,f.currentEdge.edge.split('-'));
    var union_find_min=f.union_find[minV];
    var union_find_max=f.union_find[maxV];

    if(union_find_min===-1 && union_find_max===-1){
      f.union_find[minV]=minV;
      f.union_find[maxV]=minV;
    }
    if(union_find_min===-1 && union_find_max!==-1){
      f.union_find[minV]=union_find_max;
    }
    if(union_find_min!==-1 && union_find_max===-1){
      f.union_find[maxV]=union_find_min;
    }
    if(union_find_min!==-1 && union_find_max!==-1){
      f.union_find.forEach(function(v,i){
        if(v===union_find_max){
          f.union_find[i]=union_find_min;
        }
      });
    }
    return f;
  }
  //過濾掉失效的邊
  check(){
    var f=this;
    //過濾
    /*f.queue=f.queue.filter(function(v){

    });*/
    // 檢測當前邊的兩個頂點是否擁有相同的分量id
    var arrVertex=f.currentEdge.edge.split('-');
    var b=arrVertex.some(function(v){
      return (f.union_find[v]===-1);
    });

    //當前邊有效
    return (b || f.union_find[arrVertex[0]]!==f.union_find[arrVertex[1]]);
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


