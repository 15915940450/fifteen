class Playlist{
  constructor(){
    this.listMain=[];
    this.listSecondary=[];
    this.playMode=['隨機播放','順序播放','單曲播放'];
  }

  initList(){
    var es6This=this;
    for(var i=0;i<19;i++){
      es6This.listMain.push(i*1e4);
    }
    es6This.listSecondary=['0.謝謝你的愛','1.風雨依然','2.灰色軌跡'];

    return es6This;
  }
  timer(){
    var es6This=this;
    var count=0;
    var Timer=window.setInterval(function(){
      if(count>1e2){
        window.clearInterval(Timer);
      }
      // console.log(String.fromCharCode(count));
      es6This.handlePlay(count,0,0);
      count++;
    },1e3);
    return es6This;
  }
  handlePlay(count,playMode,currentTimer){
    var es6This=this;
    playMode=playMode || 0;

    var index=count>>>1;
    if(count&1){
      //1,3,5,7,9
      //listSecondary
      index=index%(es6This.listSecondary.length);
      console.log(es6This.listSecondary[index]);
    }else{
      //listMain
      switch (playMode){
      case 0:
        console.log(es6This.listMain[Math.floor(es6This.listMain.length*Math.random())]);
        break;
      case 1:
        console.log(es6This.listMain[index%(es6This.listMain.length)]);
        break;
      case 2:
        console.log(currentTimer);
        break;
      default:
        console.log('impossible');
      }

    }


    
    
    
    return (es6This);
  }
}


var obj=new Playlist();
obj.initList().timer();
