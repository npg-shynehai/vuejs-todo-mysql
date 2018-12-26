// server/routes/index.js

const todosController = require('../controllers').todos;
// const Todo = require('../models').Todo;
// var express = require("express")
// const Task = require("../../model/Task.js")
// var router =  express.Router();
// module.exports = (router) => {
//   router.get('/api', (req, res) => res.status(200).send({
//     message: 'Welcome to the Todos API!',
//   }));
// //   router.get('/api/view', (req, res) => res.status(200).send({
// //     message: 'Vo Huu Hai!',
// //   }));

  
// router.get("/api/getAll",(req,res)=>{
//     Task.findAll()
//         .then(tasks => {
//         res.json(tasks)
//     })
//     .catch(err => {
//         res.send("error: " + err)
//     })
// });

// };

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
      message: 'Welcome to the Todos API!',
    }));
  
    app.post('/api/todos', todosController.create1);
  };