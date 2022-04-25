export class Card {
    constructor({id, name, img}) {
        this.id = id;
        this.name = name;
        this.img = img;
    }

    // Card generator
    generateCard () {
        let template = '';
        let card = document.createElement('div');
        card.className = 'card slider-item';
        card.setAttribute('data-id', this.id)

        this.img &&
        (template += `<img src=${this.img} alt="Pet image">`)

        this.name &&
        (template += `<p class="card_name">${this.name}</p>`)

        template += `<button class="btn secondary_btn card-btn">Learn more</button>`

        card.innerHTML = template;
        return card
    }

}