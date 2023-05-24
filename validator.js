class validator {
	constructor(config) {

		this.elementsConfig = config;

		this.errors = {};

		this.generateErrorsObject();
		this.inputListener();

	}

	generateErrorsObject() {
		for(let field in this.elementsConfig) {
			this.errors[field] = [];
		}
	}

	inputListener() {
		let inputSelector = this.elementsConfig;

		for(let field in inputSelector) {
			
			let el = document.querySelector(`input[name="${field}"]`);

			el.addEventListener('input', this.validate.bind(this));


		}
	}

	validate(e) {
		let elFields = this.elementsConfig;
		let field = e.target;

		let fieldName = field.getAttribute('name');
		let fieldValue = field.value;

		this.errors[fieldName] = [];

		if (elFields[fieldName].required) {
			if(fieldValue === '') {
				this.errors[fieldName].push('Polje je prazno');
			}
		}
		if(elFields[fieldName].email) {
			if(!this.validateEmail(fieldValue)) {
                this.errors[fieldName].push('Neispravna email');
			}
		}
         if(fieldValue.length < elFields[fieldName].minlength || fieldValue.length > elFields[fieldName].maxlength) {
         	this.errors[fieldName].push('Polje mora imati min');
         }
         if(elFields[fieldName].matching) {
         	let matchingEl = document.querySelector(`input[name="${elFields[fieldName].matching}"]`);
         	if(fieldValue !== matchingEl.value) {
         		this.errors[fieldName].push('Ne ponvalja se');
         	}
         }

         if(this.errors[fieldName].length === 0) {
         	this.errors[fieldName] = [];
         	this.errors[elFields[fieldName].matching] = [];
         }

        this.populateErrors(this.errors);

	}

	populateErrors(errors) {
		for(const elem of document.querySelectorAll('ul')) {
			elem.remove();
		}
		for( let key of Object.key(errors)) {
			let parentEL = document.querySelector(`input[name="${key}"]`);
			let errorsel = document.createElement('ul');
			parentEL.appendChild(errorsel);

			errors[key].forEach(error => {
				let li = document.createElement('li');
				li.innerText = error;

				errorsel.appendChild(li);
			}
		}
	}

    


}