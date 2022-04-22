const burgerMenu = document.querySelector('.burger-icon');
const menuLinks = document.querySelectorAll('.nav_item');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay')

console.log(menuLinks)

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