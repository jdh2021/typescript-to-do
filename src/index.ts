import { v4 as uuidV4 } from 'uuid'

type Task = {
    id: string
    title: string
    completed: boolean
    createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")
// save information in local storage
const tasks: Task[] = loadTasks()
// for each task, render to page by using function addListItem
tasks.forEach(addListItem)

// submit event takes in e object
form?.addEventListener("submit", e => {
    e.preventDefault()
    // optional chaining by adding ?
    if (input?.value == "" || input?.value == null) return
    // to-do object 
    const newTask: Task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    }
    tasks.push(newTask)
    // task saved in local storage whenever task is added
    saveTasks()
    addListItem(newTask)
    input.value = ""
})

// implicit any can be set to true or false, type of task should be specified
function addListItem(task: Task) {
    const item = document.createElement("li")
    const label = document.createElement("label")
    const checkbox = document.createElement("input")
    // on change of checkbox, task completed status is updated
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked
        console.log(tasks);
        // task saved whenever checkbox is toggled and completed status updated
        saveTasks()
    })
    checkbox.type = "checkbox"
    checkbox.checked= task.completed
    label.append(checkbox, task.title)
    item.append(label)
    // ? syntax automatically applied if list is null
    list?.append(item)   
}

// save tasks in local storage
function saveTasks() {
    // take local storage, set item "TASKS", stringify tasks
    localStorage.setItem("TASKS", JSON.stringify(tasks))
}

// get tasks out of local storage, explicitly define what is returned (array of tasks)
function loadTasks(): Task[] {
    // JSON.parse only accepts strings
    const taskJSON = localStorage.getItem("TASKS")
    if (taskJSON == null) return []
    // if not null, parse JSON
    return JSON.parse(taskJSON)
}