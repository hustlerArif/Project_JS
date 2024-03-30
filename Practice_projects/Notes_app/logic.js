const addBtn = document.querySelector(".button");
const inputText = document.querySelector(".input");
const showOutput = document.getElementById("demo");

let todo;
let tempArr = [];
addBtn.addEventListener("click", () => {
  todo = inputText.value;

  if(todo.length>0){
    tempArr.push({ todo_item: todo });
  }
  
  // console.log(tempArr)

//   showOutput.innerText=tempArr[0].todo_item


  showOutput.innerHTML = tempArr.map(({ todo_item }) => 
    ` <div>
<label> ${todo_item}  </label>
        </div>
        `
  );
});
