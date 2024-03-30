const addBtn = document.querySelector(".button");
const inputBtn = document.querySelector(".input");
const outputContainer = document.getElementById("demo");
let todo;
let localData=JSON.parse(localStorage.getItem('todo'))

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
  console.log(tempArr);

  localStorage.setItem('todo',JSON.stringify(tempArr))

  // for(i=0;i<tempArr.length;i++){ data not preserver
  //     outputContainer.innerText=tempArr[i].todo_item
  // }
  // use map to show one by one data
  outputContainer.innerHTML = tempArr.map(
    ({ todo_item }) =>
      ` <div>
  <label>${todo_item} </label>
  <button> Delete </button>
   </div>
  
  `
  );

  inputBtn.value = "";
});
// console.log(tempArr)
