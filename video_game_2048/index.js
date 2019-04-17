new Vue({
  el:'#container',
  data:{
    items:[],
    initN:5
  },
  methods:{
    shuffle:function(){
      this.items=_.shuffle(this.items);
    },
    init:function(){
      var i;
      for(i=0;i<16;i++){
        this.items[i]={
          index:i,
          i:0,  //行
          j:0,  //列
          value:0
        };
      }

      for(i=0;i<this.initN;i++){
        this.addNumber();
      }
    },  //init
    addNumber:function(){
      var items_value0=this.items.filter(function(v){
        return !(+v.value);
      });

      var index=this.pickRandom(items_value0).index;
      this.items[index].value=Math.random()>.2?2:4;
    },
    pickRandom:function(arr){
      return (arr[arr.length*Math.random()>>0]);
    }
  },
  created:function(){
    this.init();
  }
});