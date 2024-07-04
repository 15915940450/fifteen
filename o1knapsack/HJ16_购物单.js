// HJ16 购物单
// V________年终奖 N 元
// n________m
// 主 附
// 先买主，才能买附
// 主：0,1,2个附件
// v2________乘积(价值v2):
// v1________价格10*n(体积v1):
// B=[0,1,,,]
// B[0]*v1[0]+..+B[i]*v1[i]<=N
// ==> max: B[0]*v2[0]+..+B[i]*v2[i]


// N m   - 1000 5                                  |1
// v(价格) p（重要度） q（主(0)？） - 800 2 0          |2 第2行指示了第1个物品的资讯


/*
1000 5
800 2 0
400 5 1
300 5 1
400 3 0
500 2 0


=>2200

先只考虑主件
n\V   0 1   2   3   4   5   6   7   8   9   10
8)    0 0   0   0   0   0   0   0   16  16  16
4)    0 0   0   0   12  12  12  12  16  16  16
5)    0 0   0   0   12  12  12  12  16  22  22


dp=[[]]
v1[i]>j)  dp[i][j]=dp[i-1][j]  无奈，装不下
v1[i]<=j) dp[i][j]=max(dp[i-1][j-v1[i]]+v2[i],dp[i-1][j])  可以装下，但我们有选择权


例2
1200 5
800 2 0
400 5 1
300 5 1
400 3 0
500 2 0

=>3600
*/


const rl=require('readline').createInterface({input:process.stdin})



let count=-1

let V=0
let n=0
let v1=[]
let v2=[]
let step=100  //原题题意是10，开发调试方便就设定为100
let oSub={}
rl.on('line',(param)=>{
  count++
  if(!count){
    V=+param.split(' ')[0]
    V/=step
    n=+param.split(' ')[1]
    return
  }
  let [v,p,q]=param.split(' ').map(v=>+v)
  v/=step
  // 物品的索引
  let vIndex=q-1
  if(vIndex===-1){
    // 主
    v1.push(v)
    v2.push(v*p)
  }else{
    if(!oSub[vIndex]){
      oSub[vIndex]=[]
    }
    oSub[vIndex].push({
      v1:v,
      v2:v*p
    })

  }
  // ..以上处理输入 完成

  if(count===n){
    count=-1

    let lenMain=v1.length
    let dp=[[]]
    for(let i=0;i<lenMain;i++){
      dp[i]=dp[i]||[]

      for(let j=0;j<=V;j++){
        // 无奈之举
        if(v1[i]>j){
          dp[i][j]=dp[i-1]?.[j]??0
        }
        
        // 可以选取主物品i
        if(v1[i]<=j){
          let to=dp[i-1]?.[j]??0
          let tole=(dp[i-1]?.[j-v1[i]]??0)+v2[i]
          dp[i][j]=Math.max(to,tole)
        }
        // 可以选取主i+附0
        let sub0=oSub[i]?.[0]
        if(sub0 && v1[i]+sub0.v1<=j){
          let record=dp[i][j]
          let tole=(dp[i-1]?.[j-v1[i]-sub0.v1]??0)+v2[i]+sub0.v2
          dp[i][j]=Math.max(record,tole)
        }
        
        // 可以选取主i+附1
        let sub1=oSub[i]?.[1]
        if(sub1 && v1[i]+sub1.v1<=j){
          let record=dp[i][j]
          let tole=(dp[i-1]?.[j-v1[i]-sub1.v1]??0)+v2[i]+sub1.v2
          dp[i][j]=Math.max(record,tole)
        }


        // 可以选取主i+附0+附1
        if(sub0 && sub1 && v1[i]+sub0.v1+sub1.v1<=j){
          let record=dp[i][j]
          let tole=(dp[i-1]?.[j-v1[i]-sub0.v1-sub1.v1]??0)+v2[i]+sub0.v2+sub1.v2
          dp[i][j]=Math.max(record,tole)
        }
      }
    }


    console.log(dp)
    console.log(dp.at(-1).at(-1)*step)

    return rl.close()
  }

})