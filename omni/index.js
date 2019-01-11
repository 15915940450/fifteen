// var vm=new Vue({
new Vue({
  el:'#f',
  data:{
    test:'69',
    fe:[],
    one:[],
    two:[],

    F:{}
  },
  filters:{
    justDate:function(v){
      return (v.slice(0,10));
    },
    //攝氏度轉華氏度(人体温度为100華氏度)
    C2F:function(v){
      return (32+1.8*v).toFixed(0);
    }
  },
  methods:{
    jsonWithoutVue:function(v){
      return console.log(JSON.parse(JSON.stringify(v)));
    },
    ajax:function(url,callback){
      var xmlHttp=new XMLHttpRequest();
      xmlHttp.open('GET',url,true);
      xmlHttp.send();
      //responseXML
      xmlHttp.onreadystatechange=function(){
        if(xmlHttp.readyState===4 && xmlHttp.status===200){
          callback(xmlHttp);
        }
      };
    },
    ajaxXML:function(){
      var _v_=this;
      var x2js = new X2JS();
      _v_.ajax('Actual.xml',function(data){
        var xml=data.responseXML;
        var jsonObj=(x2js.xml2json(xml));
        _v_.jsonWithoutVue(jsonObj);
        var task=jsonObj.scenario.task;
        
        _v_.done(task);
      });
    },
    done:function(task){
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
    },
    // https://lbs.amap.com/api/webservice/guide/api/weatherinfo/
    // //restapi.amap.com/v3/weather/weatherInfo?key=1e7aa5738766183518444f8dcc7426d2&city=440309
    Fahrenheit:function(){
      var _v_=this;
      _v_.ajax('//restapi.amap.com/v3/weather/weatherInfo?key=1e7aa5738766183518444f8dcc7426d2&city=440309',function(data){
        _v_.F=(JSON.parse(data.responseText).lives[0]);
      });
    }
  },
  created:function(){
    this.Fahrenheit();
    // this.ajaxXML();
  }
});
