const form =document.querySelector('.form');
const username = document.querySelector('#username');
const email = document.querySelector('#emailID');
const passwordEnter = document.querySelector('#password');
const passwordConfirm = document.querySelector('#passwordMatch');

function showError(input,message){
    const formControl = input.parentElement;
    // console.log(formControl);
    formControl.classList.remove('success');
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input, message){
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function isValidEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input,'Successfully validated');
    }else{
        showError(input,'Email is not valid');
    }
  }

function passwordMatch(input1,input2){
    if(input1.value !== input2.value){
        showError(input2,'Passwords do not match');
    }
}

function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === 'Successfully validated'){
            showError(input, `${getFieldName(input)} is required`);
        }
        else{
            showSuccess(input, 'Successfully validated');
        }
    });
}

function checkLength(input,min,max){
    if(input.value.length<min){
        showError(input,`${getFieldName(input)} must be atleast ${min} characters`);
    }else if(input.value.length>max){
        showError(input,`${getFieldName(input)} must be atmost ${max} characters`);
    }
}

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    checkRequired([username,email,passwordEnter,passwordConfirm]);
    checkLength(username,3,15);
    checkLength(password,6,25);
    checkLength(passwordConfirm,6,25);
    isValidEmail(email);
    passwordMatch(passwordEnter,passwordConfirm);
});