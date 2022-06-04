let todos = []
let temptodos= []

const ulElm = document.querySelector("ul");
const clearButtonToggle = document.querySelector(".clear-btn");
const filters = document.querySelectorAll(".filters span")
const emptystate = document.querySelector(".empty-state")

const displayTodo = () => {
    console.log(todos)
    ulElm.innerHTML = ''

    todos.forEach( todo =>{
        ulElm.innerHTML = `${ulElm.innerHTML} 
        <li>
            <span style="${todo.isDone? 'text-decoration: line-through': '' }";>${todo.title}</span>
            <div>
                ${
                    todo.isDone? `<button onClick='deleteTodo(${todo.id})' id="delete">Delete</button>` : ''
                }
                <button onClick='editTodo(${todo.id})' id="edit">Edit</button>
                ${
                    todo.isDone?
                    `<button onClick='toggleMarkDone(${todo.id})' class="unmark-done">Unmark Done</button>`:
                    `<button onClick='toggleMarkDone(${todo.id})'>Mark Done</button>`
                }
            </div>
        </li>`
    })

    if (!todos.length){
        clearButtonToggle.classList.remove("active")
        emptystate.style.setProperty('display','flex')
    }
    else{
        clearButtonToggle.classList.add("active")
        emptystate.style.setProperty('display','none')
    }
}

const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", () =>{

    const input = document.querySelector("input")
    let confirmClear = confirm("Are you sure to clear all the tasks?");
    if (confirmClear && todos.length != 0) { 
        todos.splice(0, todos.length)
        temptodos.splice(0,temptodos.length)
        input.value = ""
        displayTodo()
        alert("Task cleared")
        document.querySelector("span.active").classList.remove("active");
        document.getElementById("all").classList.add("active")
    }
    else if (todos.length == 0){
        alert("Add tasks first!")
    }
    else {
        return
    }
})

const addTodoBtn = document.querySelector(".add-todo-btn");
addTodoBtn.addEventListener("click", () => {

    const input = document.querySelector("input")

    if(input.value === ""){
        alert("Please Enter Again!")
        return
    }
    
    if(temptodos.length){
        temptodos.push({
            id: temptodos[temptodos.length-1].id + 1,
            title: input.value,
            isDone: false
        })
    }else{
        temptodos.push({
            id: 1,
            title: input.value,
            isDone: false
        })
    }
    todos = temptodos
    input.value = ''
    document.querySelector("span.active").classList.remove("active");
    document.getElementById("all").classList.add("active")
    displayTodo()    
})


const toggleMarkDone = (targetId) => {
    console.log("ID: ", targetId)

    const updatedTodos = todos.map(todo => {
        if(targetId === todo.id){
            todo.isDone = !todo.isDone;
        }
        return todo
    })

    todos = updatedTodos
    console.log("updated todo", updatedTodos)
    btnActive = document.querySelector("span.active")
    filterfunction(btnActive.id)
    displayTodo()
}
const editTodo =(targetId) =>{
    //const input = document.querySelector("input")
    const editTodos = todos.map(todo => {
        if (targetId === todo.id){
            newInputValue = prompt("Enter a new name for the task")
            if (newInputValue == null||newInputValue==""){
                alert("Please enter a task in the prompt!")
                return
            }
            todo.title = newInputValue
            temptodos.title = newInputValue
        }
        return todo
    })
    //input.value = ""
    console.log("edited todo", editTodos)
    displayTodo()
}


const deleteTodo = (targetId) => {
    const updatedTodos = todos.filter(todo => {
        return targetId !== todo.id
    })

    const updatedtempTodos = temptodos.filter(todo => {
        return targetId !== todo.id
    })

    todos = updatedTodos
    temptodos = updatedtempTodos
    displayTodo()
}

filters.forEach(btn => {
    if (btn.className !== 'border'){
    btn.addEventListener("click", () => {
        {
            document.querySelector("span.active").classList.remove("active");
            btn.classList.add("active");
            filterfunction(btn.id);
        }
    });
    }
});

const filterfunction = (e) =>{
    if (e == "pending"){
        todos = temptodos
            const filteredTodos = temptodos.filter(todo => {
                return !todo.isDone
            })
            todos = filteredTodos
            displayTodo()
    }
    if (e== "completed"){
        const filteredTodos = temptodos.filter(todo => {
            return todo.isDone
        })
        todos = filteredTodos
        displayTodo()
    }
    if(e == "all"){
        todos = temptodos
            displayTodo()
    }
}





displayTodo()


