class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll('.pad')
        this.playBtn = document.querySelector('.play');
        this.index=0;
        this.isPlaying = null;
        this.bpm=150;
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
    }
    updateBtn(){
        if(this.isPlaying){
            this.playBtn.innerText = "Stop"
            this.playBtn.classList.add('active');
        }
        else{
            this.playBtn.innerText = "Play"
            this.playBtn.classList.remove('active');
        }
    }
    activatePad(){
        // console.log(this);
        this.classList.toggle('active');
    }
    repeat(){
        let step = this.index % 8;
        // console.log(`Step : ${step} and Index : ${this.index}`);
        const activeBars = document.querySelectorAll(`.b${step}`);
        // console.log(activeBars);
        activeBars.forEach(bar => {
            // console.log(bar);
            bar.style.animation =`playTrack 0.3s alternate ease-in-out 2`;
            if(bar.classList.contains('active')){
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime=0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime=0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime=0;
                    this.hihatAudio.play();
                }
            }
        });        
        this.index++;
    }
    start(){
        const interval = (60/this.bpm)*1000;
        if(this.isPlaying){
            clearInterval(this.isPlaying);
            this.isPlaying=null;;
        }
        else{
            this.isPlaying = setInterval(()=>{
                this.repeat();
            },interval);
        }
    }
    changeTrack(e){
        // console.log(e);
        let selectionName = e.target.name;
        let selectionValue = e.target.value;
        switch(selectionName){
            case('kick-select'):{
                this.kickAudio.src = selectionValue;
                break;
            }
            case('snare-select'):{
                this.snareAudio.src = selectionValue;
                break;
            }
            case('hihat-select'):{
                this.hihatAudio.src = selectionValue;
                break;
            }
        }
    }
    muteTrack(e){
        // console.log(e);
        const muteIndex = e.target.getAttribute('data-track');
        // console.log(muteIndex);
        e.target.classList.toggle('active');
        if(e.target.classList.contains('active')){
            switch(muteIndex){
                case"0":{
                    this.kickAudio.volume = 0;
                    break;
                }
                case"1":{
                    this.snareAudio.volume = 0;
                    break;
                }
                case"2":{
                    this.hihatAudio.volume = 0;
                    break;
                }
            }
        }
        else{
            switch(muteIndex){
                case"0":{
                    this.kickAudio.volume = 1;
                    break;
                }
                case"1":{
                    this.snareAudio.volume = 1;
                    break;
                }
                case"2":{
                    this.hihatAudio.volume = 1;
                    break;
                }
            }
        }
    }
    changeTempo(e){
        console.log(e.target.value);
        let tempoText = document.querySelector('.tempo-nr');
        this.bpm=e.target.value;
        tempoText.innerText = e.target.value;
    }
    updateTempo(e){        
        clearInterval(this.isPlaying);
        this.isPlaying=null;
        if(this.playBtn.classList.contains('active')){
            this.start();
        }
    }
}

const drumkit = new DrumKit();

//EVENT LISTENERS

drumkit.playBtn.addEventListener('click',function(){
    drumkit.start();
    drumkit.updateBtn();
});

drumkit.pads.forEach(pad=>{
    pad.addEventListener('click',drumkit.activatePad);
    pad.addEventListener('animationend',function(){
        this.style.animation="";
    })
}); 

drumkit.selects.forEach(select=>{
    select.addEventListener('change',function(e){
        drumkit.changeTrack(e);
    });
});
drumkit.muteBtns.forEach(mbtn=>{
    mbtn.addEventListener('click',function(e){
        drumkit.muteTrack(e);
    });
});

drumkit.tempoSlider.addEventListener('input',function(e){
    drumkit.changeTempo(e)
});
drumkit.tempoSlider.addEventListener('change',function(e){
    drumkit.updateTempo(e)
});