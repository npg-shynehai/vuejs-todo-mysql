// server/routes/index.js

const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
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
    // Todo
    app.get('/api/todos/list', todosController.list);
    app.get('/api/todos/listTodos', todosController.listTodos);
    app.get('/api/todos/:todoId', todosController.retrieve);
    app.get('/api/todos', todosController.getAll);
    app.post('/api/todos', todosController.create);
    app.put('/api/todos/:todoId', todosController.update);
    app.delete('/api/todos/:todoId', todosController.destroy);
    app.delete('api/todos',todosController.delete); // not
    app.put('api/todos',todosController.update); // not
    
    //TodoItem
    app.get('/api/todos/items', todoItemsController.list);
    app.post('/api/todos/:todoId/items', todoItemsController.create);
    app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
    app.delete(
    '/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy
    );

    app.all('/api/todos/:todoId/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
    }));

    
  };