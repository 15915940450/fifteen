// 132,5028,7563
// 159,9206,8574
class Dijkstra{
  constructor(){
    this.n=-1;  //raf多少次
    this.interval=10; //每幀的間隔
    this.currentStep=-1; //當前。。。

    this.adj=[];
  }

  init(){
    this.adj=[
      // vertex:0
      [
        {
          vertex:2,
          distance:26
        },
        {
          vertex:4,
          distance:38
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
    console.log(f.adj);
    return f;
  }

} //class

var obj=new Dijkstra();
obj.init();
obj.solve();