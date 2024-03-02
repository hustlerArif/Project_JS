let todo_input = document.querySelector(".input");
let addBtn = document.querySelector(".button");
let showTodo = document.querySelector(".todo_container");
let todo;
let localData = JSON.parse(localStorage.getItem("todo"));  // whenvever code is loaded checking data is there in local storage or not
// whenever there is data , m setting to todoList to localData , OR if no data then setting to empty array using below method:
let todoList = localData || []; // truthy value | if anyone false gives other value

function uuid() {
  let number = Math.floor(Math.random() * 100 + 1);
  return number + "XYZ";
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault(); // stops refresing page due to form tag
  // console.log('clcked')
  todo = todo_input.value;

  if (todo.length > 0) {
    todoList.push({ id: uuid(), todo_item: todo, isCompleted: false });
  }
  //   document.querySelector('.todo_container').innerText=todoList.map(item=>item.todo_item)
  //   console.log(todoList);
  renderTodoList(todoList);

  // setting local storage
  localStorage.setItem("todo", JSON.stringify(todoList));

  todo_input.value = ""; // clears input console after adding
});

showTodo.addEventListener("click", (e) => {   // applying event delegation concept in showTodo / only 1 event listener 

  let key = e.target.dataset.key;    // event delegation using data- attribute
  // console.log(key);
  // console.log(e.target)

  let delTodokey = e.target.dataset.todokey; // selecting delete button id

  todoList = todoList.map((todo) =>
    todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo);  // internally remove object corresponding to that todo

  todoList = todoList.filter((todo) => todo.id !== delTodokey); // deleting selected id /whistlist

  localStorage.setItem("todo", JSON.stringify(todoList));
  renderTodoList(todoList); // again calling updated todolist for sync
  // console.log(todoList); // precuation - receive in todoList only otherwise logic of isCompleted true/false will be changed
});

function renderTodoList(todoList) {
  console.log(todoList);
  showTodo.innerHTML = todoList.map(
    ({ id, todo_item, isCompleted }) =>  // showing HTML 
      `<div>   
         <input id="${id}" type="checkbox" data-key=${id} ${isCompleted ? "checked" : ""} >
            <label data-key=${id} for="item-${id}" class='${isCompleted ? "checked-todo" : ""}'> ${todo_item} </label>
                 <button data-todokey=${id}>Delete</button>
        </div>  ` // destructring
  );

  // data-key => to target which one was clicked | event delegation
}

renderTodoList(todoList);
