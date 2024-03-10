 let textInput =document.querySelector('.input')
   let addBtn = document.querySelector('.btn')
 let divContainer=document.querySelector('.container')

 let arr1=[]

   addBtn.addEventListener('click',(event)=>{
    event.preventDefault()
    // console.log('hi')
    // console.log(textInput.value)
 
    let value=textInput.value
// divContainer.innerHTML=value

//push into array

if(value.length>0){
  arr1.push({todo_item:value,isCompleted:false})
}
// arr1.push(value)
console.log(arr1)

// divContainer.innerHTML=arr1
 
const x= arr1.map((e)=>{
  return e
})

console.log(x)
   })