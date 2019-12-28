/*
https://baike.baidu.com/item/农历/67925
*/
class Lunar{
  constructor(){
    this.n=-1;  //raf多少次
    this.interval=10; //每幀的間隔
    this.currentStep=-1; //當前。。。

    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH4=document.documentElement.clientHeight || document.body.clientHeight;
  }

  //判断动画是否 持续 进行
  ciZuk(){
    return (this.n<1e1*this.interval);
  }

  init(){
    
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
      //動畫进行中
      if(f.ciZuk()){
        if(!(f.n%f.interval)){
          //一帧一步
          f.currentStep++;
          f.doINeveryframe();
        }
        window.requestAnimationFrame(rafCallback);
      } //end if
    };
    window.requestAnimationFrame(rafCallback);
    return f;
  } //raf
  //每一幀你要做點什麽？
  doINeveryframe(){
    var f=this;
    console.log(f.currentStep);
    return f;
  }

  lunar(){
    var sWeek = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    var dNow = new Date();
    var CalendarData = new Array(100);
    var madd = new Array(12);
    var tgString = '甲乙丙丁戊己庚辛壬癸';
    var dzString = '子丑寅卯辰巳午未申酉戌亥';
    var numString = '一二三四五六七八九十';
    var monString = '正二三四五六七八九十冬腊';
    // var weekString = '日一二三四五六';
    // var sx = '鼠牛虎兔龙蛇马羊猴鸡狗猪';
    var cYear, cMonth, cDay, TheDate;
    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
    madd[0] = 0;
    madd[1] = 31;
    madd[2] = 59;
    madd[3] = 90;
    madd[4] = 120;
    madd[5] = 151;
    madd[6] = 181;
    madd[7] = 212;
    madd[8] = 243;
    madd[9] = 273;
    madd[10] = 304;
    madd[11] = 334;
    function GetBit(m, n) {
      return (m >> n) & 1;
    }
    function e2c() {
      TheDate = (arguments.length !== 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
      var total, m, n, k;
      var isEnd = false;
      var tmp = TheDate.getFullYear();
      total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
      if (TheDate.getYear() % 4 === 0 && TheDate.getMonth() > 1) {
        total++;
      }
      for (m = 0;; m++) {
        k = (CalendarData[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
          if (total <= 29 + GetBit(CalendarData[m], n)) {
            isEnd = true;
            break;
          }
          total = total - 29 - GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
      }
      cYear = 1921 + m;
      cMonth = k - n + 1;
      cDay = total;
      if (k === 12) {
        if (cMonth === Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth = 1 - cMonth;
        }
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth--;
        }
      }
    }
    function GetcDateString() {
      var tmp = '';
      tmp += tgString.charAt((cYear - 4) % 10);
      tmp += dzString.charAt((cYear - 4) % 12);
      tmp += '年 ';
      if (cMonth < 1) {
        tmp += '(闰)';
        tmp += monString.charAt( - cMonth - 1);
      } else {
        tmp += monString.charAt(cMonth - 1);
      }
      tmp += '月';
      tmp += (cDay < 11) ? '初': ((cDay < 20) ? '十': ((cDay < 30) ? '廿': '三十'));
      if (cDay % 10 !== 0 || cDay === 10) {
        tmp += numString.charAt((cDay - 1) % 10);
      }
      return tmp;
    }
    function GetLunarDay(solarYear, solarMonth, solarDay) {
      if (solarYear < 1921 || solarYear > 2020) {
        return '';
      } else {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        e2c(solarYear, solarMonth, solarDay);
        return GetcDateString();
      }
    }
    var D = new Date();
    var yy = D.getFullYear();
    var mm = D.getMonth() + 1;
    var dd = D.getDate();
    // var ww = D.getDay();
    // var ss = parseInt(D.getTime() / 1000);
    function getFullYear(d) { // 修正firefox下year错误
      var yr = d.getYear();
      if (yr < 1000) yr += 1900;
      return yr;
    }
    function showDate() {
      var sValue = getFullYear(dNow) + '年' + (dNow.getMonth() + 1) + '月' + dNow.getDate() + '日' + ' ' + sWeek[dNow.getDay()] + ' ';
      sValue += GetLunarDay(yy, mm, dd);
      document.getElementById('pDate').innerHTML = sValue;
    }
    window.onload = showDate;
  }

} //class

// var obj=new Lunar();
// obj.init();
// obj.solve();
// obj.lunar();



/*
==========================================================
https://github.com/wvv8oo/lunar(用的时候记得归零时分秒)

T返回传统的天干地支年份
A返回生肖属相
Y返回中文的年，如二〇一二
y返回英文数字的年，如2012
m返回中文的月份，如五
M返回传统的月份，如腊月和正月
d返回传统的天名称，如初四、十八、卅
D返回传统的天名称，但是如果是初一的话，会返回这个月的月份名称，例如四月初一返回的是四月而非初一
*/
var today=new Date();
var arrSolar=[
  {
    'name':'艾雪',
    'birthday':'2013-07-26',
    'ymd':[2013,6,26]
  },
  {
    'name':'艾琪',
    'birthday':'2017-01-15',
    'ymd':[2017,0,15]
  },
  {
    'name':'HM',
    'birthday':'1989-09-01',
    'ymd':[1989,8,1]
  },
  {
    'name':'Hokcung',
    'birthday':'1986-07-14',
    'ymd':[1986,6,14]
  },
  {
    'name':'今日',
    'birthday':today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
    'ymd':[today.getFullYear(),today.getMonth(),today.getDate()]
  }
];

var elFooter=document.querySelector('footer');
var strLunar=arrSolar.map(function(v){
  var lunar=window.chineseLunar.solarToLunar(new Date(v.ymd[0],v.ymd[1],v.ymd[2]),'TAYMD');
  return (`<span>
      ${v.name}: 
      ${lunar}
    </span>`);
}).join('');
elFooter.innerHTML=strLunar;

/*
艾雪: 癸巳年蛇二〇一三年六月十九 艾琪: 丙申年猴二〇一六年腊月十八 HM: 己巳年蛇一九八九年八月初二 Hokcung: 丙寅年虎一九八六年六月初八 今日: 己亥年猪二〇一九年腊月初三
*/