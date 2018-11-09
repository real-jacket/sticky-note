var Sequelize = require('sequelize');
var path = require('path')

var sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',

    // SQLite only
    storage: path.join(__dirname,'../database/database.sqlite')
});

// // //测试连接
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });


//model数据模型

var Note = sequelize.define('note', {
    text: {
        type: Sequelize.STRING
    },
    uid: {
       type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
Note.sync()

module.exports.Note = Note



// const User = sequelize.define('user', {
//     firstName: {
//         type: Sequelize.STRING
//     },
//     lastName: {
//         type: Sequelize.STRING
//     }
// });

// // force: true will drop the table if it already exists
// User.sync().then(() => {
//     // Table created
//     return User.create({
//         firstName: 'John',
//         lastName: 'Hancock'
//     });
//     }).then(() => {
//         User.findAll({raw:true}).then(users => {
//             console.log(users)
//         })
// })


