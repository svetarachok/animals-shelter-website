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

console.log(petsDataArray)

const clearSlidesContainer = () => {
    const slidesContainer = document.querySelectorAll('.slider > .slider')
    slidesContainer.forEach(container => container.innerHTML = '');
    return slidesContainer
}

const generateCards = (data) => {
    let cards = [];
    data.forEach(card => {
        cards.push(new Card(card))
    });
    return cards;
}

let getRandom = () => Math.floor(Math.random()*8);

const renderSliderCards = (dataArray) => {
    let slider = clearSlidesContainer();
    let cardsArray = generateCards(dataArray);
    console.log(cardsArray)
    for(let i = 0; i < 3; i++) {
        slider.forEach(container => container.append(cardsArray[`${getRandom()}`].generateCard()))
    }
}

renderSliderCards(petsDataArray)





