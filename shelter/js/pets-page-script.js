import {Card} from './Card.js'
import {Modal} from './Modal.js'


// Pets Data
const getData = async (url) => await ( await fetch (url)).json();
const ALL_PETS_DATA = await getData('../../js/pets.json')

// Burget menu consts
const burgerMenu = document.querySelector('.burger-icon');
const menuLinks = document.querySelectorAll('.nav_item');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay')

// Pets Page render consts
const BTN_PAGE_LEFT = document.querySelector('.btn-page-left');
const BTN_PAGE_RIGHT = document.querySelector('.btn-page-right');
const BTN_PAGE_LEFT_END = document.querySelector('.btn-page-left-end')
const BTN_PAGE_RIGHT_END = document.querySelector('.btn-page-right-end');

const pageNumber = document.querySelector('.page_number');
const pageWithCards = document.querySelector('.cards_pets');

//Basic Matrix with IDs to get randoms
const arrBasic = [ 
    [1, 2, 3, 4, 5, 6, 7, 8],
    [1, 2, 3, 4, 5, 6, 7, 8],
    [1, 2, 3, 4, 5, 6, 7, 8],
    [1, 2, 3, 4, 5, 6, 7, 8],
    [1, 2, 3, 4, 5, 6, 7, 8],
    [1, 2, 3, 4, 5, 6, 7, 8],
];

//Page counter

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
menuLinks.forEach(item => { item.addEventListener('click', closeMenu)})
overlay.addEventListener('click', closeMenu)


/* Modal window*/

const getClickedModalData = (id) => {
    return ALL_PETS_DATA.find(pet => pet.id == id)
}

const renderModalAtPage = (pet) => {
    let modal = new Modal(pet);
    modal.renderModal()
    return modal
}

const cardsPage = document.querySelector('.cards_pets')

cardsPage.addEventListener('click', (e) => {
    if (e.target.closest('.card')) {
        let clickedCardID = e.target.closest('.card').getAttribute('data-id')
        let clickedModalData = getClickedModalData(clickedCardID)

        renderModalAtPage(clickedModalData)
    }
})

//* PAGINATION

// shuffle array of IDs for current page

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }


// make new Matrix with random IDs for each page (for each window reload)

const makeMatrix = (basicArray) => {
  let result;
  let arrRes = []
  
  for (let i=0; i<basicArray.length; i++) {
    result = shuffleArray(basicArray[i]);
    arrRes.push(result)
  }
 return arrRes
}

//initialize new Matrix from page start
let newRandomMatrix = makeMatrix(arrBasic);

//generate set of random cards for 1 page
const generateCardsForOnePage = (randomArray, cardsData) => {
    let cardsArray = [];

    randomArray.map(item => {
        let id = item;
        let card = cardsData.find(pet => pet.id == id);
        cardsArray.push(new Card(card)) 
    })
    return cardsArray
}

//clear page container
const clearPageContainer = (pageContainer) => {
    pageContainer.innerHTML = '';
    return pageContainer
}
let countPage = 1;
// render cards at one page
const renderCardsBundle = (pageContent, randomArray, cardsData) => {
    let clearPageContent = clearPageContainer(pageContent);
    let generatedCardsForPage = generateCardsForOnePage(randomArray, cardsData);
    generatedCardsForPage.forEach(card => clearPageContent.append(card.generateCard()))
    return clearPageContent
}

//initialize page render from page start
renderCardsBundle(pageWithCards, newRandomMatrix[0], ALL_PETS_DATA);
pageNumber.innerHTML = countPage;

const renderPages = () => {
    let randomMatrix = newRandomMatrix;
    pageNumber.innerHTML = countPage;   
    renderCardsBundle(pageWithCards, randomMatrix[countPage-1], ALL_PETS_DATA)
}

const handleRightBtns = () => {
    if (countPage > 1) {
        BTN_PAGE_LEFT.classList.remove('inactive_btn')
        BTN_PAGE_LEFT_END.classList.remove('inactive_btn')
        BTN_PAGE_LEFT.addEventListener('click', handleLeftBtns);
    }
    if (countPage === 6) {
        BTN_PAGE_RIGHT.classList.add('inactive_btn')
        BTN_PAGE_RIGHT_END.classList.add('inactive_btn')
        BTN_PAGE_RIGHT.removeEventListener('click', handleRightBtns);
     }  
     renderPages()  
}

const handleLeftBtns = () => {
    if (countPage === 1) {
        BTN_PAGE_LEFT.classList.add('inactive_btn')
        BTN_PAGE_LEFT_END.classList.add('inactive_btn')
        BTN_PAGE_LEFT.removeEventListener('click', handleLeftBtns);
     }  
     if (countPage < 6) {
        BTN_PAGE_RIGHT.classList.remove('inactive_btn')
        BTN_PAGE_RIGHT_END.classList.remove('inactive_btn')
        BTN_PAGE_RIGHT.addEventListener('click', handleRightBtns);
    }
    renderPages()
}

// add event listeners to page buttons
BTN_PAGE_RIGHT.addEventListener('click', () => {
    (countPage >= 1 && countPage <= 6 ) ? countPage += 1 : countPage = 1
})
BTN_PAGE_RIGHT.addEventListener('click', handleRightBtns);

BTN_PAGE_LEFT.addEventListener('click', () => {
    (countPage >= 1 && countPage <= 6 ) ? countPage -= 1 : countPage = 1
})
BTN_PAGE_LEFT.addEventListener('click', handleLeftBtns);

BTN_PAGE_RIGHT_END.addEventListener('click', () => {
    countPage = 6;
    handleRightBtns();
})

BTN_PAGE_LEFT_END.addEventListener('click', () => {
    countPage = 1;
    handleLeftBtns();
})

