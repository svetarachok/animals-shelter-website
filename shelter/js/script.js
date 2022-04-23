import {Card} from '../js/Card.js'

const burgerMenu = document.querySelector('.burger-icon');
const menuLinks = document.querySelectorAll('.nav_item');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay')

//Burger menu

const openMenu = () => {
    burgerMenu.classList.add('clicked');
    menu.classList.add('opened');
    overlay.classList.add('shadowed');
    document.body.classList.add('hidden-overflow')
}

const closeMenu = () => {
    burgerMenu.classList.remove('clicked');
    menu.classList.remove('opened');
    overlay.classList.remove('shadowed');
    document.body.classList.remove('hidden-overflow')
}

burgerMenu.addEventListener('click', function() {
    burgerMenu.classList.contains('clicked') ? closeMenu() : openMenu()
})

menuLinks.forEach(item => {
        item.addEventListener('click', closeMenu)
})

overlay.addEventListener('click', closeMenu)

//Main page slider

const getData = async (url) => await ( await fetch (url)).json();
const petsDataArray = await getData('../../js/pets.json')
const BTN_SLIDER_LEFT = document.querySelector('#btn-slider-left');
const BTN_SLIDER_RIGHT = document.querySelector('#btn-slider-right');
const SLIDER = document.querySelector('#slider');

console.log(petsDataArray)

// const clearSlidesContainer = () => {
//     const slidesContainer = document.querySelectorAll('.slider > .slider')
//     slidesContainer.forEach(container => container.innerHTML = '');
//     return slidesContainer
// }

const clearSlidesContainer = (position) => {
    const slidesContainer = document.querySelector(`.slider-${position}`)
    slidesContainer.innerHTML = '';
    return slidesContainer
}

const generateCards = (data) => {
    let cards = [];
    data.forEach(card => {
        cards.push(new Card(card))
    });
    return cards;
}


const renderSliderCards = (dataArray) => {
    let slider = clearSlidesContainer();
    let cardsArray = generateCards(dataArray);
    console.log(cardsArray)
    for(let i = 0; i < 3; i++) {
        slider.forEach(container => container.append(cardsArray[i].generateCard()))
    }
}

// renderSliderCards(petsDataArray)

// let arr = [1, 2, 3, 4, 5, 6, 7, 8];
// let arrPrev = [2, 6, 8];

// const generateArr = (arr) => {
//     let arrPrev = [2, 6, 8];
//     let arrNew = [];
//     const rand = () => Math.floor(Math.random() * arr.length);
    
//     for (let i = 0; i < 3; i++) {        
//         let randCardnumber = rand();
//         if (!arrPrev.includes(randCardnumber) && !arrNew.includes(randCardnumber)) {
//             arrNew.push(randCardnumber)
//         } else {
//            i-- 
//         }
//     }
//     return arrNew
// }

// generateArr(arr)

const moveLeft = () => {
    SLIDER.classList.add(`transition-left`)
    BTN_SLIDER_LEFT.removeEventListener('click', moveLeft)
    BTN_SLIDER_RIGHT.removeEventListener('click', moveRight)
}

const moveRight = () => {
    SLIDER.classList.add(`transition-right`)
    BTN_SLIDER_LEFT.removeEventListener('click', moveLeft)
    BTN_SLIDER_RIGHT.removeEventListener('click', moveRight)
}

BTN_SLIDER_LEFT.addEventListener('click', moveLeft)
BTN_SLIDER_RIGHT.addEventListener('click', moveRight)

SLIDER.addEventListener('animationend', () => {
    SLIDER.classList.remove('transition-left');
    SLIDER.classList.remove('transition-right');
    BTN_SLIDER_LEFT.addEventListener('click', moveLeft);
    BTN_SLIDER_RIGHT.addEventListener('click', moveRight);   
})

