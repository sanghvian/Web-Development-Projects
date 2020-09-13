const video = document.querySelector('video');
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const stop = document.querySelector('.stop');
const timestamp = document.querySelector('.timestamp');
const progress = document.querySelector('#progress');

//FUNCTIONS

function toggleVideoStatus(){
    if(video.paused){
        video.play()
    }else{
        video.pause();
    }
}

function updatePlayIcon(){
    if(video.paused){
        play.innerHTML = `<i class="fa fa-play fa-2x pause" id='pause' aria-hidden="true"></i>`;
    }else{
        play.innerHTML = `<i class="fa fa-pause fa-2x" aria-hidden="true"></i>`;
    }
}

function stopVideo(){
    video.currentTime = 0;
    video.pause();
}

function updateProgress(){
    // console.log(video.currentTime);
    // console.log(video.duration);
    progress.value = ((+video.currentTime)/(+video.duration))*100;

    //Get the time at which video is
    let mins = Math.floor(video.currentTime/60);
    if(mins<10){
        mins = '0'+String(mins);
    }
    let secs = Math.floor(video.currentTime%60);
    if(secs<10){
        secs = '0'+String(secs);
    }
    timestamp.innerText = `${mins}:${secs}`;
}

function setTimeProgress(){
    video.currentTime = ((+progress.value)*(+video.duration))/100;
}



//EVENT LISTENERS

video.addEventListener('click',toggleVideoStatus);
video.addEventListener('pause',updatePlayIcon);
video.addEventListener('play',updatePlayIcon);
play.addEventListener('click',toggleVideoStatus);
stop.addEventListener('click',stopVideo);
video.addEventListener('timeupdate',updateProgress);
progress.addEventListener('change',setTimeProgress);


class TypeWriter {
    constructor(txtElement, words, wait=500){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait,10);
    this.type();
    this.isDeleting = false;
    }
    type(){
        //Current index of word
        const current = this.wordIndex % this.words.length;
        //Get full text of current word
        const fullTxt = this.words[current];
        
        //Check if deleting
        if(this.isDeleting){
            //Remove char
            this.txt = fullTxt.substring(0,this.txt.length-1);
        }else{
            //Add char
            this.txt = fullTxt.substring(0,this.txt.length+1);
        }
        
        //Insert txt into element
        this.txtElement.innerHTML =`<span class='txt'>${this.txt}</span>`;
        
        //Initial Type Speed
        let typeSpeed = 50;
        if(this.isDeleting){
            typeSpeed/=2;
        }

        //If word is complete
        if(!this.isDeleting && this.txt === fullTxt){
            //Make a pause at the end
            typeSpeed=this.wait;
            this.isDeleting=true;
        }else if(this.isDeleting&&this.txt===''){
            this.isDeleting=false;
            //Move to next word
            this.wordIndex++;
            //Pause before start typing
            typeSpeed = 200;
        }

        setTimeout(()=>this.type(),typeSpeed);
    }

}

//Init on DOM load
document.addEventListener('DOMContentLoaded',init);

//Init App
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    //Init TypeWriter
    new TypeWriter(txtElement,words,wait);
}

const appleHello = document.querySelectorAll('#apple-hello path');
const appleStroke = document.querySelector('#apple-stroke path');
// console.log(appleStroke.getTotalLength());


for(let i=0 ;i<appleHello.length;i++){
    // console.log(`Letter ${i} is ${appleHello[i].getTotalLength()}`)
    // let len = appleHello[i].getTotalLength();
    // appleHello[i].style.strokeDashArray= len;
    // appleHello[i].style.strokeDashOffset= len;
    // let product = +i*0.3
    // appleHello[i].style.animation = `line-anim 1s ease forwards ${product}s`
    // console.log(appleHello[i]);
    // console.log(`Letter ${i} has dash array as ${appleHello[i].style.strokeDashArray} and offset as ${appleHello[i].style.strokeDashOffset}` );

}

//FOR Mouse Cursor Effect

const mouseCursor = document.querySelector('.cursor')

window.addEventListener('mousemove',(e)=>{
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';
});

document.addEventListener('click',()=>{
    mouseCursor.classList.add('expand');

    setTimeout(()=>{
        mouseCursor.classList.remove('expand');
    },500);
});

//FOR preloader

const preloader = document.querySelector('.preloader');

setTimeout(()=>{
    preloader.style.opacity='0';
    preloader.style.zIndex='-3';
    // preloader.style.display='none';
},10000)

//FOR Form Validation

const form =document.querySelector('.form');
const username = document.querySelector('#username');
const email = document.querySelector('#emailID');
const passwordEnter = document.querySelector('#password');
const passwordConfirm = document.querySelector('#passwordMatch');

const validInps=document.querySelectorAll('.form-control');
const respRecd = document.querySelector('#resp-recd');
const inputFields = document.querySelectorAll('.form-input');

function showError(input,message){
    const formControl = input.parentElement;
    // console.log(formControl);
    formControl.classList.remove('success');
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input, message){
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function isValidEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input,'Successfully validated');
    }else{
        showError(input,'Email is not valid');
    }
  }

function passwordMatch(input1,input2){
    if(input1.value !== input2.value){
        showError(input2,'Passwords do not match');
    }
}

function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === 'Successfully validated'){
            showError(input, `${getFieldName(input)} is required`);
        }
        else{
            showSuccess(input, 'Successfully validated');
        }
    });
}

function checkLength(input,min,max){
    if(input.value.length<min){
        showError(input,`${getFieldName(input)} must be atleast ${min} characters`);
    }else if(input.value.length>max){
        showError(input,`${getFieldName(input)} must be atmost ${max} characters`);
    }
}

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    checkRequired([username,email,passwordEnter,passwordConfirm]);
    checkLength(username,3,15);
    checkLength(password,6,25);
    checkLength(passwordConfirm,6,25);
    isValidEmail(email);
    passwordMatch(passwordEnter,passwordConfirm);
    if(validInps[0].classList.contains('success') && validInps[1].classList.contains('success') && validInps[2].classList.contains('success') && validInps[3].classList.contains('success')){
        respRecd.innerHTML=`Response recieved ! We'll get in touch with you soon &nbsp; <i class="fa fa-check" aria-hidden="true"></i>`
        setTimeout(()=>{
            inputFields.forEach(field=>{
                field.value ='';
            });
            validInps.forEach(validInp=>{
                validInp.classList.remove('success');
            });
            modalCont.classList.remove('show-modal');
            respRecd.innerHTML=`Response recieved ! We'll get in touch with you soon &nbsp; <i class="fa fa-check" aria-hidden="true"></i>`
            respRecd.innerHTML='';
        },2000)
    };
});

//FOR Nav Togglen and Modal Toggle
const toggle = document.querySelector('.toggle');
const open = document.querySelector('#openForm');
const close = document.querySelector('#closeForm');
const modalCont = document.querySelector('.modal-container');
const navLinks = document.querySelectorAll('.nav-link')

navLinks.forEach(navLink =>{
    navLink.addEventListener('click',toggleBurger)
});

function toggleBurger(){
    document.body.classList.toggle('show-nav');
    toggle.classList.toggle('active');
    mouseCursor.classList.toggle('not-displayed');
};

toggle.addEventListener('click',toggleBurger);
open.addEventListener('click',()=>{
    modalCont.classList.add('show-modal');
});
close.addEventListener('click',()=>{
    modalCont.classList.remove('show-modal');
});

window.addEventListener('click',(e)=>{
    e.target==modalCont?modalCont.classList.remove('show-modal'):false
});
