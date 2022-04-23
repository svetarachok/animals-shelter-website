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
const ALL_PETS_DATA = await getData('../../js/pets.json')
const BTN_SLIDER_LEFT = document.querySelector('#btn-slider-left');
const BTN_SLIDER_RIGHT = document.querySelector('#btn-slider-right');
const SLIDER = document.querySelector('#slider');

console.log(ALL_PETS_DATA)

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

//* get array of visible cards id

const getVisibleCardsIDArray = (array) => {
    let result = []; 
    for (let i=0; i<array.length; i++) {
    result.push(+array[i].dataset.id)
    }
return result
}

//* generate cards bundle function

const generateCards = (data) => {    
    let cards = [];
    data.forEach(card => {
        cards.push(new Card(card))
    });
    return cards;
}

// * current Cards bundle
const cardsArray = generateCards(ALL_PETS_DATA);

// function getRandomCards - gets 3 random cards not equal to itself or visible slider cards

const getRandomCards = (cardsTotalAmount, cardsNumber) => {
    let result = [];
    let visibleCardsArrayId = getVisibleCardsIDArray(document.querySelectorAll('.slider-center > .card'))  
    const rand = () => Math.floor(Math.random() * cardsTotalAmount);
    for(let i = 0; i < cardsNumber; i++) {
        let randCardNumber = rand();
        let card = cardsArray[randCardNumber];
        if (!visibleCardsArrayId.includes(randCardNumber+1) && !result.includes(card)) {
            result.push(card)
        } else {
            i-- 
        }
    }
    return result   
}


const renderSliderCards = (data, position, cardsNumber) => {
    let sliderContainer = clearSlidesContainer(position);
    let newCards = getRandomCards(data.length, cardsNumber);
    newCards.forEach(card => sliderContainer.append(card.generateCard()))
    return sliderContainer
}


//* slider moves 

const moveLeft = () => {
    renderSliderCards(ALL_PETS_DATA, 'left', 3);
    SLIDER.classList.add(`transition-left`)
    BTN_SLIDER_LEFT.removeEventListener('click', moveLeft)
    BTN_SLIDER_RIGHT.removeEventListener('click', moveRight)
}

const moveRight = () => {
    renderSliderCards(ALL_PETS_DATA, 'right', 3);
    SLIDER.classList.add(`transition-right`)
    BTN_SLIDER_LEFT.removeEventListener('click', moveLeft)
    BTN_SLIDER_RIGHT.removeEventListener('click', moveRight)
}

BTN_SLIDER_LEFT.addEventListener('click', moveLeft)
BTN_SLIDER_RIGHT.addEventListener('click', moveRight)

SLIDER.addEventListener('animationend', (e) => {
    let leftSliderCards = document.querySelector('.slider-left').innerHTML;
    let rightSliderCards = document.querySelector('.slider-right').innerHTML;
    if (e.animationName === "move-left") {
        SLIDER.classList.remove('transition-left');
        document.querySelector('.slider-center').innerHTML = leftSliderCards;
    } else {
        SLIDER.classList.remove('transition-right');
        document.querySelector('.slider-center').innerHTML = rightSliderCards;
    }  
    
    BTN_SLIDER_LEFT.addEventListener('click', moveLeft);
    BTN_SLIDER_RIGHT.addEventListener('click', moveRight);   
})

