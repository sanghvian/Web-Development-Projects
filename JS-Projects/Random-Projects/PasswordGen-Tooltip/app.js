function getPassword(){
    var chars ="0123456789asdfghjkqwertyuiopzxcvbnmZXCVBNMASDFGHJKLPOIUYTREWQ!@#$%^&*()_+><:{}[]"
    var passwordLength=16;
    var password="";

    for(var i = 0;i<passwordLength;i++){
        var randomNr = Math.floor(Math.random()*chars.length);
        password += chars.substring(randomNr,randomNr+1);
    }
    document.getElementById('password').value=password;
    alertBox.innerText= "New Password Copied : <br>" + password;
}

var alertBox = document.querySelector('.alertBox');

function copyPassword(){
    var copyPassText = document.getElementById('password');
    copyPassText.select();
    copyPassText.setSelectionRange(0,9999);
    document.execCommand('copy');
    alertBox.classList.toggle('active');
    setTimeout(function(){
        alertBox.classList.toggle('active');
    },1500);
}