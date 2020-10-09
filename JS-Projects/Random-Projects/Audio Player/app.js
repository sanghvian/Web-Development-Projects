const playBtn = document.querySelector('.play'),
    frwd=document.querySelector('.frwd'),
    bcwd=document.querySelector('.bcwd'),
    mCont=document.querySelector('.music-container');
let title=document.querySelector('.music-title'),
    cover=document.querySelector('.cover'),
    progressCont=document.querySelector('.progress-container'),
    progress=document.querySelector('.progress'),
    audio=document.querySelector('audio');  
const songs=['time','heavy','gone'];
let songIndex=0;
loadSong(songs[songIndex]);


playBtn.addEventListener('click',()=>
{
    let isPlaying = mCont.classList.contains('play');
    if(!isPlaying){
        playSong();
    }else{
        pauseSong();
    }
    
}
);
frwd.addEventListener('click',nextSong);
bcwd.addEventListener('click',prevSong);
audio.addEventListener('timeupdate',updateProgress);
progressCont.addEventListener('click',gotoPoint);
audio.addEventListener('ended',nextSong);

function loadSong(song){
    title.innerText=`${song}`;
    audio.src=`./music/${song}.mp3`;
    cover.src=`./images/${song}.png`;    

}
function playSong(){
    // console.log(e);
    mCont.classList.add('play');
    playBtn.innerHTML=`<i class="fa fa-pause" aria-hidden="true"></i>`;
    audio.play();
}

function pauseSong() {
    mCont.classList.remove('play');
    playBtn.innerHTML=`<i class="fa fa-play" aria-hidden="true"></i>`;
    audio.pause();
}

function nextSong() {
    songIndex++;

    if(songIndex>songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function prevSong() {
    songIndex--;

    if(songIndex<0){
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const {duration,currentTime}=e.srcElement;
    // console.log(e.srcElement);
    const progressPercent = (currentTime/duration)*100;
    progress.style.width=`${progressPercent}%`;
}

function gotoPoint(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX/width)*duration;
  
}