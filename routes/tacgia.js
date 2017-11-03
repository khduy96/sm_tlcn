var express = require('express');
var router = express.Router();

var Employee = require('../models/employees');
var Article = require('../models/articles');

/* GET  */
router.get('/suabai', function(req, res) {
  res.render('tacgia_suabai', { title: 'SM-TLCN' });
});
router.get('/', function(req, res) {
	Employee.getEmployeeByEmail('khuongduy@gmail.com',function(err, employee){
    if(err) throw err;
			res.render('tacgia',{
        title: 'SM-TLCN',
				cemail:employee.email,
				cpass:employee.password,
        cbirthday:employee.birthday,
        cphone:employee.phone,
        caddress:employee.address,
        csex:employee.sex,
        ccpn:employee.cpn,
        cname:employee.name
			});
	});
});
//insert
router.post('/submitart', function(req, res){
  //
  let scaFile = req.files.ccafile;
  
  let sfileName='' ;
  let sdirFile='';
  // Validation
  req.checkBody('clinhvuc', 'Bạn cần nhập Lĩnh vực').notEmpty();
  req.checkBody('ctitle', 'Bạn cần nhập Tiêu đề').notEmpty();
  req.checkBody('cmysub', 'Bạn cần nhập Nội dung').notEmpty();
  req.checkBody('ctgemail', 'Email không đúng định dạng').isEmail();
  req.checkBody('ctgemail', 'Bạn cần nhập Email').notEmpty();
//
  var errors = req.validationErrors();
  if(errors || !scaFile){
    //if(!scaFile){
      //req.flash('error', 'Bạn chưa chọn file');
     // res.json({noti:'1'});
    //}
    //req.flash('error_msg', errors);
    console.log(errors);
    //res.redirect('/tacgia');
    res.json({noti:'0'});
  }
  else{

  sfileName= scaFile.name.substring(0,scaFile.name.lastIndexOf('.'))
  + Date.now() + scaFile.name.substring(scaFile.name.lastIndexOf('.'),scaFile.name.length);
    //
  let sid='art' + Date.now();
  let slinhvuc = req.body.clinhvuc;
	let stitle = req.body.ctitle;
	let smysub = req.body.cmysub;
  let stgemail = req.body.ctgemail;
  sdirFile ='./public/cafilefol/' + sfileName;
  //
   //  else {
      var newArticle = new Article({
        _id : sid,
        lv: slinhvuc,
        title:stitle,
        description: smysub,
        tgemail: stgemail,
        cafile: sdirFile
      });
      //
      
      Article.createArticle(newArticle, function(err, article){
        if(err) throw err;
        scaFile.mv(sdirFile,function(err){
          if (err) {
            //xóa bài viết vừa tạo
            Article.deleteArticle(sid,function(err){
              if(err) throw err;
              console.log('delete success when file upload err');
            });
            throw err;
          }
  
          console.log('File '+sfileName + 'uploaded into' + sdirFile);
        });
        console.log(article);
        res.json(article);
      });
      req.flash('success_msg', 'You are submited article success');
      //res.redirect('/tacgia');
   // }
  }
});
//update
router.put('/updateart/:cid',function(req,res){
  let sid = req.params.cid;
  let newArticle = new Article({
    lv: 'lv update nà',//req.body...
    title:'title update nà',
    description: 'des update nà',
    tgemail: 'mail@gmail.com'
  });
  Article.updateArticle(sid,newArticle,{},function(err,articleup){
    if(err) throw err;
    console.log(articleup);
  })
});
//delete
router.delete('/deleteart/:cid', function(req, res){
  let sid = req.params.cid;
  Article.deleteArticle(sid,function(err){
      if(err) throw err;
      console.log('delete success');
  })
});
//
module.exports = router;
