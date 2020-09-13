//Variables
const colorDivs = document.querySelectorAll('.color');
const currHexes = document.querySelectorAll('.color h2');
const generateBtn = document.querySelector('.generate'); 
const sliders = document.querySelectorAll(`input[type="range"]`);
const allSliders = document.querySelectorAll('.sliders');
const closeBtns = document.querySelectorAll('.close-adjustment');
const adjustBtns = document.querySelectorAll('.adjust');
const lockBtns = document.querySelectorAll('.lock');
const copyBtns = document.querySelectorAll('.copy');

let initialColors;

function generateHex(){
    const hexCode ="1234567890ABCDEF"
    const charCodeOptions = hexCode.length;
    // console.log(charCodeOptions);
    let color="#";
    const hexLen = 6;
    for(let i=0; i<hexLen;i++){
        let randomNr=Math.floor(Math.random()*charCodeOptions);
        color+=hexCode.substring(randomNr,randomNr+1);
    }
    return color;
}

//Using chroma.js to generate colors
function generateHex2(){
    let color = chroma.random();
    return color;
}

function setColor(){
    initialColors =[];
    // for(let j=0;j<5;j++){
        //     randomColor=generateHex();
    //     currHexes[j].innerText=randomColor;
    //     colorDivs[j].style.background=randomColor;
    // }
    
    //Method2
    colorDivs.forEach((indivDiv,index)=>{
        // console.log(indivDiv.children);
        // console.log(indivDiv.children[1].children);
        let hexText = indivDiv.children[0];
        let randomColor=generateHex();
        const color = chroma(randomColor);
        if(indivDiv.classList.contains('locked')){
            // console.log(`I'm sher-locked`);
            initialColors.push(hexText.innerText);
            return;
        }else{
            initialColors.push(chroma(randomColor).hex());
        }
        hexText.innerText=randomColor;
        indivDiv.style.backgroundColor=randomColor;
        checkContrast(randomColor,hexText);
        
        const sliders = indivDiv.querySelectorAll('.sliders input');
        let hue = sliders[0];
        let brightness = sliders[1];
        let saturation = sliders[2];
        colorizeSliders(color,hue,brightness,saturation);
        // console.log(sliders);
    });
    // console.log(initialColors);
    resetInputs();
    //Check contrast for buttons
    adjustBtns.forEach((button,index)=>{
        checkContrast(initialColors[index],button);
        checkContrast(initialColors[index],lockBtns[index]);
        checkContrast(initialColors[index],copyBtns[index]);
    })
}
setColor();

copyBtns.forEach(copy=>{
    copy.addEventListener('click',()=>{
        const hex = copy.parentElement.parentElement.children[0];
        copyToClipBoard(hex);
    });
})


function colorizeSliders(color,hue,bright,sat){
    const noSat = color.set('hsl.s',0);
    const fullSat = color.set('hsl.s',1);
    const scaleSat = chroma.scale([noSat,color,fullSat]);
    sat.style.backgroundImage=`linear-gradient(to right, ${scaleSat(0)},${scaleSat(1)})`;
    
    const midBright = color.set('hsl.l',0.5);
    const scaleBright = chroma.scale(["black",midBright,"white"]);
    bright.style.backgroundImage=`linear-gradient(to right, ${scaleBright(0)},${scaleBright(0.5)},${scaleBright(1)})`;
    
    hue.style.backgroundImage=`linear-gradient(to right,rgb(204,75,75),rgb(204,204,75),rgb(75,204,75),rgb(204,75,75),rgb(75,75,204),rgb(204,75,204),rgb(204,75,75))`;
}

function checkContrast(color,text){
    const luminance = chroma(color).luminance();
    if(luminance>0.5){
        text.style.color="#000";
    }
    else{
        text.style.color="#fff";
    }
}

function hslControls(e){
    // console.log(e);
    const index = e.target.getAttribute("data-hue")||
    e.target.getAttribute("data-sat")||
    e.target.getAttribute("data-bright");
    
    // console.log(e.target.parentElement);
    const sliders = e.target.parentElement.querySelectorAll(`input[type="range"]`); 
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];
    const bgColor = colorDivs[index].querySelector('h2').innerText;
    // let bgColor = initialColors[index];
    let color = chroma(bgColor)
    .set('hsl.h',hue.value)
    .set('hsl.l',brightness.value)
    .set('hsl.s',saturation.value);
    
    colorDivs[index].style.backgroundColor=color;
    
    //To update the features of 1 slider wrt changes in other slider
    colorizeSliders(color,hue,brightness,saturation);
}

function updateTextUI(index){
    const activDiv = colorDivs[index];
    const color = chroma(activDiv.style.backgroundColor);
    let textHex = activDiv.querySelector('h2');
    // console.log(textHex);
    textHex.innerText=color.hex();
    // console.log(color.hex());
    
    checkContrast(color,textHex);
}

function resetInputs(){
    let sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider =>{
        if(slider.name === 'hue'){
            const hueColor = initialColors[slider.getAttribute("data-hue")];
            const hueValue = chroma(hueColor).hsl()[0]; //Returns a no. that contains hue as a numerical value
            slider.value=Math.floor(hueValue);
        }
        if(slider.name === 'bright'){
            const brightColor = initialColors[slider.getAttribute("data-bright")];
            const brightValue = chroma(brightColor).hsl()[1];
            slider.value=(Math.floor(brightValue*100))/100;
        }
        if(slider.name === 'sat'){
            const satColor = initialColors[slider.getAttribute("data-sat")];
            const satValue = chroma(satColor).hsl()[2];
            slider.value=(Math.floor(satValue*100))/100;
        }
    })
}

let savedPalettes = [];

const saveCont = document.querySelector('.save-container');
const closeSave = document.querySelector('.close-save');
const saveInput = document.querySelector('.save-name');
const saveBtn = document.querySelector('.save');
const submitSave = document.querySelector('.submit-save');
const libraryCont = document.querySelector('.library-container');
const libraryBtn = document.querySelector('.library');
const closeLib = document.querySelector('.close-library');

function openLibrary() {
    libraryCont.classList.add('active')
}

function closeLibrary() {
    libraryCont.classList.remove('active')
}

function savePalette(e) {
    saveCont.classList.remove('active');
    const name=saveInput.value;
    let colors = [];
    currHexes.forEach(hex=>{
        colors.push(hex.innerText);
    });
    let paletteNr=savedPalettes.length;
    
    const paletteObj={
        name,
        colors,
        nr:paletteNr
    };
    savedPalettes.push(paletteObj);
    saveToLocal(paletteObj);
    saveInput.value='';

    const palette = document.createElement('div');
    palette.classList.add('custom-palette');
    const title = document.createElement('h4');
    title.innerText = paletteObj.name;
    const preview = document.createElement('div');
    preview.classList.add('small-preview');
    //   console.log(paletteObj.colors);
    paletteObj.colors.forEach(smallColor=>{
        const smallDiv = document.createElement('div');
        smallDiv.style.backgroundColor = smallColor;
        preview.appendChild(smallDiv);
        //   console.log(smallDiv.style.backgroundColor);
    });
    const paletteBtn = document.createElement('button');
    paletteBtn.classList.add('pick-palette-btn');
    paletteBtn.classList.add(paletteObj.nr);
    paletteBtn.innerText = 'Select';

    paletteBtn.addEventListener("click", e => {
        closeLibrary();
        const paletteIndex = e.target.classList[1];
        initialColors = [];
        savedPalettes[paletteIndex].colors.forEach((color, index) => {  
        console.log(color);         
        initialColors.push(color);
        colorDivs[index].style.backgroundColor = color;
        console.log(colorDivs[index]);
        const text = colorDivs[index].children[0];
        checkContrast(color, text);
        updateTextUI(index);
        });
        resetInputs();
    });
    //Appendages
    palette.appendChild(title);
    palette.appendChild(preview);
    palette.appendChild(paletteBtn);
    libraryCont.children[0].appendChild(palette);
}

function getLocal() {
    if (localStorage.getItem("palettes") === null) {
      //Local Palettes
      localPalettes = [];
    } else {
      const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
      // *2
  
      savedPalettes = [...paletteObjects];
      paletteObjects.forEach(paletteObj => {
        //Generate the palette for Library
        const palette = document.createElement("div");
        palette.classList.add("custom-palette");
        const title = document.createElement("h4");
        title.innerText = paletteObj.name;
        const preview = document.createElement("div");
        preview.classList.add("small-preview");
        paletteObj.colors.forEach(smallColor => {
          const smallDiv = document.createElement("div");
          smallDiv.style.backgroundColor = smallColor;
          preview.appendChild(smallDiv);
        });
        const paletteBtn = document.createElement("button");
        paletteBtn.classList.add("pick-palette-btn");
        paletteBtn.classList.add(paletteObj.nr);
        paletteBtn.innerText = "Select";
  
        //Attach event to the btn
        paletteBtn.addEventListener("click", e => {
          closeLibrary();
          const paletteIndex = e.target.classList[1];
          initialColors = [];
          paletteObjects[paletteIndex].colors.forEach((color, index) => {
            initialColors.push(color);
            colorDivs[index].style.backgroundColor = color;
            const text = colorDivs[index].children[0];
            checkTextContrast(color, text);
            updateTextUI(index);
          });
          resetInputs();
        });
  
        //Append to Library
        palette.appendChild(title);
        palette.appendChild(preview);
        palette.appendChild(paletteBtn);
        libraryCont.children[0].appendChild(palette);
      });
    }
  }
  
  getLocal();

function saveToLocal(paletteObj) {
    let localPalettes;
  if(localStorage.getItem('palettes')===null){
      localPalettes = [];
  }else{
      localPalettes = JSON.parse(localStorage.getItem('palettes'));
  }
  localPalettes.push(paletteObj);
  localStorage.setItem('palettes',JSON.stringify(localPalettes));
}

function closePalette() {
  saveCont.classList.remove('active');
}

function openPalette() {
  saveCont.classList.add('active');
}

function copyToClipBoard(hex) {
    let pseudoEl = document.createElement('textarea');
    pseudoEl.value = hex.innerText;
    document.body.appendChild(pseudoEl);
    pseudoEl.select();
    document.execCommand('copy');
    document.body.removeChild(pseudoEl);
    
    //Popup Animation
    const popup = document.querySelector('.copy-container');
    // console.log(popup.children[0]); --GIVES POPUP BOX
    popup.classList.add('active');
    popup.addEventListener('transitionend',()=>{
        popup.classList.remove('active');
    });
}

//EVENT LISTENERS

generateBtn.addEventListener('click',setColor);
sliders.forEach(slider =>{
    slider.addEventListener('input',hslControls)
});

colorDivs.forEach((div,index)=>{
    div.addEventListener('change',()=>{
        updateTextUI(index);
    })
});

colorDivs.forEach((div,index)=>{
    const adjust = div.querySelector('.adjust');
    adjust.addEventListener('click',()=>{
        allSliders[index].classList.toggle('active');
        adjust.classList.toggle('clicked-adjust');
    });
});

closeBtns.forEach(closeBtn=>{
    // console.log(closeBtn.parentElement);
    closeBtn.addEventListener('click',()=>{
        const activeSlider =closeBtn.parentElement;
        if(activeSlider.classList.contains('active')){
            activeSlider.classList.remove('active');
            activeSlider.parentElement.querySelector('.adjust').classList.remove('clicked-adjust');
        }
    });
})

currHexes.forEach((hex)=>{
    hex.addEventListener('click',()=>{
        copyToClipBoard(hex);
    });
});

lockBtns.forEach((lock,index)=>{
    lock.addEventListener('click',()=>{
        // if(colorDivs[index].classList.contains('locked')){
        //     lock.innerHTML = `<i class="fas fa-lock-open"></i> `;
        //     //lock.parentElement.parentElement === colorDivs[index]
        //     colorDivs[index].classList.remove('locked');
            
        // }else{
        //     // console.log('locked !');
        //     lock.innerHTML = `<i class="fa fa-lock" aria-hidden="true"></i>`;
        //     // console.log(lock.parentElement.parentElement);
        //     colorDivs[index].classList.add('locked');
        // }

        //METHOD 2

        colorDivs[index].classList.toggle('locked');
        lock.children[0].classList.toggle('fa-lock');
        lock.children[0].classList.toggle('fa-lock-open');
        lock.classList.toggle('clicked-lock')
    });
});

libraryBtn.addEventListener('click',openLibrary);
closeLib.addEventListener('click',closeLibrary);
saveBtn.addEventListener('click',openPalette);
closeSave.addEventListener('click',closePalette);
submitSave.addEventListener('click',savePalette);