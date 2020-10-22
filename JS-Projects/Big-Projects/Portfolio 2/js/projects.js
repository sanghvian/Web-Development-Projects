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


//FOR Nav Togglen and Modal Toggle
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
