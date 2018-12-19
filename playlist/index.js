class Playlist{
  constructor(){
    this.listMain=[];
    this.listSecondary=[];
    this.playMode=['隨機播放','順序播放','單曲播放'];
  }

  timer(){
    var es6This=this;
    var count=0;
    window.setInterval(function(){
      count++;
      console.log(count);
    },1e3);
    return es6This;
  }
}

var obj=new Playlist();
obj.timer();
