// server/controllers/todos.js
const Todo = require('../models').Todo;

module.exports = {
  create(req, res) {
    return Todo
      .create({
        title: req.body.title,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
  create1(req,res){
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
}
};