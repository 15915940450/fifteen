/* https://www.bilibili.com/video/av11866460?from=search&seid=18054295925786167084 */

class KMP{
  constructor(){
    this.n=-1;  //raf多少次
    this.interval=1; //每幀的間隔
    this.currentStep=-1; //當前。。。

    this.S='abaacababcacKMP算法是一种改进的字符串匹配算法，由D.E.Knuth，J.H.Morris和V.R.Pratt同时发现，因此人们称它为克努特——莫里斯——普拉特操作（简称KMP算法）。KMP算法的关键是利用匹配失败后的信息，尽量减少模式串与主串的匹配次数以达到快速匹配的目的。具体实现就是实现一个next()函数，函数本身包含了模式串的局部匹配信息。时间复杂度O(m+n)。';
    this.P='ababc';
    this.M=this.S.length;
    this.N=this.P.length;
    this.prefix=[];

    this.i=0;
    this.j=0;
    this.complete=false;

    this.result=-1; //索引
  }

  init(){
    document.querySelector('#s').innerHTML=this.S;
    document.querySelector('#p').innerHTML=this.P;

    this.calcPrefix();
  }

  //求出前綴表（-1）
  calcPrefix(){
    var arrTemp=[];
    for(var i=1;i<this.N;i++){
      arrTemp.push(this.P.slice(0,i));
    }
    arrTemp=arrTemp.map(function(v){
      var len=0;
      for(var k=v.length-1;k>0;k--){
        if(v.slice(0,k)===v.slice(v.length-k)){
          // console.log(k);
          len=k;
          break;
        }
      }

      return len;
    });
    arrTemp.unshift(-1);
    this.prefix=arrTemp;
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
      if(!f.complete){
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
    var iVal=this.S.charAt(this.i);
    var jVal=this.P.charAt(this.j);
    if(iVal===jVal || this.prefix[this.j]===-1){
      if(this.j===this.N-1){
        this.result=this.i-this.j;

        console.log(this.result);
        this.complete=true;
        return true;
      }

      this.i++;
      this.j++;
    }else{
      this.j=this.prefix[this.j];
    }



    return f;
  }

} //class

var obj=new KMP();
obj.init();
obj.solve();


console.log(obj.S.match(obj.P));