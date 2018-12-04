// var vm=new Vue({
new Vue({
  el:'#omni',
  data:{
    test:'69',
    fe:[],
    one:[],
    two:[]
  },
  filters:{
    justDate:function(v){
      return (v.slice(0,10));
    }
  },
  methods:{
    jsonWithoutVue:function(v){
      return console.log(JSON.parse(JSON.stringify(v)));
    },
    ajax:function(){
      var _v_=this;
      var x2js = new X2JS();
      var xmlHttp=new XMLHttpRequest();
      xmlHttp.open('GET','Actual.xml',true);
      xmlHttp.send();
      //responseXML
      xmlHttp.onreadystatechange=function(){
        if(xmlHttp.readyState===4 && xmlHttp.status===200){
          var xml=xmlHttp.responseXML;
          var jsonObj=(x2js.xml2json(xml));
          _v_.jsonWithoutVue(jsonObj);
          var task=jsonObj.scenario.task;
          
          _v_.done(task);
        }
      };
    },
    done:function(task){
      var _v_=this;
      this.fe=task.filter(function(v){
        if(v.assignment){
          return (v.assignment._idref==='r2');
        }
      });
      // console.log(_v_.jsonWithoutVue(_v_.fe));

      this.one=task.filter(function(v){
        if(v.assignment){
          return (v.assignment._idref==='r3');
        }
      });
      this.two=task.filter(function(v){
        if(v.assignment){
          return (v.assignment._idref==='r4');
        }
      });
    }
  },
  created:function(){
    this.ajax();
  }
});

// var arr=[1,3,9];
// var x=arr.reduce(function(accumulator,v,c,d){
//   return (accumulator+v);
// });
// console.log(x);
// console.log(arr);