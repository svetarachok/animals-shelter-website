import {Card} from './Card.js'
import {Modal} from './Modal.js'


/* Burger menu consts*/
const burgerMenu = document.querySelector('.burger-icon');
const menuLinks = document.querySelectorAll('.nav_item');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay')

/*Slider consts*/
const getData = async (url) => await ( await fetch (url)).json();
const ALL_PETS_DATA = await getData('../../js/pets.json')
const BTN_SLIDER_LEFT = document.querySelector('#btn-slider-left');
const BTN_SLIDER_RIGHT = document.querySelector('#btn-slider-right');
const SLIDER = document.querySelector('#slider');



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

burgerMenu.addEventListener('click', function() {burgerMenu.classList.contains('clicked') ? closeMenu() : openMenu()})

menuLinks.forEach(item => {item.addEventListener('click', closeMenu)})

overlay.addEventListener('click', closeMenu)



//Main page slider

const clearSlidesContainer = (position) => {
    const slidesContainer = document.querySelector(`.slider-${position}`)
    slidesContainer.innerHTML = '';
    return slidesContainer
}

//* get array of visible cards id

const getVisibleCardsIDArray = (array) => {
    let result = []; 
    array.forEach(card => result.push(+card.getAttribute('data-id')));
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

const getRandomCards = (cardsTotalNumber, cardsRequiredNumber) => {
    let result = [];
    let visibleCardsIDArray = getVisibleCardsIDArray(document.querySelectorAll('.slider-center > .card'))  
    const rand = () => Math.floor(Math.random() * cardsTotalNumber);
    for(let i = 0; i < cardsRequiredNumber; i++) {
        let randCardNumber = rand();
        let card = cardsArray[randCardNumber];
        if (!visibleCardsIDArray.includes(randCardNumber+1) && !result.includes(card)) {
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


// slider moves 

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

// Modal window

const getClickedModalData = (id) => {
    return ALL_PETS_DATA.find(pet => pet.id == id)
}

const renderModalAtPage = (pet) => {
    let modal = new Modal(pet);
    modal.renderModal()
    return modal
}

document.querySelector('.slider-center').addEventListener('click', (e) => {
    if (e.target.closest('.card')) {
        let clickedCardID = e.target.closest('.card').getAttribute('data-id')
        let clickedModalData = getClickedModalData(clickedCardID)

        renderModalAtPage(clickedModalData)
    }
})

