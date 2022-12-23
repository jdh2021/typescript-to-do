import { v4 as uuidV4 } from 'uuid'

// console.log(uuidV4())

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")

// submit event take in e object
form?.addEventListener("submit", e => {
    e.preventDefault()
    //optional chaining by adding ?
    if(input?.value == "" || input?.value == null ) return
    // to-do object
    const task = {
        id: uuidV4(),
        title: input.value,
        completed: false, 
        createdAt: new Date()
    }
    input.value
})