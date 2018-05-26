var express=require('express');
var router=express.Router();

router.get('/',function(rqs,rps){
	rps.send('hello, router.');
});

module.exports=router;