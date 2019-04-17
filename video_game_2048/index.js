var obj=new Vue({
  el:'#container',
  data:{
    items:(function(){
      var i,arrItems=[];
      for(i=0;i<16;i++){
        arrItems[i]={
          index:i,
          i:i/4>>0,  //行
          j:i%4,  //列
          value:0
        };
      }
      return arrItems;
    })(),
    initN:5
  },
  methods:{
    shuffle:function(){
      this.items=_.shuffle(this.items);
    },
    init:function(){
      for(var i=0;i<this.initN;i++){
        this.addNumber();
      }
    },  //init

    //產生新數字
    addNumber:function(){
      var items_value0=this.items.filter(function(v){
        return !(+v.value);
      });

      var randomOne=this.pickRandom(items_value0);
      if(randomOne){
        var index=randomOne.index;
        this.items=this.items.map(function(v){
          if(v.index===index){
            v.value=Math.random()>.2?2:4;
          }
          return (v);
        });
      }else{
        console.log('沒有空餘的tile');
      }
      
    },
    index2ij:function(index){
      return ({
        i:index/4>>0,
        j:index%4
      });
    },
    //滑動(right)
    slide:function(arr){
      var arrResult=arr.filter(function(v){
        return (+v.value);
      });
      var arrMissing=arr.filter(function(v){
        return (!+v.value);
      });
      arrResult=arrMissing.concat(arrResult);
      return arrResult;
    },
    to2Drow:function(arr){
      return (_.chunk(arr,4));
    },
    handleKey(keyCode){
      var f=this;
      switch(+keyCode){
      case 39:
        this.items=_.flatten(this.to2Drow(this.items).map(function(v){
          return (f.slide(v));
        }));
        this.addNumber();
        break;
      case -1:
        break;
      default:
        console.log(keyCode);
      }
    },
    //從數組中隨機選出一個元素
    pickRandom:function(arr){
      return (arr[arr.length*Math.random()>>0]);
    }
  },
  created:function(){
    this.init();
  }
});


document.onkeydown=function(ev){
  obj.handleKey(ev.keyCode);
};