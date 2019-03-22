// 132,5028,7563
// 159,9206,8574
class Basic{
  constructor(){
    this.n=-1;  //raf多少次
    this.interval=10; //每幀的間隔
    this.currentV=-1; //當前。。。
  }

  init(){
    
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
          //若n加了10, currentV加了1
          f.currentV=f.n/f.interval;
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
    console.log(f.currentV);
    return f;
  }

} //class

var obj=new Basic();
obj.init();
obj.solve();