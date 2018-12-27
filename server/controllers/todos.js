// server/controllers/todos.js
const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

const TodoService = require('../service').todoService;


module.exports = {
//   create(req, res) {
//     return Todo
//       .create({
//         title: req.body.title,
//       })
//       .then(todo => res.status(201).send(todo))
//       .catch(error => res.status(400).send(error));
//   },

getAll: function(req,res){
   TodoService.getAllList(req,res)       
},
  create(req,res){
    if (!req.body.title){
        res.status(404)
        res.json({
             error : "Bad data"
        })
    }
    else{
      console.log(req.body.title);
        Todo.create(req.body)
        .then(() => {
            res.send("Task Added")
        })
        .catch(err => {
            res.send("Error : "+ err)
        })
    }
},
// get All list

list(req, res) {
    return Todo
      .all()
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },
// list theo todoitem trong todo
listTodos(req, res) {
    return Todo
      .findAll({
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },
// delete task
delete(req,res){
    Todo.destroy({
        where:{
            id: req.params.id
        }
    }) 
    .then(()=> {
        res.send("Task Deleted! ")
    })
    .catch(err =>{
        res.send("error: "+err )
    })
},

// Update task
update(req,res){
    if (!req.body.task_name ){
        res.status(400)
        res.json({
            error: "Bad data"
        })
    }
    else{
        Task.update(
            {task_name: req.body.task_name},
            {where: {id : req.params.id}}
        )
        .then(() =>{
            res.send("Task Update!")
        }) 
        .error(err => res.send(err))
    }
},
// get one todo single
retrieve(req, res) {
    return Todo
      .findById(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return res.status(200).send(todo);
      })
      .catch(error => res.status(400).send(error));
  },
// update todo
update(req, res) {
    return Todo
      .findById(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .update({
            title: req.body.title || todo.title,
          })
          .then(() => res.status(200).send(todo))  // Send back the updated todo.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  // delete todo
  destroy(req, res) {
    return Todo
      .findById(req.params.todoId)
      .then(todo => {
        if (!todo) {
          return res.status(400).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};