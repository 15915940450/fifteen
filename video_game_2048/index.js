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
    keyCodeEnable:[38,75,39,76,40,74,37,72],
    keyCode1:[39,76,40,74],
    keyCodeRotate:[38,75,40,74],
    initN:5,
    complete:false,
    base:2,
    target:2048
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
      var f=this;
      var items_value0=this.items.filter(function(v){
        return !(+v.value);
      });

      var randomOne=this.pickRandom(items_value0);
      //有空餘的tile
      if(randomOne){
        var index=randomOne.index;
        this.items=this.items.map(function(v){
          v.isNew=false;
          if(v.index===index){
            v.value=Math.random()>.2?f.base:f.base*2;
            if(!notMarkNew){
              //是新瓷磚（參數為false或不傳入）
              v.isNew=true;
            }
          }
          return (v);
        });
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
    slide:function(arr,type){
      var arrResult=arr.filter(function(v){
        return (+v.value);
      });
      var arrMissing=arr.filter(function(v){
        return (!+v.value);
      });
      //向左
      if(type===-1){
        arrResult=arrResult.concat(arrMissing);
      }else{
        arrResult=arrMissing.concat(arrResult);
      }
      return arrResult;
    },
    //結合(right)
    combine:function(arr,type){
      var i;
      if(type===-1){
        for(i=0;i<3;i++){
          if(arr[i].value===arr[i+1].value){
            arr[i].value*=2;
            arr[i+1].value=0;
          }
        }
      }else{
        for(i=3;i>0;i--){
          if(arr[i].value===arr[i-1].value){
            arr[i].value*=2;
            arr[i-1].value=0;
          }
        }
      }
      return (arr);
    },

    //監聽上右下左鍵(38/75,39/76,40/74,37/72)
    handleKey:function(keyCode){
      var f=this;

      if(!f.keyCodeEnable.includes(+keyCode) || f.complete){
        return false;
      }

      var type=-1,needRotate=false;
      if(f.keyCode1.includes(+keyCode)){
        type=1;
      }
      if(f.keyCodeRotate.includes(+keyCode)){
        needRotate=true;
      }

      //以備查看是否有變更
      var stringifyItems=JSON.stringify(f.items);

      //取消標志新
      f.cancelNew();

      //1.轉換為二維數組
      var x=f.to2Darr(f.items);

      if(needRotate){
        x=f.rotate(x);
      }
      //3.slide combine slide
      x=x.map(function(row){
        return (f.slide(f.combine(f.slide(row,type),type),type));
      });
      if(needRotate){
        x=f.rotate(x);
      }

      //5.更新items
      this.items=_.flatten(x);


      //是否達到2048
      if(f.checkWin()){
        console.log('win');
        f.complete=true;
        return true;
      }

      var isDiff=f.checkDiff(stringifyItems);
      if(isDiff){
        //如果有變化，新增一個數字
        window.setTimeout(function(){
          f.addNumber();
        },3e2);
      }else{
        //是否結束游戲
        if(f.checkOver()){
          console.log('game over');
          f.complete=true;
          return false;
        }
      }
    },
    checkOver:function(){
      var has0=this.items.some(function(v){
        return (!+v.value);
      });
      if(has0){
        return (false);
      }
      var x=this.to2Darr(this.items);
      var y=this.rotate(x);
      for(var i=0;i<4;i++){
        for(var j=0;j<3;j++){
          if(x[i][j].value===x[i][j+1].value || y[i][j].value===y[i][j+1].value){
            return (false);
          }
        }
      }
      return true;
    },
    checkWin:function(){
      var f=this;
      return (this.items.some(function(v){
        return (+v.value===f.target);
      }));
    },
    //轉換為二維數組
    to2Darr:function(arr){
      return (_.chunk(arr,4));
    },
    //翻轉數組
    rotate:function(arr){
      var arrResult=[];
      for(var i=0;i<4;i++){
        arrResult[i]=[];
        for(var j=0;j<4;j++){
          arrResult[i][j]=arr[j][i];
        }
      }
      return arrResult;
    },
    //檢查是否有變化
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


document.addEventListener('keydown',function(ev){
  obj.handleKey(ev.keyCode);
});
