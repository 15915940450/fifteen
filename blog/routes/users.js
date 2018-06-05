var express=require('express');
var router=express.Router();

router.get('/:name/',function(rqs,rps){
  rps.render('users',{
    name:rqs.params.name
  });
});

module.exports=router;