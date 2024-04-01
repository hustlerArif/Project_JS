const addBtn = document.querySelector(".button");
const inputBtn = document.querySelector(".input");
const outputContainer = document.getElementById("demo");
let todo;
let localData = JSON.parse(localStorage.getItem("todo"));

let tempArr = localData || []; // todo_list

function uuid() {
  let number = Math.floor(Math.random() * 100 + 1);
  return number + "xyz";
}

addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  // console.log('clicked')
  todo = inputBtn.value;

  if (todo.length > 0) {
    tempArr.push({ id: uuid(), todo_item: todo, isCompleted: false });
  }
  // console.log(tempArr);
  renderTempArr(tempArr);
  localStorage.setItem("todo", JSON.stringify(tempArr));

  // for(i=0;i<tempArr.length;i++){ data not preserver
  //     outputContainer.innerText=tempArr[i].todo_item
  // }
  // use map to show one by one data

  inputBtn.value = "";
});

outputContainer.addEventListener("click", (event) => {
  // console.log('clicked')
  let key = event.target.dataset.key;
  let delTodokey = event.target.dataset.todokey;
  // console.log(delTodo)
  // console.log(key)
  // console.log(event.target)
  tempArr = tempArr.map((todo) =>
    todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );

  tempArr = tempArr.filter((todo) => todo.id !== delTodokey);
  localStorage.setItem("todo", JSON.stringify(tempArr)); // to delete/udpate from cookie/latest sync

  renderTempArr(tempArr); // to latest sync with the changes
  // console.log(tempArr);
});

function renderTempArr(tempArr) {
  outputContainer.innerHTML = tempArr.map(
    //   ({ todo_item }) =>
    //     ` <div>
    // <label>${todo_item} </label>
    // <button> Delete </button>
    //  </div>

    // `

    //   x =>
    //       ` <div>
    //       <input id='item-${x.id}' type='checkbox'>
    // <label for='item-${x.id}' class='todo'>${x.todo_item} </label>
    // <button> Delete </button>
    //  </div>`

    // // input id, laber for / connection btw checkbox and label/todo_item

    ({ id, todo_item, isCompleted }) =>
      ` <div>
        <input id='item-${id}' type='checkbox' data-key=${id} ${
        isCompleted ? "checked" : ""
      }>
  <label for='item-${id}' data-key=${id} class='todo todo-text t-pointer ${
        isCompleted ? "checked-todo" : ""
      }'>${todo_item} </label>
  <button data-todokey=${id}> Delete </button>
   </div>`
    // for strikethrough you can add css class in label with condition "${isCompleted?"checked-todo":""}"
    // with strikethrough add checkbox if not working-> in input tag : ${isCompleted ?'checked':""}
  );
}

renderTempArr(tempArr);
