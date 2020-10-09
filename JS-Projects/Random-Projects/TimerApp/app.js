let timerName = document.querySelector('#timer-name');
const timerList = document.querySelector('.timer-list');
let hr = document.querySelector('#timer-time-hr');
let min = document.querySelector('#timer-time-min');
let sec = document.querySelector('#timer-time-sec');
const onebeep = document.querySelector('#onebeep');
const twobeep = document.querySelector('#twobeep');
const sevenbeep = document.querySelector('#sevenbeep');
const submitInput = document.querySelector('.addTimer');
let soundSelected='';
let soundSelecSrc='';

//FUNCTIONS
function selectSound(e){
    // console.log(e);
    // console.log(e.target.dataset.sound);
    soundSelected=e.target.value;
    // console.log(soundSelected);
    soundSelectSrc=e.target.dataset.sound;
    // console.log(soundSelectSrc);
}




//EVENT LISTENERS
onebeep.addEventListener('click', selectSound);
twobeep.addEventListener('click', selectSound);
sevenbeep.addEventListener('click', selectSound);
submitInput.addEventListener('click',addTimerItem);

function addTimerItem(e){
    e.preventDefault();
    //Add new list item
    const timerItem = document.createElement('div');
    timerItem.classList.add('timer-item');
    //Add name to item
    const itemName = document.createElement('li');
    itemName.classList.add('item-name');
    itemName.innerText = `${timerName.value}`;
    //Add time to item
    const itemTime = document.createElement('li');
    itemTime.classList.add('item-time');
    console.log(hr.value);
    console.log(min);
    console.log(sec);
    itemTime.innerText = `${hr.value}:${min.value}:${sec.value}`
    //Add buttons Div
    const btnsDiv=document.createElement('div')
    //Add check button
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('check');
    checkBtn.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`;
    //Add trash button
    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash')
    trashBtn.innerHTML=`<i class="fa fa-trash" aria-hidden="true"></i>`;
    //Appendages
    timerList.appendChild(timerItem);
    timerItem.appendChild(itemName);
    timerItem.appendChild(itemTime);
    timerItem.appendChild(btnsDiv);
    btnsDiv.appendChild(checkBtn);
    btnsDiv.appendChild(trashBtn);
    //Clear existing inputs
    hr.value='';
    min.value='';
    sec.value='';
    timerName.value='';

}