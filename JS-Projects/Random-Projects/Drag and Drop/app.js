const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach(draggable=>{
    draggable.addEventListener('dragstart',()=>{
        draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend',()=>{
        draggable.classList.remove('dragging')
    });
})

containers.forEach(container=>{
    container.addEventListener('dragover',(e)=>{
        e.preventDefault();
        const afterElement = getAfterElement(container, e.clientX);
        const draggable = document.querySelector('.dragging');
        if(afterElement === null){
            container.appendChild(draggable);
        }else{
            container.insertBefore(draggable,afterElement);
        }
    })
})

function getAfterElement(container, x) {
    const draggables = [...container.querySelectorAll('.draggable:not(.dragging')];
    return draggables.reduce((closest,child)=>{
        const box = child.getBoundingClientRect()
        const offset = x- box.left-box.width/2;
        if(offset < 0 && offset > closest.offset){
            return {offset:offset, element:child}
        }else{
            return closest;
        }
    }
    ,{offset : Number.NEGATIVE_INFINITY}).element;
}

//FOR SIMPLE DRAG DROP STUFF
const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');

//EMPTY LISTENERS
for (const empty of empties){
    empty.addEventListener('dragover',dragOver);
    empty.addEventListener('dragenter',dragEnter);
    empty.addEventListener('dragleave',dragLeave);
    empty.addEventListener('drop',dragDrop);
}

//EMPTY FUNCTIONS
function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered'
}

function dragLeave() {
  this.className = 'empty';
}
function dragDrop() {
  this.className = 'empty';
  this.appendChild(fill);
}

//FILL LISTENERS
fill.addEventListener('dragstart',dragStart);
fill.addEventListener('dragend',dragEnd);

//FILL FUNCTIONS
function dragStart() {
  this.className += ' hold';
  setTimeout(()=>this.className='invisible',0)
}
function dragEnd() {
  this.className= 'fill';
}