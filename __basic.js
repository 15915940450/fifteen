// 132,5028,7563
// 159,9206,8574
class Basic{
  constructor(){
  }

  init(){
    
  }

  // 算法
  solve(){
    var f=this;
    f.raf(10);
    return f;
  }
  //執行動畫
  raf(interval){
    interval=interval || 1;
    var f=this;
    var rafCallback=function(){
      f.currentV++;
      if(f.currentV<1e1*interval){
        if(f.currentV%interval===0){
          f.doINeveryframe();
        }
        window.requestAnimationFrame(rafCallback);
      }
    };
    window.requestAnimationFrame(rafCallback);
    return f;
  } //raf
  doINeveryframe(){
    var f=this;
    console.log(f.currentV);
    return f;
  }

} //class

var obj=new Basic();
obj.init();
obj.solve();