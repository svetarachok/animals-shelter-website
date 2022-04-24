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
        let modal = document.createElement('div');
        modal.className = 'modal_overlay';
        modal.setAttribute('data-modal-id', this.id)

        template += `div class="modal_wrapper"`

        template += `<button class="btn_modal"> <span class="material-icons btn-cross">close</span> </button>`

        this.img &&
        (template += `<img src=${this.img} alt="Pet image at modal window">`)

        template += `<div class="modal_content">`

        this.name &&
        (template += `<h3 class="modal-header">${this.name}</h3>`)

        (this.type && this.breed) &&
        (template += `<h4 class="modal-subheader">${this.type} - ${this.breed}</h4>`)

        this.description &&
        (template += `<p>${this.description}</p>`)

        template += `<ul class="modal_list">`

        this.age &&
        (template += `<li><b>Age:</b> ${this.age}</li>`)

        this.inoculations &&
        (template += `<li><b>Inoculations:</b> ${this.inoculations}</li>`)

        this.diseases &&
        (template += `<li><b>Diseases:</b> ${this.diseases}</li>`)

        this.parasites &&
        (template += `<li><b>Parasites:</b> ${this.parasites}</li>`)
        
        template += `</ul>`
        
        template += `</div>`
        template += `</div>`

        modal.innerHTML = template;
        return card
    }


}