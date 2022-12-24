import { v4 as uuidV4 } from 'uuid'

type Task = {
    id: string
    title: string
    completed: boolean
    createdAt: Date
}

// console.log(uuidV4())

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")

// submit event takes in e object
form?.addEventListener("submit", e => {
    e.preventDefault()
    //optional chaining by adding ?
    if (input?.value == "" || input?.value == null) return
    // to-do object 
    const newTask: Task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    }
    addListItem(newTask)
    input.value = ""
})


// implicit any can be set to true or false, type of task should be specified
function addListItem(task: Task) {
    const item = document.createElement("li")
    const label = document.createElement("label")
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked= task.completed
    label.append(checkbox, task.title)
    item.append(label)
    // ? syntax automatically applied if list is null
    list?.append(item)
    
}
