//DEFINE VARIABLES

const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo');
const todoButton = document.querySelector('.todo-button');
const filterOption = document.querySelector('.filter-todo');
const numberTodo = document.querySelector('.todo-list').children;
console.log(numberTodo)


//ADD EVENT LISTENERS
document.addEventListener('DOMContentLoaded',getTodosRecord);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);
// document.addEventListener('DOMContentLoaded'.getTodos);

//DEFINE FUNCTIONS

function addTodo(event){
    //To prevent page from refreshing on btn click
    event.preventDefault();
    //Add div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todoDiv');
    //Add li
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerText=todoInput.value;
    // console.log(todoInput.value);
    //Save input value to Local Storage
    saveLocalTodos(todoInput.value);
    //Create check button
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('checkBtn');
    checkBtn.innerHTML=`<i class="fas fa-check-square"></i>`;
    //Create trash button
    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trashBtn');
    trashBtn.innerHTML=`<i class="fas fa-trash-alt"></i>`;
    //All appendages
    todoDiv.appendChild(todoItem);
    todoDiv.appendChild(checkBtn);
    todoDiv.appendChild(trashBtn);
    todoList.appendChild(todoDiv);
    //To refresh input space after each todo addition
    todoInput.value="";
}

function deleteCheck(e){
    const item = e.target;
    // console.log(e.target);

    //For Delete : Trash Button
    if(item.classList[0]==="trashBtn"){
        const abcd = item.parentElement;
        //Added disappearing animation
        abcd.classList.add('fall');
        //Removed item from Local Storage
        deleteTodoFrmRecord(abcd);
        abcd.addEventListener('transitionend',function(){
            abcd.remove();
        });        
    }
    //For Checked : Check Button
    if(item.classList[0]==="checkBtn"){
        const abcd = item.parentElement;
        abcd.classList.toggle('checked');
    }

}

function filterTodo(e){
        //EXECUTE ALL cosole.log() to UNDERSTAND CODE

        // console.log(e.target);

    const todos = todoList.childNodes;
    
    todos.forEach(function(todoSomeShit){
            
        // console.log(todoSomeShit);
        // console.log(e.target.value);
        // console.log("---------------------------------------------");


        switch(e.target.value)
        
            {
            case 'all':
                {
                todoSomeShit.style.display="flex";
                break;
                }
            case 'completed':
                {
                    if(todoSomeShit.classList.contains('checked')){
                    todoSomeShit.style.display="flex";
                    }
                    else{
                    todoSomeShit.style.display="none";
                    }
                break;
                }
            case 'uncompleted':
                {
                    if(!todoSomeShit.classList.contains('checked')){
                    todoSomeShit.style.display="flex";
                    }
                    else{
                    todoSomeShit.style.display="none";
                    }
                break;
                }
        }
    });
}


function saveLocalTodos(recordItem){
    //TO CHECK AND DEAL WITH PRE-EXISITNG ITEMS IN STORAGE
    let todosRecord;    
    if (localStorage.getItem("todoKeyName")===null)
        {
            todosRecord = [];
        }
    else{
        todosRecord = JSON.parse(localStorage.getItem('todoKeyName')); 
    }
    todosRecord.push(recordItem);
    localStorage.setItem("todoKeyName",JSON.stringify(todosRecord));
}

//To get back any values saved last time in our todo list. Cuz it's a list, everytime you open it, you don't wanna start writing even the previous remaining todos from scratch. You wanna already have them and just include new ones this time
function getTodosRecord(){
    let todosRecord;
    if (localStorage.getItem("todoKeyName")===null)
        {
            todosRecord = [];
        }
    else{
        todosRecord = JSON.parse(localStorage.getItem('todoKeyName')); 
    }
    //AER = Array Element Accessor
    //Basically, for loop runs for each element in array "todosRecord". Say the element AER looks at in loop 3 is "apple". This code will create entire todo blocks for apple with styling and all.
    todosRecord.forEach(function(AER){
        //Add div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todoDiv');
        //Add li
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.innerText=AER;
        // console.log(AER);
        //Create check button
        const checkBtn = document.createElement('button');
        checkBtn.classList.add('checkBtn');
        checkBtn.innerHTML=`<i class="fas fa-check-square"></i>`;
        //Create trash button
        const trashBtn = document.createElement('button');
        trashBtn.classList.add('trashBtn');
        trashBtn.innerHTML=`<i class="fas fa-trash-alt"></i>`;
        //All appendages
        todoDiv.appendChild(todoItem);
        todoDiv.appendChild(checkBtn);
        todoDiv.appendChild(trashBtn);
        todoList.appendChild(todoDiv);
    });
}

function deleteTodoFrmRecord(divContainTextToBeDeleted){
    //TO CHECK AND DEAL WITH PRE-EXISITNG ITEMS IN STORAGE
    let todosRecord;
    if (localStorage.getItem("todoKeyName")===null)
        {
            todosRecord = [];
        }
    else{
        todosRecord = JSON.parse(localStorage.getItem('todoKeyName')); 
    }
    // console.log(divContainTextToBeDeleted);
    // console.log(divContainTextToBeDeleted.children);
    // console.log(divContainTextToBeDeleted.children[0]);
    // console.log(divContainTextToBeDeleted.children[0]).innerText;
    let todoIndex = divContainTextToBeDeleted.children[0].innerText;
    //For removing said string from Node List
    // console.log(todosRecord);
    // console.log(todosRecord.indexOf(todoIndex));
    todosRecord.splice(todosRecord.indexOf(todoIndex), 1);
    // Refreshing Node List
    localStorage.setItem("todoKeyName",JSON.stringify(todosRecord));
    // console.log(todosRecord);
    // console.log('---------------------');
}
