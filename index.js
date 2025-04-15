import Todos from "./todos.js";

const form = document.querySelector("#todo-form");
const title = document.querySelector("#todo-title");
const category = document.querySelector("#todo-category");
const list = document.querySelector("#todo-list");
const filter = document.querySelector("#todo-filter");
const count = document.querySelector("#todo-count");
const editBox = document.querySelector("#edit-box")
const editTitle = document.querySelector("#edit-title")
const editCategory = document.querySelector("#edit-category")
const saveEdit = document.querySelector("#save-edit")

let editIndex = null 

const render = (items, itemsCount) => {
  count.textContent = `(${itemsCount})`;
  list.innerHTML = items
    .map(
      (todo, index) =>
        `<li class="todo-item ${index % 2 === 0 ? "even" : "odd"}">${todo.title} [${todo.category}] <div class="btn-group">
          <button class=" btn edit-btn" data-index="${index}">✏️</button> 
          <button class="btn delete-btn" data-index="${index}">❌</button></li>
          </div>`
    )
    .join("");


//delete logic 
    document.querySelectorAll(".delete-btn").forEach((btn)=>{
      btn.addEventListener("click", () => {
        todos.delete(btn.dataset.index);
        render(todos.getAll(), todos.getCount());
      })
    })


// edit botton logic
    document.querySelectorAll(".edit-btn").forEach((btn)=>{
      btn.addEventListener("click", ()=>{
        const index = btn.dataset.index
        const todo = todos.getAll()[index]
      
      editTitle.value = todo.title;
      editCategory.value = todo.category;
      editIndex = index;

      editBox.style.display = "block"
      })
    })
};


const todos = new Todos();

try {
  render(todos.getAll(), todos.getCount());
} catch (error) {
  console.error(error);
}


//form

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  if(editIndex !== null) return;
  
  try {
    todos.add(title.value.trim(), category.value.trim());
    render(todos.getAll(), todos.getCount());
    todos.save()
  } catch (error) {
    console.error(error);
  }
  title.value = "";
  category.value = "";
});

//filter

filter.addEventListener("change", () => {
  try {
    if (filter.value === "work") {
      //filter work
      render(todos.getWork(), todos.getWorkCount());
    } else if (filter.value === "personal") {
      //filter personal
      render(todos.getPersonal(), todos.getPersonalCount());
    } else {
      //show all
      render(todos.getAll(), todos.getCount());
    }
  } catch (error) {
    console.error(error)
  }
});

//save edit logic
saveEdit.addEventListener("click", (e) => {
  e.preventDefault()
  if (editIndex !== null){
    const updatedTitle = editTitle.value.trim();
    const updatedCategory = editCategory.value.trim();

    if (updatedTitle && updatedCategory){
      todos.update(editIndex, updatedTitle, updatedCategory);
      render(todos.getAll(), todos.getCount());
    }

    editBox.style.display = "none"
    editIndex = null;
    editTitle.value = "";
    editCategory.value = "";
  }
});
