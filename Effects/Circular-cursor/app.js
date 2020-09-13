let mouseCursor = document.querySelector('.cursor');
let navLinks =document.querySelectorAll('.nav-links li');
let frontCover = document.querySelector('.front-cover');

window.addEventListener('mousemove',cursor);

function cursor(e){
    // console.log(e);
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';
}


navLinks.forEach(link=>{
    link.addEventListener('mouseover',()=>{
      mouseCursor.classList.add('link-grow'); 
      link.classList.add('hovered-link'); 
    });
    link.addEventListener('mouseleave',()=>{
      mouseCursor.classList.remove('link-grow');
      link.classList.remove('hovered-link');  
    });

    //Can't use toggle as it would mean when you hover once over links, cursor class will toggle ON and stay like that until you hover over links again,turning class toggle OFF and thus,it stays OFF until you start this cycle all over again
});

frontCover.addEventListener('mouseover',()=>{
    mouseCursor.classList.add('link-only-grow');
}); 
frontCover.addEventListener('mouseleave',()=>{
    mouseCursor.classList.remove('link-only-grow');
}); 