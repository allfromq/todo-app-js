 export default class Todos {
  constructor() {
    const savedTodos = JSON.parse(localStorage.getItem("todos")); 
    this.todos = savedTodos || []
  }

  save(){
    localStorage.setItem("todos", JSON.stringify(this.todos))
  }

  getAll(){
    return this.todos
  }

  getCount(){
    return this.todos.length
  }

  add(title, category){
     this.todos.push({title, category})
     this.save()
  }

  getWork(){
    return this.todos.filter(todo => todo.category === "work")
  }

  getWorkCount(){
    return this.todos.filter(todo => todo.category === "work").length
  }

  getPersonal(){
    return this.todos.filter(todo => todo.category === "personal")
  }

  getPersonalCount(){
    return this.todos.filter(todo => todo.category === "personal").length
  }

  delete(index){
    this.todos.splice(index, 1)
    this.save()
  }

  update(index,title, category){
    this.todos[index] = {title, category}
    this.save()
  }

 }