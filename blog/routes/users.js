var express=require('express');
var router=express.Router();

router.get('/:name/',function(rqs,rps){
	rps.send('hello, '+rqs.params.name);
});

module.exports=router;