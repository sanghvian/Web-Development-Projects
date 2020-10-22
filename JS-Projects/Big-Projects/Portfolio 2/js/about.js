   //FOR Mouse Cursor Effect
  
  const mouseCursor = document.querySelector('.cursor');
  
  window.addEventListener('mousemove', (e) => {
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';
  });
  
  document.addEventListener('click', () => {
    mouseCursor.classList.add('expand');
  
    setTimeout(() => {
      mouseCursor.classList.remove('expand');
    }, 500);
  });
  
  //FOR Form Validation
  
  const form = document.querySelector('.form');
  const username = document.querySelector('#username');
  const email = document.querySelector('#emailID');
  const passwordEnter = document.querySelector('#password');
  const passwordConfirm = document.querySelector('#passwordMatch');
  
  const validInps = document.querySelectorAll('.form-control');
  const respRecd = document.querySelector('#resp-recd');
  const inputFields = document.querySelectorAll('.form-input');
  
  function showError(input, message) {
    const formControl = input.parentElement;
    // console.log(formControl);
    formControl.classList.remove('success');
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    small.innerText = message;
  }
  
  function showSuccess(input, message) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
    const small = formControl.querySelector('small');
    small.innerText = message;
  }
  
  function isValidEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSuccess(input, 'Successfully validated');
    } else {
      showError(input, 'Email is not valid');
    }
  }
  
  function passwordMatch(input1, input2) {
    if (input1.value !== input2.value) {
      showError(input2, 'Passwords do not match');
    }
  }
  
  function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
      if (input.value.trim() === 'Successfully validated') {
        showError(input, `${getFieldName(input)} is required`);
      } else {
        showSuccess(input, 'Successfully validated');
      }
    });
  }
  
  function checkLength(input, min, max) {
    if (input.value.length < min) {
      showError(
        input,
        `${getFieldName(input)} must be atleast ${min} characters`
      );
    } else if (input.value.length > max) {
      showError(input, `${getFieldName(input)} must be atmost ${max} characters`);
    }
  }
  
  function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([username, email, passwordEnter, passwordConfirm]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkLength(passwordConfirm, 6, 25);
    isValidEmail(email);
    passwordMatch(passwordEnter, passwordConfirm);
    if (
      validInps[0].classList.contains('success') &&
      validInps[1].classList.contains('success') &&
      validInps[2].classList.contains('success') &&
      validInps[3].classList.contains('success')
    ) {
      respRecd.innerHTML = `Response recieved ! We'll get in touch with you soon &nbsp; <i class="fa fa-check" aria-hidden="true"></i>`;
      setTimeout(() => {
        inputFields.forEach((field) => {
          field.value = '';
        });
        validInps.forEach((validInp) => {
          validInp.classList.remove('success');
        });
        modalCont.classList.remove('show-modal');
        respRecd.innerHTML = `Response recieved ! We'll get in touch with you soon &nbsp; <i class="fa fa-check" aria-hidden="true"></i>`;
        respRecd.innerHTML = '';
      }, 2000);
    }
  });
  
  //FOR Nav Togglen and Modal Toggle
  const open = document.querySelector('#openForm');
  const close = document.querySelector('#closeForm');
  const modalCont = document.querySelector('.modal-container');
  const toggle = document.querySelector('.toggle');
  const navigBar = document.querySelector('.navig-bar');
  const navLinks = document.querySelectorAll('.nav-link');
  let isToggle = false;
  
  const toggleNav = () => {
    if (!isToggle) {
      isToggle = true;
      toggle.classList.add('active');
      document.body.classList.add('hide');
      document.documentElement.style.setProperty('--nav-toggle', '#303030');
      document.documentElement.style.setProperty('--nav-bg-toggle', '#fcfcfc');
  
      gsap.to('.line-1', 0.3, { rotate: '45', background: 'black', y: -3 });
      gsap.to('.line-3', 0.3, { rotate: '-45', background: 'black', y: 3 });
      gsap.to('.line-2', 0.3, { scaleX: 0 });
      gsap.to('.navig-bar', 1, { clipPath: 'circle(2500px at 100% -10%)' });
    } else {
      isToggle = false;
      toggle.classList.remove('active');
      document.body.classList.remove('hide');
      document.documentElement.style.setProperty('--nav-toggle', '#fcfcfc');
      document.documentElement.style.setProperty('--nav-bg-toggle', '#000');
  
      gsap.to('.line-1', 0.3, { rotate: '0', background: 'white', y: 0 });
      gsap.to('.line-3', 0.3, { rotate: '0', background: 'white', y: 0 });
      gsap.to('.line-2', 0.3, { scaleX: 1 });
      gsap.to('.navig-bar', 1, { clipPath: 'circle(50px at 100% -20%)' });
    }
  };
  toggle.addEventListener('click', toggleNav);
  
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      console.log('toggled nav');
      console.log(isToggle);
      toggleNav();
    });
  });
  
  open.addEventListener('click', () => {
    modalCont.classList.add('show-modal');
  });
  close.addEventListener('click', () => {
    modalCont.classList.remove('show-modal');
  });
  
  window.addEventListener('click', (e) => {
    e.target == modalCont ? modalCont.classList.remove('show-modal') : false;
  });
  