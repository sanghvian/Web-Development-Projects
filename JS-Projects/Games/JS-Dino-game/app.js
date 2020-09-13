const char = document.querySelector('#character');
const block = document.querySelector('#block');
const scoreSpan = document.querySelector('#scoreSpan');
let score =0;

function jump(e){
    
    if(char.classList!=='animate'){
        if(e.keyCode===32){
            char.classList.add("animate");
        }
    }
    setTimeout(function(){
        char.classList.remove('animate');
    },500);
}

document.addEventListener('keydown',(e)=>{
    jump(e);
});

let checkDead = setInterval(function(){
    let charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<20 && blockLeft>0 && charTop>=130){
        alert('You lose ! Score :'+Math.floor(score/100));
        score=0;
        block.style.animation ="none";
        block.style.display ="none";
    }
    else{
        score++;
        scoreSpan.innerText = Math.floor(score/100);
    }    
},10);
