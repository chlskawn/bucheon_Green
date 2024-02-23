const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.Login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const creatAccountBtn = document.getElementById('createAccountBtn');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

creatAccountBtn.addEventListener('click', function() {
    window.location.href = '/users';
})

