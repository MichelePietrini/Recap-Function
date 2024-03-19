
/**
 * Questo script gestisce la creazione e la gestione di una lista di attività da fare (todo list).
 * 
 * Il processo logico principale del codice include la creazione di un nuovo elemento di attività da fare,
 * l'aggiunta di tale elemento alla lista dei todo, la gestione degli eventi di click sull'elemento e sull'icona di cancellazione,
 * e la gestione dell'evento di submit del form per l'aggiunta di nuove attività.
 * 
 * La lista dei todo è rappresentata da un array chiamato 'todos', che contiene gli elementi di attività.
 * 
 * La funzione 'createTodoItem' crea un nuovo elemento di attività da fare, impostando le classi e il testo dell'attività.
 * Questa funzione restituisce l'elemento di attività creato.
 * 
 * La funzione 'addTodoItem' aggiunge un elemento alla lista dei todo.
 * Verifica se l'elemento è già presente nella lista e mostra un messaggio di avviso se lo è.
 * Utilizza la funzione 'createTodoItem' per creare un nuovo elemento di attività e lo aggiunge alla lista dei todo.
 * 
 * Gli eventi di click sull'elemento e sull'icona di cancellazione gestiscono la modifica dello stile del testo dell'attività,
 * aggiungendo o rimuovendo la classe 'text-decoration-line-through'.
 * 
 * L'evento di submit del form gestisce l'aggiunta di nuove attività alla lista dei todo.
 * Previene il comportamento predefinito del form, ottiene il testo dell'input, aggiunge l'elemento alla lista dei todo
 * utilizzando la funzione 'addTodoItem' e resetta il valore dell'input a vuoto.
 * 
 * L'evento di click sul bottone 'empty-all' rimuove tutti gli elementi dalla lista dei todo.
 */

/**
 * Array che contiene la lista dei todo.
 */
const todos = [];

/**
 * Crea un nuovo elemento di attività da fare.
 * 
 * @param {string} todoText - Il testo dell'attività da fare.
 * @returns {HTMLElement} - L'elemento di attività creato.
 */
function createTodoItem(todoText){
    const listItem = document.createElement('li'); // Crea un nuovo elemento <li>
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center todo-item'; // Imposta le classi dell'elemento <li>
    listItem.innerHTML = `
    <span class="flex-grow-1 todo-text">${todoText}</span> // Aggiunge un elemento <span> con il testo dell'attività
    <div>
        <i class="far fa-trash-alt delete ps-3"></i> // Aggiunge un'icona di cancellazione
    </div>
    `;
    listItem.addEventListener('click', function(event){ // Aggiunge un event listener per l'evento 'click' sull'elemento <li>
        event.stopPropagation(); // Ferma la propagazione dell'evento
        const todoTextElement = this.getElementsByClassName('todo-text')[0]; // Ottiene l'elemento <span> con la classe 'todo-text'
        if(todoTextElement.classList.contains('text-decoration-line-through')){ // Verifica se l'elemento ha la classe 'text-decoration-line-through'
            todoTextElement.classList.remove('text-decoration-line-through'); // Rimuove la classe 'text-decoration-line-through' dall'elemento
        } else {
            todoTextElement.classList.add('text-decoration-line-through'); // Aggiunge la classe 'text-decoration-line-through' all'elemento
        }
    })

    listItem.querySelector('.delete').addEventListener('click', function(event){ // Aggiunge un event listener per l'evento 'click' sull'elemento con classe 'delete'
        event.stopPropagation(); // Ferma la propagazione dell'evento
        this.closest('.todo-item').remove(); // Rimuove l'elemento <li> padre dell'elemento con classe 'delete'
    })

    return listItem; // Restituisce l'elemento di attività creato
}

/**
 * Aggiunge un elemento alla lista dei todo.
 * @param {string} todoText - Il testo del todo da aggiungere.
 */
function addTodoItem(todoText){

    if(todos.includes(todoText)){ // Verifica se l'elemento è già presente nella lista dei todo
        alert('Elemento già presente nella lista'); // Mostra un messaggio di avviso se l'elemento è già presente
        return; // Termina l'esecuzione della funzione
    }
    
    const todoList = document.getElementById('todo-list'); // Ottiene l'elemento con id 'todo-list'
    const newTodoItem = createTodoItem(todoText); // Crea un nuovo elemento di attività utilizzando la funzione createTodoItem
    todoList.appendChild(newTodoItem); // Aggiunge il nuovo elemento alla lista dei todo
    todos.push(todoText); // Aggiunge il nuovo elemento alla lista dei todo
}

// Aggiunge un event listener al form con id 'todo-form' che ascolta l'evento 'submit'
document.getElementById('todo-form').addEventListener('submit', function(event){
    event.preventDefault(); // Previeni il comportamento predefinito del form

    const todoInput = document.getElementById('todo-input'); // Ottieni l'elemento input con id 'todo-input'

    const todoText = todoInput.value.trim(); // Ottieni il testo dell'input e rimuovi gli spazi bianchi iniziali e finali

    if(todoText !== ''){ // Se il testo non è vuoto
        addTodoItem(todoText); // Aggiungi un nuovo elemento alla lista dei todo utilizzando la funzione addTodoItem
        todoInput.value = ''; // Resetta il valore dell'input a vuoto
    }
})

// Aggiunge un event listener al bottone con id 'empty-all' che ascolta l'evento 'click'
document.getElementById('empty-all').addEventListener('click', function(){
    const toDoItems = document.querySelectorAll('.todo-item'); // Seleziona tutti gli elementi con classe 'todo-item'

    for(let i = 0; i < toDoItems.length; i++){ // Itera su tutti gli elementi
        const item = toDoItems[i]; // Ottieni l'elemento corrente
        item.remove(); // Rimuovi l'elemento dalla lista
    }
})