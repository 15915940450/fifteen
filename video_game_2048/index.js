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
          isNew:false,
          value:0
        };
      }
      return arrItems;
    })(),
    initN:5
  },
  methods:{
    //洗牌
    shuffle:function(){
      this.items=_.shuffle(this.items);
    },
    //初始化：添加initN個瓷磚（標志不是新瓷磚）
    init:function(){
      for(var i=0;i<this.initN;i++){
        this.addNumber(true);
      }
    },  //init

    //產生新數字
    addNumber:function(notMarkNew){
      var items_value0=this.items.filter(function(v){
        return !(+v.value);
      });

      var randomOne=this.pickRandom(items_value0);
      if(randomOne){
        var index=randomOne.index;
        this.items=this.items.map(function(v){
          v.isNew=false;
          if(v.index===index){
            v.value=Math.random()>.2?2:4;
            if(!notMarkNew){
              //是新瓷磚（參數為false或不傳入）
              v.isNew=true;
            }
          }
          return (v);
        });
      }else{
        console.log('沒有空餘的tile');
      }
      
    },
    //取消標志新瓷磚
    cancelNew:function(){
      this.items=this.items.map(function(v){
        v.isNew=false;
        return (v);
      });
    },
    //索引推出行列（i,j）
    index2ij:function(index){
      return ({
        i:index/4>>0,
        j:index%4
      });
    },
    //行列推出索引
    ij2index:function(i,j){
      return (i*4+j);
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
    combine:function(arr){
      for(var i=3;i>0;i--){
        // console.log(i); //3,2,1
        if(arr[i].value===arr[i-1].value){
          arr[i].value*=2;
          arr[i-1].value=0;
        }
      }
      // console.log(JSON.stringify(arr));
      return (arr);
    },
    //轉換為二維數組
    to2Drow:function(arr){
      return (_.chunk(arr,4));
    },
    //監聽上下左右鍵(38,39,40,37)
    handleKey:function(keyCode){
      var f=this;

      var stringifyItems=JSON.stringify(f.items);

      switch(+keyCode){
      case 39:
        f.cancelNew();
        //1.轉換為二位數組
        var x=f.to2Drow(f.items);
        //2.每一行（4個元素）右滑
        x=x.map(function(row){
          return (f.slide(row));
        });
        //3.每一行（4個元素）化合
        x=x.map(function(row){
          return (f.combine(row));
        });
        //4.每一行（4個元素）右滑
        x=x.map(function(row){
          return (f.slide(row));
        });
        //設置items
        f.items=_.flatten(x);
        var isDiff=f.checkDiff(stringifyItems);

        if(isDiff){
          //如果有變化，新增一個數字
          window.setTimeout(function(){
            f.addNumber();
          },3e2);
        }
        
        break;
      case -1:
        break;
      default:
        // console.log(keyCode);
      }
    },
    checkDiff:function(stringifyItems){
      var prev=JSON.parse(stringifyItems);
      for(var i=0;i<prev.length;i++){
        if(prev[i].value!==this.items[i].value){
          return true;
        }
      }
      return false;
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