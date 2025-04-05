 export default class Todos {
  constructor() {
    this.todos = [
      {
        title: "Learn JavaScript",
        category: "work",
      },
      {
        title: "Meditate",
        category: "personal",
      },
    ];
  }

  getAll(){
    return this.todos
  }

  getCount(){
    return this.todos.length
  }

  add(title, category){
    return this.todos.push({title, category})
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

 }