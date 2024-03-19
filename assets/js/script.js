const todos = [];

function createTodoItem(todoText){
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center todo-item';
    listItem.innerHTML = `
    <span class="flex-grow-1 todo-text">${todoText}</span>
    <div>
        <i class="far fa-trash-alt delete ps-3"></i>
    </div>
    `;
    listItem.addEventListener('click', function(event){
        event.stopPropagation();
        // console.log(event);
        const todoTextElement = this.getElementsByClassName('todo-text')[0];
        if(todoTextElement.classList.contains('text-decoration-line-through')){
            console.log("remove item");
            todoTextElement.classList.remove('text-decoration-line-through');
        } else {
            console.log("add item");

            todoTextElement.classList.add('text-decoration-line-through');
        }
    })

    listItem.querySelector('.delete').addEventListener('click', function(event){
        event.stopPropagation();
        this.closest('.todo-item').remove();
    })

    return listItem;
}

function addTodoItem(todoText){
    console.log("List: ", todos);
    console.log("new item: ", todoText);

    if(todos.includes(todoText)){
        alert('Elemento già presente nella lista');
        return;
    }
    const todoList = document.getElementById('todo-list');
    const newTodoItem = createTodoItem(todoText);
    todoList.appendChild(newTodoItem);
    todos.push(todoText);
}

document.getElementById('todo-form').addEventListener('submit', function(event){
    event.preventDefault();
    const todoInput = document.getElementById('todo-input');

    const todoText = todoInput.value.trim();
    if(todoText !== ''){
        addTodoItem(todoText);
        todoInput.value = '';
    }
})

document.getElementById('empty-all').addEventListener('click', function(){
    const toDoItems = document.querySelectorAll('.todo-item');
    for(let i = 0; i < toDoItems.length; i++){
        const item = toDoItems[i];
        item.remove();
    }
})