var express = require('express');
var router = express.Router();
var Note = require('../model/note').Note

/*
1、获取所有的note：/api/notes
2、创建一个note：/api/notes/add :　POST req:{note:"hello world",id} res:{status:0,data;[],status:1,errorMessage:"未找到相关信息"}
3、编辑一个note: /api/notes/edit : POST req:{note:"now note",id:noteid}
4、删除一个note:/api/notes/delete : POST req:{id:noteid}　
* /


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: '我的express便利贴' });
// });

router.get('/notes', function (req, res, next) {
  console.log('初始化notes')
  Note.findAll({raw: true}).then(notes => {
    console.log(notes)
    res.send({status:0,data:notes})
  })
})

router.post('/notes/add', function (req, res, next) {
  var note = req.body.note
  Note.create({ text: note }).then(notes => {
    res.send({ status: 0, data: notes })
  })
  console.log('add.....')
})

router.post('/notes/edit', function (req, res, next) {
  var note = req.body.note
  var id = req.body.id
  Note.update({ text: note },{where:{id:id}}).then(notes => {
    res.send({ status:0, data: notes })
  })
  console.log('edit....')
})

router.post('/notes/delete', function (req, res, next) {
  var id = req.body.id
  Note.destroy({ where: { id: id } }).then(() => {
    res.send({status:0})
  })
})

module.exports = router;
