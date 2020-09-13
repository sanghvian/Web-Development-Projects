//STUDY REFERENCE : getUserMedia height, width -> mozilla website


const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
}

navigator.getUserMedia = navigator.getUserMedia || 
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia;


//SELECT EVERYTHING FROM HTML

const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
let model;

handTrack.startVideo(video)
    .then(status =>{
        if(status){
        navigator.getUserMedia(
            {video:{}}, 
            stream =>{
            video.srcObject = stream;
            //RUN DETECTION
            setInterval(runDetection,300);
            },
            err => console.log(err)
            );
        }
    });

function runDetection(){
    model.detect(video)
        .then(predictions => {
            // console.log(predictions);
            if(predictions.length!==0){
                 let hand1 = predictions[0].bbox;
                 let x = hand1[0];
                 let y = hand1[1];
                 console.log(x,y);
            
            if(y>200){
                if(x>400){
                    audio.src = "sounds/Em_Chord.mp3";
                }
                else if(x>300) {
                    audio.src ="sounds/Stanza.mp3";
                }
                else if(x>120) {
                    audio.src ="sounds/EmToD.mp3";
                }
                else if(x>0) {
                    audio.src ="sounds/CToD.mp3";
                }
            }
            else if(y<200){
                audio.src="sounds/Tabs.mp3"
            }
            //PLAY DA SOUND
            audio.play();
            }
        });
    // requestAnimationFrame(runDetection);
}

handTrack.load(modelParams)
    .then(lmodel =>{
        model=lmodel;
    })


