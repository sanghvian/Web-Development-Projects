//VARIABLES

const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

//Custom replies
const greetings = [`I'm good you crazy lil motherfucker`,`Gaand me lega ki moo mae?`,`Choop ray bhadway`,'leave me alone pervert'];
const weather = [`why do you care. you don't go out anyways`]


const SpeechRecog = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecog();


// FUNCTIONS

recognition.onstart = function (){
    console.log('voice activated. talk to mic');
};

// recognition.onspeechend = function(){
//     console.log('Stop talking');
// }

recognition.onresult = function(event){
    console.log(event);
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    readOutLoud(transcript);
};

function appLoad(){
    const SpeechR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SpeechR();
    recog.onstart = function (){
        console.log('voice activated. talk to mic');
    };
    recog.onresult = function(event){
        console.log(event);
        const curr = event.resultIndex;    
        const script = event.results[curr][0].script;
        content.textContent = script;
    };
    recog.start();
    const welcome = new SpeechSynthesisUtterance();
    welcome.volume=1;
    welcome.rate=1;
    welcome.pitch=1;
    welcome.text = "Hey ! I'm Ankit.Press the button to talk to me. How may I help you ?";

    const yourName = event.results[curr][0].script;
    const intro = new SpeechSynthesisUtterance();
    
}

function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance();
    speech.text=`I don't know what ${message} means. Could you please phrase it better ?`;
    
    if(message.includes('how are you')){
        const finalText = greetings[Math.floor(Math.random()*greetings.length)];
        speech.text=finalText;
    }


    speech.volume=1;
    speech.rate=1;
    speech.pitch=1;
    window.speechSynthesis.speak(speech);
}


//EVENT LISTENERS

btn.addEventListener('click',()=>{
    recognition.start();
});

// window.addEventListener('load',appLoad)
