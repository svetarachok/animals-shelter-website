const burgerMenu = document.querySelector('.burger-icon');
const menuLinks = document.querySelectorAll('.nav_item');
const menu = document.querySelector('.menu');

console.log(menuLinks)

let openMenu = () => {
    burgerMenu.classList.add('clicked');
    menu.classList.add('opened');

}

let closeMenu = () => {
    burgerMenu.classList.remove('clicked');
    menu.classList.remove('opened');
}

burgerMenu.addEventListener('click', function() {
    burgerMenu.classList.contains('clicked') ? closeMenu() : openMenu()
})

menuLinks.forEach(item => {
        item.addEventListener('click', closeMenu)
})

