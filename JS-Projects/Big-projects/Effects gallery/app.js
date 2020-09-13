const lang = navigator.language;
let date = new Date();
let dayNumber = date.getDate();
let month = date.getMonth();
let dayName = date.toLocaleString(lang, { weekday: 'long' });
let monthName = date.toLocaleString(lang, { month: 'long' });
let year = date.getFullYear();

// console.log(dayName, dayNumber, monthName, month, year);

document.querySelector('.dayNumber').innerHTML = `${dayNumber}`;
document.querySelector('.dayName').innerHTML = `${dayName}`;
document.querySelector('.monthName').innerHTML = `${monthName}`;
document.querySelector('.year').innerHTML = `${year}`;

const clocks = document.querySelectorAll('.clock');

setInterval(setClock, 1000);

function setClock() {
  const currentDate = new Date();
  const secondsRatio = currentDate.getSeconds() / 60;
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
  clocks.forEach((clock) => {
    // console.log(clock);
    // console.log(clock.children);
    // console.log('///////');
    const hour = clock.querySelector('[data-hour-hand]');
    const minute = clock.querySelector('[data-minute-hand]');
    const second = clock.querySelector('[data-second-hand]');
    setInterval(setRotation(second, secondsRatio));
    setInterval(setRotation(hour, hoursRatio));
    setInterval(setRotation(minute, minutesRatio));
  });
}

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360);
}

const digTime = document.querySelector('.dig-time');

let interval = setInterval(updateDigClock, 1000);

function updateDigClock() {
  //   console.log('runnin');
  let hr = new Date().getHours();
  let min = new Date().getMinutes();
  let sec = new Date().getSeconds();
  let am = '';
  hr > 12 ? hr : hr - 12;
  if (hr > 12) {
    am = 'PM';
  } else {
    am = 'PM';
  }
  hr = hr < 10 ? '0' + hr : hr;
  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;
  // console.log(hr,min,sec);
  digTime.innerText = `${hr}:${min}:${sec} ${am}`;
}

const toggleCont = document.querySelector('.toggle-container');
const toggle = document.querySelector('.toggle');
let isToggle = false;
const toggleContBg = '--toggle-cont-bg';
const cardBg = '--card-bg';
const itemBg = '--item-bg';
const shadow = '--shadow';
const textColor = '--text-color';
const shc = '--seconds-hand-color';
const text1 = document.querySelector('.dark1');

toggleCont.addEventListener('click', () => {
  console.log('toggled');
  if (!isToggle) {
    text1.innerHTML = `<i class="fa fa-arrow-left" aria-hidden="true"></i> Light UI`;
    isToggle = true;
    toggle.style.transform = 'translateX(120%)';
    document.documentElement.style.setProperty(toggleContBg, '#009afa');
    document.documentElement.style.setProperty(cardBg, '#1b1b1b');
    document.documentElement.style.setProperty(itemBg, '#303030');
    document.documentElement.style.setProperty(shadow, '#000');
    document.documentElement.style.setProperty(textColor, '#fcfcfc');
    document.documentElement.style.setProperty(shc, '#009afa');
    document.documentElement.style.setProperty('--digi-text', '#87ff4a');
  } else {
    text1.innerHTML = `Dark UI <i class="fa fa-arrow-right" aria-hidden="true"></i>`;
    isToggle = false;
    toggle.style.transform = 'translateX(0%)';
    document.documentElement.style.setProperty(toggleContBg, '#bbb');
    document.documentElement.style.setProperty(cardBg, '#fcfcfc');
    document.documentElement.style.setProperty(itemBg, '#ddd');
    document.documentElement.style.setProperty(shadow, '#bbb');
    document.documentElement.style.setProperty(textColor, '#212121');
    document.documentElement.style.setProperty(shc, '#FD0000');
    document.documentElement.style.setProperty('--digi-text', '#212121');
  }
});

const cursor = document.querySelector('.cursor');

window.addEventListener('mousemove', (e) => {
  cursor.style.top = e.pageY + 'px';
  cursor.style.left = e.pageX + 'px';
});

const wholePic = document.querySelector('#whole');
const bldgPic = document.querySelector('#bldg');
const spideyPic = document.querySelector('#spidey');
const heading = document.querySelector('#heading');

window.addEventListener('scroll', () => {
  let value = window.scrollY;
  // console.log(value);
  spideyPic.style.top = value * 0.5 + 'px';
  wholePic.style.top = value * 0.75 + 'px';
  bldgPic.style.transform = `scale(${1 + value / 250})`;
  bldgPic.style.top = -value * 0.9 + 'px';
  heading.style.top = value * 0.9 + 'px';
  heading.style.scale = `scale(${1 + value / 250})`;
  heading.style.opacity = `${0.6 - value / 600}`;

  const dom = document.documentElement;
  const heightFromBodyTop = dom.scrollHeight;
  const sectionTopFromBodyTop = dom.scrollTop;
  const sectionHeight = dom.clientHeight;
  // console.log(dom.clientHeight,dom.scrollHeight,dom.scrollTop);
  if (sectionHeight + sectionTopFromBodyTop + 1 > heightFromBodyTop) {
    showLoading();
  }
});

//ANIMATIONS

//Hourglass animation
hourGlass();
setInterval(hourGlass, 6000);
const clockHead = document.querySelector('.clock-span');

function hourGlass() {
  setInterval(function () {
    clockHead.innerHTML =
      '<i class="fa fa-hourglass-start" aria-hidden="true"></i';
  }, 1000);
  setInterval(() => {
    clockHead.innerHTML = `<i class="fa fa-hourglass-half" aria-hidden="true"></i>`;
  }, 2000);
  setInterval(() => {
    clockHead.innerHTML = `<i class="fa fa-hourglass" aria-hidden="true"></i>`;
  }, 3000);
  setInterval(() => {
    clockHead.innerHTML = `<i class="fa fa-hourglass-end" aria-hidden="true"></i>`;
  }, 4000);
  setInterval(() => {
    clockHead.style.transform = `rotateZ(180deg)`;
  }, 5000);
}

//Calender animation
calenAnim();
setInterval(calenAnim, 4000);
const calender = document.querySelector('.calender-span');

function calenAnim() {
  setInterval(() => {
    calender.innerHTML = `<i class="fa fa-calendar-o" aria-hidden="true"></i>`;
  }, 1000);
  setInterval(() => {
    calender.innerHTML = `<i class="fa fa-calendar" aria-hidden="true"></i>`;
  }, 2000);
  setInterval(() => {
    calender.innerHTML = `<i class="fa fa-calendar-check-o" aria-hidden="true"></i>`;
  }, 3000);
}
const gradients = [
  'linear-gradient(-225deg,#f7797d,#FBD786,#C6FFDD)',
  'linear-gradient(-225deg,#1f4037,#99f2c8)',
  'linear-gradient(-225deg,#f12711,#f5af19)',
  'linear-gradient(-225deg,#2193b0,#6dd5ed)',
];
const bubble = document.querySelector('.bubble');
const sections = document.querySelectorAll('section');

const options = {
  threshold: 0.7,
};

function navCheck(entries) {
  entries.forEach((entry) => {
    console.log(entry);
    const className = entry.target.className;
    const activeAnchor = document.querySelector(`[data-active=${className}]`);
    //   console.log(activeAnchor);
    const gradientIndex = entry.target.getAttribute('data-index');
    const rect = activeAnchor.getBoundingClientRect();
    const dirns = {
      top: rect.top,
      left: rect.left,
      height: rect.height,
      width: rect.width,
    };
    if (entry.isIntersecting) {
      bubble.style.setProperty('left', `${dirns.left}px`);
      bubble.style.setProperty('top', `${dirns.top}px`);
      bubble.style.setProperty('height', `${dirns.height}px`);
      bubble.style.setProperty('width', `${dirns.width}px`);
      bubble.style.background = gradients[gradientIndex];
    }
    if (entry.isIntersecting && gradientIndex == 2) {
      animateNos();
    }
  });
}

let observer = new IntersectionObserver(navCheck, options);

sections.forEach((section) => {
  observer.observe(section);
});

///DRAG DROP FUNCTION
const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach((draggable) => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });
  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});

containers.forEach((container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getAfterElement(container, e.clientX);
    const draggable = document.querySelector('.dragging');
    if (afterElement === null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getAfterElement(container, x) {
  const draggables = [
    ...container.querySelectorAll('.draggable:not(.dragging'),
  ];
  return draggables.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.left - box.width / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

//FOR SIMPLE DRAG DROP STUFF
const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');

//Empty listeners
for (const empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}

//Empty functions
function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave() {
  this.className = 'empty';
}
function dragDrop() {
  this.className = 'empty';
  this.appendChild(fill);
}

//Fill listeners
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

//Fill functions
function dragStart() {
  this.className += ' hold';
  setTimeout(() => (this.className = 'invisible'), 0);
}
function dragEnd() {
  this.className = 'fill';
}

//THE INFINITE BLOG
const postCont = document.querySelector('.posts-container');
const filter = document.querySelector('.filter-inp');
const limit = 5;
let page = 1;
const loading = document.querySelector('.loader');

async function getPosts() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await response.json();

  return data;
}

function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

async function showPosts() {
  const posts = await getPosts();

  // console.log(posts);
  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
        <div class="post-number">${post.id}</div>
        <div class="post-info">
            <div class="post-title">${post.title}</div>
            <div class="post-body">${post.body}</div>
        </div>
        `;
    postCont.appendChild(postEl);
  });
}

function filterInput(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = document.querySelector('.post-title').innerText.toUpperCase();
    const body = document.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

showPosts();

// window.addEventListener('scroll',()=>{
//     const dom = document.documentElement;
//     const heightFromBodyTop = dom.scrollHeight;
//     const sectionTopFromBodyTop = dom.scrollTop;
//     const sectionHeight = dom.clientHeight;
//     // console.log(dom.clientHeight,dom.scrollHeight,dom.scrollTop);
//     if(sectionHeight + sectionTopFromBodyTop + 1 > heightFromBodyTop){
//         showLoading();
//     }
// });

filter.addEventListener('input', filterInput);

///FOR ANIMATED COUNTER EFFECT
const counters = document.querySelectorAll('.counter');
const speed = 250;
const animSection = document.querySelector('.anim');
const counterBox = document.querySelector('.counter-box');
// console.log(animSection);

function animateNos() {
  console.log('triggered boi');
  counters.forEach((counter) => {
    const updateCount = () => {
      const count = +counter.innerText;
      const target = +counter.getAttribute('data-target');

      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}
