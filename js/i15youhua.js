Array.prototype.hasSameElement = function() { //数组重复
  var bYes = false;
  var objKeyFormArrayValue = {};
  for (var i = 0; i < this.length; i++) {
    if (objKeyFormArrayValue[this[i]] === 1) {
      bYes = true;
    }
    objKeyFormArrayValue[this[i]] = 1;
  }
  return bYes;
}

function lookForX() { //計算x值
  var arrResult2D = []; //二維數組
  var x1, x2, x3, x4, x5, x6, x7, x8, x9;
  var arrPosibility = []; //结果数组
  for (x1 = 1; x1 <= 9; x1++) {
    arrPosibility[0] = x1;
    arrPosibility.length = 1;
    for (x2 = 1; x2 <= 9; x2++) {
      arrPosibility[1] = x2;
      arrPosibility.length = 2;
      if (!arrPosibility.hasSameElement()) { //!重复
        for (x3 = 1; x3 <= 9; x3++) {
          arrPosibility[2] = x3;
          arrPosibility.length = 3;
          if (x1 + x2 + x3 === 15 && !arrPosibility.hasSameElement()) {
            for (x4 = 1; x4 <= 9; x4++) {
              arrPosibility[3] = x4;
              arrPosibility.length = 4;
              if (!arrPosibility.hasSameElement()) {
                for (x5 = 1; x5 <= 9; x5++) {
                  arrPosibility[4] = x5;
                  arrPosibility.length = 5;
                  if (!arrPosibility.hasSameElement()) {
                    for (x6 = 1; x6 <= 9; x6++) {
                      arrPosibility[5] = x6;
                      arrPosibility.length = 6;
                      if (x4 + x5 + x6 === 15 && !arrPosibility.hasSameElement()) {
                        for (x7 = 1; x7 <= 9; x7++) {
                          arrPosibility[6] = x7;
                          arrPosibility.length = 7;
                          if (!arrPosibility.hasSameElement()) {
                            for (x8 = 1; x8 <= 9; x8++) {
                              arrPosibility[7] = x8;
                              arrPosibility.length = 8;
                              if (!arrPosibility.hasSameElement()) {
                                for (x9 = 1; x9 <= 9; x9++) {
                                  arrPosibility[8] = x9;
                                  arrPosibility.length = 9;
                                  if (x7 + x8 + x9 === 15 && !arrPosibility.hasSameElement()) {
                                    var fcs1 = (x1 + x4 + x7 === 15);
                                    cs++; //次数
                                    var fcs2 = (x2 + x5 + x8 === 15);
                                    var fcs3 = (x3 + x6 + x9 === 15);
                                    var fcs4 = (x1 + x5 + x9 === 15);
                                    var fcs5 = (x3 + x5 + x7 === 15);
                                    if (fcs1 && fcs2 && fcs3 && fcs4 && fcs5) {
                                      tmpArr = [x1, x2, x3, x4, x5, x6, x7, x8, x9];
                                      arrResult2D.push(tmpArr);
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return arrResult2D;
}
console.time("shiwu");
var cs = 0;
var arrResult2D = lookForX();
console.log('执行完毕' + cs);
console.log(arrResult2D);
console.log(JSON.stringify(arrResult2D));
console.timeEnd("shiwu");
