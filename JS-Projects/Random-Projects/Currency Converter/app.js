const currencyEl_one = document.querySelector('#currency-one');
const currencyEl_two = document.querySelector('#currency-two');
const amountEl_one = document.querySelector('#amount-one');
const amountEl_two = document.querySelector('#amount-two');

const rateEl = document.querySelector('#rate');
const swapEl = document.querySelector('#swap');
//FUNCTION
function calculate(){
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res=>res.json())
        .then(data =>{
            // console.log(data);
            const rate = data.rates[currency_two];
            rateEl.innerText = `1${currency_one} = ${rate}${currency_two}`;
            amountEl_two.value = (amountEl_one.value*rate).toFixed(2);
        });
};

function swap(){
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
}

//EVENT LISTENERS

currencyEl_one.addEventListener('change',calculate);
amountEl_one.addEventListener('input',calculate);
currencyEl_two.addEventListener('change',calculate);
amountEl_two.addEventListener('input',calculate);
swapEl.addEventListener('click',swap)

calculate();