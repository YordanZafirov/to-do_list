// SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


class Factory {
    createEl(name) {
        return document.createElement(name)
    } // create deleteEl for trash
}

class ElementDecorator {
    decorate(el, content ) {
        return el.innerHTML =  content
    }
}

const factory = new Factory()
const decorator = new ElementDecorator()

// FUNCTIONS
function addTodo(e){
    e.preventDefault();
    // Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Add Todo to Local Storage
    saveLocalTodo(todoInput.value);
    // Check Mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // Trash button
    const trashdButton = document.createElement('button');
    trashdButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashdButton.classList.add('trash-btn');
    todoDiv.appendChild(trashdButton);
    // Append to List
    todoList.appendChild(todoDiv);
    // Clear todo input value after using it
    todoInput.value = '';
}

function deleteCheck(e){
    const item = e.target;
    //Delete Todo
    if(item.classList[0] === 'trash-btn'){
        let todo = item.parentElement
        //Animation
        todo.classList.add('fall')
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', ()=>{
            todo.remove();
        });
    }

    //Check mark
    if(item.classList[0] === 'complete-btn'){
        item.parentElement.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(todo =>{
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }    else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }    else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function saveLocalTodo(todo){
    // Check if i have things in local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    // Check if i have things in local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo=>{
        // Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Check Mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // Trash button
    const trashdButton = document.createElement('button');
    trashdButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashdButton.classList.add('trash-btn');
    todoDiv.appendChild(trashdButton);
    // Append to List
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    // Check if i have things in local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;    //deleting the chosen element from the array
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}