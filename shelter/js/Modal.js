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

        this.modalContent = '';
        this.modalBtn = '';
        this.overlay = '';
    }

    generateModalContent () {
        let template = '';
        let modal = document.createElement('div');
        modal.className = 'modal';

        this.img &&
        (template += `<img class="modal_img" src=${this.img} alt="Pet image at modal window">`)

        template += `<div class="modal_content">`

        this.name &&
        (template += `<h3 class="modal-header">${this.name}</h3>`)

        this.type && this.breed &&
        (template += `<h4 class="modal-subheader">${this.type} - ${this.breed}</h4>`)

        this.description &&
        (template += `<h5>${this.description}</h5>`)

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

        modal.innerHTML = template;
        return modal
    }

    

    buildModal(content) {
        this.overlay = this.createDomNode(this.overlay, 'div', 'modal_overlay');
        this.modalWrapper = this.createDomNode(this.modalWrapper, 'div', 'modal_wrapper');

        this.modalBtn = document.createElement('div');
        this.modalBtn.classList.add('btn_modal');
        this.modalBtn.innerHTML = '<span class="material-icons cross-btn">close</span>';


        this.setModalContent(content)
        
        this.appendModalElements();

        this.bindEvents();

        this.openModal();
    }

    setModalContent(content) {
        if(typeof content === 'string') {
            this.modalWrapper.innerHTML = content;
        } else {
            this.modalWrapper.innerHTML = '';
            this.modalWrapper.append(content);
        }
    }

    appendModalElements() {
        this.modalWrapper.prepend(this.modalBtn);
        this.overlay.append(this.modalWrapper);
    }

    bindEvents() {
        this.modalBtn.addEventListener('click', this.closeModal);
        this.overlay.addEventListener('click', this.closeModal);
    }

    openModal() {
        document.body.append(this.overlay);
        document.body.classList.add('hidden-overflow')
    }

    closeModal(e) {
        let classes = e.target.classList;
        if(classes.contains('modal_overlay') || classes.contains('btn_modal') || classes.contains('cross-btn')) {
            document.querySelector('.modal_overlay').remove();
            document.body.classList.remove('hidden-overflow')
        }
    }

    renderModal() {
        let content = this.generateModalContent();
        this.buildModal(content);
    }

    createDomNode (node, element, ...classes) {
        node = document.createElement(element);
        node.classList.add(...classes);
        return node
    }


}