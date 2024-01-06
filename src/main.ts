import './style.css'

const todoContainer = document.querySelector(".todoContainer") as HTMLDivElement
const todoInput = document.getElementById("title") as HTMLInputElement
const myForm = document.getElementById("myForm") as HTMLFormElement
let generateId = 1

interface Todo{
  readonly id:number
  title:string,
  isComplete:boolean
}

const todoArray:Todo[] = []

const renderTodo = (todoArray:Todo[]) => {
  todoContainer.innerText = ""

  todoArray.forEach(item => {

    const todo = document.createElement("div") as HTMLDivElement
    todo.className = "todo";
    
    // creating checkbox
    const checkBox = document.createElement("input") as HTMLInputElement
    checkBox.setAttribute("type", "checkbox")
    checkBox.className="isCompleted"
    checkBox.checked = item.isComplete
    checkBox.onchange = () => {
      todoArray.find(it => {
        if(it.id === item.id) it.isComplete = checkBox.checked
      })
      paragraph.className = checkBox.checked ? "textCut" : ""
    }

    // creating paragraph tag
    const paragraph = document.createElement("p") as HTMLParagraphElement
    paragraph.innerText = item.title
    paragraph.className = checkBox.checked ? "textCut" : ""

    // creating delete button
    const btn = document.createElement("button") as HTMLButtonElement
    btn.innerText = "X"
    btn.className = "button"
    btn.onclick = () => {
      const index = todoArray.findIndex(todo => todo.id === item.id)
      todoArray.splice(index,1)
      renderTodo(todoArray)
    }

    // appending all to todo item
    todo.append(checkBox,paragraph,btn)
    todoContainer.append(todo)

  })
}

myForm.onsubmit = (e:SubmitEvent) => {
  e.preventDefault()
  const todo:Todo = {
    id: generateId++,
    title: todoInput.value,
    isComplete:false,
  }

  todoArray.push(todo);
  todoInput.value = "";
  renderTodo(todoArray)

}