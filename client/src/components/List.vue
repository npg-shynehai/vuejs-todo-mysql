<template>
  <div class="hello">
    <div id="todo-list-example" class="container">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <h1 class="text-center">TODO LIST App</h1>
          <form v-on:submit.prevent="addNewTask">
            <label for="tasknameinput">Task Name</label>
            <input type="text" id="tasknameinput" v-model="taskname" class="form-control" placeholder="Add New Task">
            <button
              v-if="this.isEdit == false" type="submit"
              class="btn btn-success btn-block mt-3">Submit</button>
            <button v-else v-on:click="updateTask()" type="button"
              class="btn btn-primary btn-block mt-3">Update</button>
          </form>
          <table class="table">
            <tr v-for="(todo) in todos" v-bind:key="todo.id" v-bind:taskname="todo.task_name">
              <td class="text-left">{{todo.task_name}}</td>
              <td class="text-right">
                <button class="btn btn-info" v-on:click="editTask(todo.task_name, todo.id)">Edit</button>
                <button class="btn btn-danger" v-on:click="deleteTask(todo.id)">Delete</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
// console.error()
// import {error} from 'util'

export default {
  data () {
    return {
      todos: [],
      id: '',
      taskname: '',
      isEdit: false
    }
  },
  mounted () {
    this.getTasks()
  },
  methods: {
    getTasks () {
      axios.get('/api/task').then(
        result => {
          console.log(result.data)
          this.todos = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewTask () {
      axios.post('/api/task', {task_name: this.taskname})
        .then((res) => {
          this.taskname = ''
          this.getTasks()
        }).catch(err => {
          console.log(err)
        })
    },
    editTask (taskname, id) {
      this.id = id
      this.taskname = taskname
      this.isEdit = true
    },
    updateTask () {
      axios.put(`/api/task/${this.id}`, {task_name: this.taskname})
        .then((res) => {
          this.taskname = ''
          this.isEdit = false
          this.getTasks()
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteTask (id) {
      axios.delete(`/api/task/${id}`)
        .then((res) => {
          this.taskname = ''
          this.getTasks()
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
