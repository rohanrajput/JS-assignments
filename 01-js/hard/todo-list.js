/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor () {
    this.todos = [];
  }

  add(todo) {
    this.todos.push(todo);
  }

  remove(indexOfTodo) {
    if (this.todos[indexOfTodo]) {
      this.todos.splice(indexOfTodo, 1);
    } 
    else {
      // console.log('No todo found at that index');
    }
  }

  update(index, updatedTodo) {
    if(index>this.todos.length-1) {
      return;
    }
    for(let i=0; i<this.todos.length; i++) {
      if(i===index) {
        this.todos[i] = updatedTodo;
      }
    }
  }

  getAll() {
    return this.todos;
  }

  get(indexOfTodo) {
    if(indexOfTodo > this.todos.length-1) {
      return null;
    }

    return this.todos[indexOfTodo];
  }

  clear() {
    this.todos=[];
  }
}

module.exports = Todo;
