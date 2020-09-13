const wordEl = document.querySelector('.word');
const wrongEl = document.querySelector('.wrong-words');
const finalMsg = document.querySelector('#final-msg');
const playAgain = document.querySelector('#play-again');
const figureParts = document.querySelectorAll('.figure-part');
const notif = document.querySelector('.notification-container')
const popup = document.querySelector('.popup-container');
const popupBox = document.querySelector('.popup');
const words = ['application','programming','javascript','angular','photoshop','illustrator','premierepro','flutter','intelligence'];
let selectedWord = words[Math.floor(Math.random()*words.length)];
const correctLetters =[];
const wrongLetters =[];


function displayWord(){
    wordEl.innerHTML=`
    ${selectedWord
        .split('')
        .map(
            letter=>`
                <span class='letter'>
                    ${correctLetters.includes(letter)?letter:''}
                </span>
            `
        )
        .join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g,'');
    if(innerWord === selectedWord){
        finalMsg.innerText='Congrats ! You have won ! 🥳 🎉';
        popup.style.display='flex';
    }
}


displayWord();

function showNotification(){
    notif.style.opacity=1;
    notif.style.transform='scale(1)'

    setTimeout(()=>{
        notif.style.opacity=0;
        notif.style.transform='scale(0)'
    },1500);
}

function showWrongLetters(){
    // console.log('You fucked up boi !');
    wrongEl.innerHTML=`
    ${wrongLetters.length>0? `<p>Wrong</p>` :''}
    ${wrongLetters.map(letter=> `<span>${letter}</span>`)}
    `;
    figureParts.forEach((part,index)=>{
        const errors = wrongLetters.length;
        if(index<errors){
            part.style.display='block';
        }else{
            part.style.display='none';
        }
    });
    if(wrongLetters.length ===figureParts.length){
        finalMsg.innerText='You just lost boi ! 🖕';
        popup.style.display='flex';
    }
}

window.addEventListener('keydown',(e)=>{
    if(e.keyCode >= 65 && e.keyCode<=90){
        // console.log(e);
        const letter = e.key;
        // console.log(letter);
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                showNotification();
            }
                        
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                showWrongLetters();
            }else{
                showNotification();
            }
        }
    }
});

playAgain.addEventListener('click',()=>{
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord=words[Math.floor(Math.random()*words.length)];
    displayWord();
    showWrongLetters();
    popup.style.display='none';
});