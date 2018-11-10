var express = require('express');
var router = express.Router();
var Note = require('../model/note').Note

/*
1、获取所有的note：/api/notes
2、创建一个note：/api/notes/add :　POST req:{note:"hello world",id} 
后台约定响应：res:{status:0,data;[]},{status:1,errorMessage:"未找到相关信息"}
3、编辑一个note: /api/notes/edit : POST req:{note:"now note",id:noteid}
4、删除一个note:/api/notes/delete : POST req:{id:noteid}　
* /


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: '我的express便利贴' });
// });

router.get('/notes', function (req, res, next) {
  console.log('初始化notes')
  var opts = {raw:true}
  if (req.session && req.session.user) {
    opts.where = {uid:req.session.user.id}
  }

  Note.findAll(opts).then(notes => {
    console.log(notes)
    res.send({ status: 0, data: notes })
  }).catch(() => {
    res.send({status:1,errorMsg:'数据库异常'})
  })
  
})

router.post('/notes/add', function (req, res, next) {
  if (!req.session || !req.session.user) {
    return res.send({ status: 1, errorMsg: '请先登陆' })
  }
  if (!req.body.note) {
    return res.send({status:2,errorMsg:'内容不能为空'})
  }
  var note = req.body.note
  var uid = req.session.user.id
  Note.create({ text: note,uid:uid}).then(notes => {
    res.send({ status: 0,data:notes})
  }).catch(() => {
    res.send({status:1,errorMsg:'数据库异常或者你没有权限'})
  })
  console.log('add.....')
})

router.post('/notes/edit', function (req, res, next) {
  if (!req.session || !req.session.user) {
    return res.send({status:1,errorMsg:'请先登陆'})
  }
  var note = req.body.note
  var id = req.body.id
  var uid = req.session.user.id
  Note.update({ text: note },{where:{id:id,uid:uid}}).then(notes => {
    if(notes[0] === 0){
      return res.send({ status: 1,errorMsg: '你没有权限'});
    }
    res.send({ status: 0, data: notes })
  }).catch(function(e){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
  console.log('edit....')
})

router.post('/notes/delete', function (req, res, next) {
  if (!req.session || !req.session.user) {
    return res.send({status:1,errorMsg:'请先登陆'})
  }
  var id = req.body.id
  var uid = req.session.user.id
  Note.destroy({ where: { id: id,uid:uid} }).then((notes) => {
    if(notes[0] === 0){
      return res.send({ status: 1, errorMsg: '你没有权限'});
    }
    res.send({status: 0})
  }).catch(function(e){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
})

module.exports = router;
