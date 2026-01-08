const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('show');
    if(menuBtn.textContent === '☰'){
        menuBtn.textContent = '✖';
    }
    else{
        menuBtn.textContent = '☰';
    }
})