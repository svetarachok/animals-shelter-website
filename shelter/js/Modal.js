export class Modal {
    constructor ({id, name, img, type, breed, description, age, inoculations, diseases, parasites}) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.type = type;
        this.breed = breed;
        this.description = description;
        this.age = age;
        this.inoculations = inoculations;
        this.diseases = diseases;
        this.parasites = parasites;
    }

    generateModal () {
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