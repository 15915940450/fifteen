class Journey{
  constructor(){
    this.arrX=[1,2,2,1,-1,-2,-2,-1];  //橫軸
    this.arrY=[2,1,-1,-2,2,1,-1,-2];  //豎軸
  }

  check(){
    var pass=true;
    return pass;
  }
} //class

var obj=new Journey();
obj.check();
