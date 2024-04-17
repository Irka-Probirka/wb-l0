const btnTotal = document.querySelector('.btn-pay');
const checkboxTotal = document.querySelector('#use-card');
const totalSum = document.querySelector('.total-price span');

checkboxTotal.addEventListener('click', () => {
    if(checkboxTotal.checked) {
        btnTotal.innerHTML = `Оплатить ${totalSum.innerHTML.toString()}`;
    }
    else {
        btnTotal.innerHTML = "Заказать";
    }
})


const btnHideCart = document.querySelector('.form-header img');
const elemInCart = document.querySelectorAll('.form-header ~ article:has(section.sum)');
const cartHeaderLabel = document.querySelector('.form-header label');
const cartHeader = document.querySelector('.form-header');

const formHeaderImg = document.querySelector('.form-header img')
const countItemsInCart = document.createElement("h3");

let closeCart = false;
btnHideCart.addEventListener('click', () => {
    if (!closeCart) { // закрываем
        cartHeader.style.alignItems = 'flex-end';
        cartHeaderLabel.style.display = 'none';

        countItemsInCart.textContent = `${elemInCart.length} товаров · 2 100 569 сом`;
        cartHeader.insertBefore(countItemsInCart, formHeaderImg);

        formHeaderImg.style.transform = 'rotate(180deg)';

        elemInCart.forEach((item) => {
            item.style.display = 'none';
        })

        closeCart = !closeCart;
    }
    else { // открываем
        cartHeader.style.alignItems = 'center';
        countItemsInCart.remove();

        cartHeaderLabel.style.display = 'flex';

        formHeaderImg.style.transform = 'rotate(0deg)';

        elemInCart.forEach((item) => {
            item.style.display = 'flex';
        })
        closeCart = !closeCart;
    }
});


const btnHideMissing = document.querySelector('.missing img');
const elemMissInCart = document.querySelectorAll('.missing ~ article');
const missingBlock = document.querySelector('.missing');

const missingImg = document.querySelector('.missing img')

let closeMissItems = false;
btnHideMissing.addEventListener('click', () => {
    if (!closeMissItems) { // закрываем
        missingBlock.style.borderBottom = 'none';

        missingImg.style.transform = 'rotate(180deg)';

        elemMissInCart.forEach((item) => {
            item.style.display = 'none';
        })

        closeMissItems = !closeMissItems;
    }
    else { // открываем
        missingBlock.style.borderBottom = '2px solid rgba(0, 0, 0, 10%)';

        missingImg.style.transform = 'rotate(0deg)';

        elemMissInCart.forEach((item) => {
            item.style.display = 'flex';
        })

        closeMissItems = !closeMissItems;
    }
});


// Закрываем модальное окно Оплаты
const fixedModalPayment = document.querySelector('.fixed-modal:has(.change-pay)');
const modalButtonPayment = document.querySelector('.closeButtonChangePayment');
const paymentSelectButton = document.querySelector('.fixed-modal:has(.change-pay) .submit button');

function closeModalPayment() {
    fixedModalPayment.classList.add('display-none');
}

modalButtonPayment.addEventListener('click', closeModalPayment);
paymentSelectButton.addEventListener('click', closeModalPayment);


// Закрываем модальное окно Доставки
const fixedModalDelivery = document.querySelector('.fixed-modal:has(.change-delivery)');
const modalButtonDelivery = document.querySelector('.closeButtonChangeDelivery');
const deliverySelectButton = document.querySelector('.fixed-modal:has(.change-delivery) .submit button');

function closeModalDelivery() {
    fixedModalDelivery.classList.add('display-none');
}

modalButtonDelivery.addEventListener('click', closeModalDelivery);
deliverySelectButton.addEventListener('click', closeModalDelivery);


// Открываем модальное окно Оплаты
const paymentChange = document.querySelector('.payment .info-title div');
const paymentChangeInTotal = document.querySelector('.delivery-info img#changePayment');
const modalPayment = document.querySelector('.fixed-modal:has(.change-pay)')

function openModalPayment () {
    if (modalPayment.classList.contains('display-none')) {
        modalPayment.classList.remove('display-none');
    }
}

paymentChange.addEventListener('click', openModalPayment);
paymentChangeInTotal.addEventListener('click', openModalPayment);


// Открываем модальное окно Доставки
const deliveryChange = document.querySelector('.delivery .info-title div');
const deliveryChangeInTotal = document.querySelector('.delivery-info img#changeDelivery');
const modalDelivery = document.querySelector('.fixed-modal:has(.change-delivery)')

function openModalDelivery () {
    if (modalDelivery.classList.contains('display-none')) {
        modalDelivery.classList.remove('display-none');
    }
}

deliveryChange.addEventListener('click', openModalDelivery);
deliveryChangeInTotal.addEventListener('click', openModalDelivery);


// Валидация полей input
const inputFirstName = document.querySelector('input[name="firstname"]');
const inputLastName = document.querySelector('input[name="lastname"]');
const inputEmail = document.querySelector('input[name="email"]');
const inputTelephone = document.querySelector('input[name="telephone"]');
const inputInn = document.querySelector('input[name="inn"]');

const errorFirstName = document.querySelector('label[for="firstname"] + span');
const errorLastName = document.querySelector('label[for="lastname"] + span');
const errorEmail = document.querySelector('label[for="email"] + span');
const errorTelephone = document.querySelector('label[for="telephone"] + span');
const errorInn = document.querySelector('label[for="inn"] + span');

let isFirstNameOk = false;
let isLastNameOk = false;
let isEmailOk = false;
let isTelephoneOk = false;
let isInnOk = false;

// EMAIL
//
const REGULAR_EMAIL = /([a-zA-Z0-9.-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
inputEmail.addEventListener('keyup', () => {
    if (inputEmail.value !== '' && !REGULAR_EMAIL.test(inputEmail.value)) {
        errorEmail.innerText = 'Проверьте адрес электронной почты';
        errorEmail.classList.add('error')
    }
    else {
        errorEmail.innerText = '';
        errorEmail.classList.remove('error');
    }
});


//
// ИНН
//
inputInn.addEventListener('keydown', (event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        event.preventDefault()
    }
});

inputInn.addEventListener('keyup', () => {
    const res = inputInn.value.match(/\d/g);
    if (res?.length === 14) {
        errorInn.innerText = '';
    }
    else {
        errorInn.innerText = 'Проверьте ИНН';
    }
});


//
// ТЕЛЕФОН
//
inputTelephone.addEventListener('blur', () => {
    if (inputInn.value !== '') {
        errorInn.innerText = 'Проверьте ИНН';
    }
    else {
        errorInn.innerText = '';
    }
})

inputTelephone.addEventListener('keydown', (event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        event.preventDefault()
    }
});

inputTelephone.addEventListener('keypress', () => {
    if(!/^\+/.test(inputTelephone.value) && inputTelephone.value !== '') {
        inputTelephone.value = `+${inputTelephone.value}`;
    }

    if(/^\+8/.test(inputTelephone.value) && inputTelephone.value !== '') {
        inputTelephone.value.replace(/^\+8/, '+7')
    }

    if (inputTelephone.value !== '') {
        errorTelephone.innerText = 'Формат: +9 999 999 99 99';
        errorTelephone.classList.add('error')
    }
    else {
        errorTelephone.innerText = '';
        errorTelephone.classList.remove('error');
    }

    switch (inputTelephone.value) {
        case inputTelephone.value.match(/^\+\d$/)?.input:
            inputTelephone.value += ' ';
            break;
        case inputTelephone.value.match(/^\+\d \d{3}$/)?.input:
            inputTelephone.value += ' ';
            break;
        case inputTelephone.value.match(/^\+\d \d{3} \d{3}$/)?.input:
            inputTelephone.value += ' ';
            break;
        case inputTelephone.value.match(/^\+\d \d{3} \d{3} \d{2}$/)?.input:
            inputTelephone.value += ' ';
            break;
        case inputTelephone.value.match(/^\+\d \d{3} \d{3} \d{2} \d{2}/)?.input:
            inputTelephone.maxLength = 16;
            break;
        default:
            errorTelephone.value = 'не робит';
            break;
    }
});

inputTelephone.addEventListener("keydown", (event) => {
    if (event.keyCode === 8 && inputTelephone.value.toString().slice(-1) === ' ') {
        inputTelephone.value = inputTelephone.value.toString().slice(0, -1);
    }
});

inputTelephone.addEventListener("keyup", () => {
    const res = inputTelephone.value.match(/\d/g);
    if (res.length === 11) {
        errorTelephone.innerText = '';
    }
});


//Отправляем форму
const btnFormSubmit = document.querySelector('.btn-pay');

btnFormSubmit.addEventListener('click', (event) => {
    event.preventDefault();

    isFirstNameOk = errorFirstName.innerText === '' && inputFirstName.value !== '';
    isLastNameOk = errorLastName.innerText === '' && inputLastName.value !== '';
    isEmailOk = errorEmail.innerText === '' && inputEmail.value !== '';
    isTelephoneOk = errorTelephone.innerText === '' && inputTelephone.value !== '';
    isInnOk = errorInn.innerText === '' && inputInn.value !== '';

    const conditions = [
        isFirstNameOk,
        isLastNameOk,
        isEmailOk,
        isTelephoneOk,
        isInnOk,
    ];
    console.log('conditions: ', conditions);

    const isConditionsError = conditions.includes(false)
    console.log('isConditionsError: ', isConditionsError);


    if (isConditionsError) {
        if (window.innerWidth < 1024) {
            const el = document.querySelector('.addressee-info');
            el.scrollIntoView({behavior: "smooth"});
        }
    }
    else {
        // Если все хорошо
        console.log('Успешное получение данных!');
    }
})