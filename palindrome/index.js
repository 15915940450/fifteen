/*騰訊面試題：尋找最長回文子串*/

class Palindrome{
  constructor(){
    this.testStr='bananas';
    this.result=''; //最長回文子串
  }

  init(){
    var len=this.testStr.length;
    //http://www.w3school.com.cn/js/pro_js_statements_break_continue.asp
    subLen:
    for(var i=len;i>1;i--){
      //第一層循環表示字串的長度
      for(var j=0;j<len-i+1;j++){
        //第二層循環表示原字符串的索引
        var sub=this.testStr.slice(j,j+i);
        if(this.isPalindrom(sub)){
          this.result=sub;
          break subLen;
        }
      }
    }
  }

  isPalindrom(str){
    if(str.length>1){
      var reverseStr=str.split('').reverse().join('');
      return (str===reverseStr);
    }
    return false;
  }
} //class

var obj=new Palindrome();
obj.init();
console.log(obj.result);
