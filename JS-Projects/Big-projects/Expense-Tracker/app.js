let credVal = document.querySelector('.cred-no');
let debVal = document.querySelector('.deb-no');
let balance =document.querySelector('.balance-no');
const finance = document.querySelector('.finance');
const addBtn = document.querySelector('.submit');
const inp = document.querySelector('#exp-name');
const expInp = document.querySelector('#exp-amt');
const radio = document.querySelector('.radio');
let radioVal = '';
const income = document.querySelector('#inc');
const asset = document.querySelector('#as');
const liability = document.querySelector('#li');
let outflow ={
    assetsArr:[],
    liabilitiesArr:[],
    assetsNames:[],
    liabsNames:[],
};
let inflow={
    incomesArr:[],
    incomesNames:[]
};
const scoreCalci = document.querySelector('.calci-score');
let assetsArrCounter = 0;
let incomesArrCounter = 0;
let liabssArrCounter = 0;

function updateMoneyType(e){
    radioVal=e.target.value;
}

finance.addEventListener('click',deleteCheck);
function deleteCheck(e) {
    if(e.target.classList[0]==='cross-btn');
    // console.log(e.target);
    // console.log(e.target.parentElement);
    const deleteItem = e.target.parentElement;
    //DELETE FROM ARRAY
    if(deleteItem.classList.contains('income-cash')){
        // console.log(`I'm an income`);
        // console.log(deleteItem.classList[2]);
        const deleteIndex = deleteItem.classList[2];
        inflow.incomesArr[deleteIndex]=0;
    }else if(deleteItem.classList.contains('asset-cash')){
        // console.log(`I'm an asset`);        
        // console.log(deleteItem.classList[2]);
        const deleteIndex = deleteItem.classList[2];
        outflow.assetsArr[deleteIndex]=0;
    }else if(deleteItem.classList.contains('liability-cash')){
        // console.log(`I'm a liability`);
        // console.log(deleteItem.classList[2]);
        const deleteIndex = deleteItem.classList[2];
        outflow.liabilitiesArr[deleteIndex]=0;
    }

    updateFigures();
    
    deleteItem.classList.add('fall');
    deleteItem.addEventListener('transitionend',()=>{
        deleteItem.remove();
    });
}

function addExpense(a,b,c) {
    const element = document.createElement('div');
    element.classList.add('item');
    element.classList.add(`${c}`);
    const trashBtn=document.createElement('button');
    trashBtn.classList.add('cross-btn');
    trashBtn.innerHTML=`<i class="fa fa-times" aria-hidden="true"></i>`;
    const itemData = document.createElement('div');
    itemData.classList.add('item-data');
    const itemName = document.createElement('p');
    itemName.classList.add('item-name')
    itemName.innerText=`${a}`;
    const itemCash = document.createElement('p');
    itemCash.classList.add('item-cash');
    itemCash.innerHTML=`${b}`;

    element.appendChild(trashBtn);
    itemData.appendChild(itemCash);
    itemData.appendChild(itemName);
    element.appendChild(itemData);
    finance.appendChild(element);
    addFigures(element,a,b,c);
}

function updateFigures() {
    // console.log(inflow.incomesArr);
    // console.log(outflow.debit);
    // console.log(outflow.assetsArr);
    // console.log(outflow.liabilitiesArr);
    const incomeScore = inflow.incomesArr.reduce((acc,incomeItem) => (acc += incomeItem),0);
    const assetsScore = outflow.assetsArr.reduce((acc,assetItem) =>(acc+=assetItem),0);
    const liabScore = outflow.liabilitiesArr.reduce((acc,liabItem) => (acc += liabItem),0);
    const debitScore = assetsScore+liabScore;
    // console.log(incomeScore,assetsScore,liabScore);
    let totalBalance = incomeScore-debitScore;
    debVal.innerText=`₹${debitScore}`;
    credVal.innerText=`₹${incomeScore}`;
    balance.innerText=`₹${totalBalance}`;
    // console.log(totalBalance);  
}

function addFigures(element,name,number,status){
    if(status==='income-cash'){
        element.classList.add(`${incomesArrCounter}`);
        inflow.incomesArr.push(number);
        incomesArrCounter++;
    }else if(status==='asset-cash'){
        element.classList.add(`${assetsArrCounter}`)
        outflow.assetsNames.push(`${name}`);
        outflow.assetsArr.push(Math.abs(number));
        assetsArrCounter++;
        }else{
            element.classList.add(`${liabssArrCounter}`)
            outflow.liabsNames.push(`${name}`);
            outflow.liabilitiesArr.push(Math.abs(number));
            liabssArrCounter++;
        }
    
    updateFigures();

    inp.value='';
    expInp.value=0;
}

//USING CHART.JS

function getPieChart(){
    scoreCalci.innerHTML=`Regenerate Score<i class="fa fa-money" aria-hidden="true"></i>`;

    const incomeScore = inflow.incomesArr.reduce((acc,incomeItem) => (acc += incomeItem),0);
    const assetsScore = outflow.assetsArr.reduce((acc,assetItem) =>(acc+=assetItem),0);
    const liabScore = outflow.liabilitiesArr.reduce((acc,liabItem) => (acc += liabItem),0);
    const chartClue = document.querySelector('.chart-clue');
    chartClue.innerText='Click on different chart regions to know more'
    // console.log(incomeScore,assetsScore,liabScore);
    
    //Global Chart Options

    Chart.defaults.global.defaultFontFamily = 'Google';
    Chart.defaults.global.defaultFontSize = 13;
    Chart.defaults.global.defaultFontColor ='rgb(0, 128, 255)' ;

    let myChart1 = document.querySelector('#myChart1').getContext('2d');
    myChart1.canvas.parentNode.style.height = '500px';
    myChart1.canvas.parentNode.style.width = '500px';
    let pieChart = new Chart(myChart1,{
        type :'doughnut',//bar, horizontalBar,polarArea,pie,line
        data:{
            labels:['Income','Assets','Liabilities'],
            datasets:[{
                labels:'Money Distribution',
                data:[
                    incomeScore,
                    assetsScore,
                    liabScore
                ],
                backgroundColor:[
                    'rgb(32, 191, 0)',
                    'rgb(0, 208, 231)',
                    'rgb(214, 66, 66)'
                    
                ],
                hoverBorderWidth:3,
                hoverBorderColor:'#000',
            }],
        },
        options:{
            title:{
                display:true,
                text:'Your Financial Score',
                fontSize:25
            },
            legend:{
                boxWidth:10
            },
        },
    });

    assetLiabilities();    
};

function assetLiabilities() {

    let myChart2 = document.querySelector('#myChart2').getContext('2d');
    let myChart3=document.querySelector('#myChart3').getContext('2d');
    lineChartMaker(myChart2,outflow.assetsArr,outflow.assetsNames,'rgb(0, 208, 231)');
    lineChartMaker(myChart3,outflow.liabilitiesArr,outflow.liabsNames,'rgb(214, 66, 66)');
}

function lineChartMaker(chart,arr,names,color) {
//   console.log(inflow.incomesArr,outflow);
  chart.canvas.parentNode.style.height="250px";
  chart.canvas.parentNode.style.width="250px";

  let lineChart = new Chart(chart,{
    type:'line',
    data:{
        labels:[...names],
        datasets:[{
            label:'Assets',
            data:[...arr],
            backgroundColor:color,
        }],
    },
    options:{
        title:{
            display:true,
            text:'Your Record',
            fontSize:12
        }
    },
  });
};

//EVENT LISTENERS
scoreCalci.addEventListener('click',getPieChart);
income.addEventListener('click',updateMoneyType);
asset.addEventListener('click',updateMoneyType);
liability.addEventListener('click',updateMoneyType);
addBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    // console.log(inp.value,expInp.value,radioVal);
    const expName = inp.value;
    const expVal = expInp.value;
    // console.log(expName,expVal,radioVal);
    // console.log(typeof(expVal));
    addExpense(expName,parseInt(expVal),radioVal);
});


//FOR DARK/LIGHT Toggle
const toggle = document.querySelector('.toggle');
const toggleCircle = document.querySelector('.inner-circle');
const credDeb = document.querySelector('.credit-debit');
let toggleStatus = false;
const bodyColor = '--body-color';
const bgColor = '--bg-color';
const textColor = '--text-color';
const shadow = '--shadow';
const togAndBtn = '--toggle-and-btn';
const words = document.querySelector('.ltod');

toggle.addEventListener('click',()=>{
    if(!toggleStatus){
        toggleStatus=true;
        words.innerHTML='<i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Light Theme';
        toggleCircle.style.transform = 'translateX(100%)';
        credDeb.classList.add('border');
        document.documentElement.style.setProperty(bodyColor,'#212121');
        document.documentElement.style.setProperty(bgColor,'#303030');
        document.documentElement.style.setProperty(textColor,'#fcfcfc');
        document.documentElement.style.setProperty(shadow,'#0b0e1d');
        document.documentElement.style.setProperty(togAndBtn,'#127dff');
    }else{
        toggleStatus=false;
        words.innerHTML=`Let's go dark boi <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>`;
        credDeb.classList.remove('border');
        toggleCircle.style.transform = 'translateX(0)';
        document.documentElement.style.setProperty(bodyColor,'#fff');
        document.documentElement.style.setProperty(bgColor,'#fff');
        document.documentElement.style.setProperty(textColor,'#212121');
        document.documentElement.style.setProperty(shadow,'#aaa');
        document.documentElement.style.setProperty(togAndBtn,'#bbb');
        
    }
});


//GIVE TO LOCAL STORAGE
//inflow.incomesArr[],outflow{};