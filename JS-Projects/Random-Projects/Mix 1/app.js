const gradients = [
    'linear-gradient(-225deg,#f7797d,#FBD786,#C6FFDD)',
    'linear-gradient(-225deg,#1f4037,#99f2c8)',
    'linear-gradient(-225deg,#f12711,#f5af19)',
    'linear-gradient(-225deg,#2193b0,#6dd5ed)'
]
const bubble = document.querySelector('.bubble');
const sections = document.querySelectorAll('section');

const options = {
    threshold:0.7
}

function navCheck(entries) {
  entries.forEach(entry=>{
      const className = entry.target.className;
      const activeAnchor = document.querySelector(`[data-active=${className}]`);
    //   console.log(activeAnchor);
      const gradientIndex = entry.target.getAttribute('data-index');
      const rect = activeAnchor.getBoundingClientRect();
      const dirns={
          top:rect.top,
          left:rect.left,
          height:rect.height,
          width:rect.width
      }
      if(entry.isIntersecting){
        bubble.style.setProperty('left',`${dirns.left}px`);
        bubble.style.setProperty('top',`${dirns.top}px`);
        bubble.style.setProperty('height',`${dirns.height}px`);
        bubble.style.setProperty('width',`${dirns.width}px`);
        bubble.style.background = gradients[gradientIndex];
      }
      if(entry.isIntersecting && gradientIndex==2){
          animateNos();
      }
  })
}

let observer = new IntersectionObserver(navCheck, options);

sections.forEach(section=>{
    observer.observe(section);
});


///DRAG DROP FUNCTION
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

//Empty listeners
for (const empty of empties){
    empty.addEventListener('dragover',dragOver);
    empty.addEventListener('dragenter',dragEnter);
    empty.addEventListener('dragleave',dragLeave);
    empty.addEventListener('drop',dragDrop);
}

//Empty functions
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

//Fill listeners
fill.addEventListener('dragstart',dragStart);
fill.addEventListener('dragend',dragEnd);

//Fill functions
function dragStart() {
  this.className += ' hold';
  setTimeout(()=>this.className='invisible',0)
}
function dragEnd() {
  this.className= 'fill';
}

//THE INFINITE BLOG
const postCont = document.querySelector('.posts-container');
const filter = document.querySelector('.filter-inp');
const limit = 5;
let page =1;
const loading = document.querySelector('.loader');

async function getPosts() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
  const data = await response.json();

  return data;
}

function showLoading() {
    loading.classList.add('show');

    setTimeout(()=>{
        loading.classList.remove('show');
        setTimeout(()=>{
            page++;
            showPosts();
        },300)
    },1000)
}

async function showPosts(){
    const posts = await getPosts();

    // console.log(posts);
    posts.forEach(post=>{
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="post-number">${post.id}</div>
        <div class="post-info">
            <div class="post-title">${post.title}</div>
            <div class="post-body">${post.body}</div>
        </div>
        `
        postCont.appendChild(postEl);
    })
}

function filterInput(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post=>{
      const title = document.querySelector('.post-title').innerText.toUpperCase();
      const body = document.querySelector('.post-body').innerText.toUpperCase();

      if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
          post.style.display = 'flex';
      }else{
          post.style.display = 'none';
      }
  });
}

showPosts();

window.addEventListener('scroll',()=>{
    const dom = document.documentElement;
    const heightFromBodyTop = dom.scrollHeight;
    const sectionTopFromBodyTop = dom.scrollTop;
    const sectionHeight = dom.clientHeight;
    // console.log(dom.clientHeight,dom.scrollHeight,dom.scrollTop);
    if(sectionHeight + sectionTopFromBodyTop + 1 > heightFromBodyTop){
        showLoading();
    }
});

filter.addEventListener('input',filterInput);

///FOR ANIMATED COUNTER EFFECT
const counters = document.querySelectorAll('.counter');
const speed = 250;
const animSection = document.querySelector('.anim');
const counterBox = document.querySelector('.counter-box');
console.log(animSection);

function animateNos() {
    console.log('triggered boi');
    counters.forEach(counter=>{
        const updateCount=()=>{
            const count = +counter.innerText;
            const target = +counter.getAttribute('data-target');
    
            const inc = target/speed;
    
            if(count<target){
                counter.innerText = Math.ceil(count+inc);
                setTimeout(updateCount,1);
            }else{
                counter.innerText = target;
            }
        }
        updateCount();
    });  
}