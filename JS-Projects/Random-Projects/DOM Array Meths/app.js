const toggle = document.querySelector('.toggle');
const toggleCircle = document.querySelector('.inner-circle');
let toggleStatus = false;
const contColor = '--container-color';
const togAndBtn = '--toggle-and-btn';
const bodyColor = '--bg-color';
const textColor = '--text-color';
const btnColor = '--btn-clr';

toggle.addEventListener('click',()=>{
    if(!toggleStatus){
        toggleStatus=true;
        toggleCircle.style.transform = 'translateX(100%)';
        document.documentElement.style.setProperty(bodyColor,'#212121');
        document.documentElement.style.setProperty(textColor,'#fcfcfc');
        document.documentElement.style.setProperty(btnColor,'#fcfcfc');
        document.documentElement.style.setProperty(contColor,'#303030');
        document.documentElement.style.setProperty(togAndBtn,'#127dff');
    }else{
        toggleStatus=false;
        toggleCircle.style.transform = 'translateX(0)';
        document.documentElement.style.setProperty(bodyColor,'#fcfcfc');
        document.documentElement.style.setProperty(textColor,'#333333');
        document.documentElement.style.setProperty(btnColor,'#333333');
        document.documentElement.style.setProperty(contColor,'#ebebeb');
        document.documentElement.style.setProperty(togAndBtn,'#bbb');
        
    }
});

const userBtn = document.querySelector('.add-user');
const doubleBtn = document.querySelector('.double-cash');
const millsBtn = document.querySelector('.show-mills');
const richerBtn = document.querySelector('.sort-riches');
const netBtn = document.querySelector('.net-wealth');
const table = document.querySelector('.table'); 
let data = [];

async function getRandUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    // console.log(data);
    const user = data.results[0];

    // console.log(user);
    const newUser ={
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random()*1000000)
    }

    addData(newUser);
}

function addData(obj){
    data.push(obj);    
    updateDOM(data);
};

function updateDOM(providedData = data){
    console.log(providedData);
    table.innerHTML = `<h1><strong>Person</strong>Wealth</h1>`
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('user');
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
        table.appendChild(element);
    });    
}

function formatMoney(money){
    return '₹' + (money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}

function doubleMoney(){
    data = data.map(user=>{
        return ({...user, money:user.money *=2})
    });
    updateDOM();
}

function sortRiches(){
    console.log('who da richest');
    data = data.sort((a,b)=>b.money - a.money);
    updateDOM();
}

function showMillsOnly(){
    console.log('mills only pls');
    data = data.filter(user=>user.money>1000000);
    updateDOM();
}

function netWealth(){
    console.log('total moneyzz pls');
    net = data.reduce((acc,user)=>(acc += user.money),0);
    const netElem = document.createElement('div');
    netElem.classList.add('user');
    netElem.innerHTML=`<strong>Net Wealth</strong>${formatMoney(net)}`;
    table.appendChild(netElem);
}

userBtn.addEventListener('click',getRandUser);
doubleBtn.addEventListener('click',doubleMoney);
richerBtn.addEventListener('click',sortRiches);
millsBtn.addEventListener('click',showMillsOnly);
netBtn.addEventListener('click',netWealth);