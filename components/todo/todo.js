(function () {
	'use strict';

	class Todo {
		constructor ({elem}) {
			this.elem = elem;
			this._addElemItem = this._addElemItem.bind(this);

			this._initSumbitForm();
			this._initEvents();
		}

		_initSumbitForm () {
			this._inputName = document.querySelector('.todo__form_name');
			this._inputDescription = document.querySelector('.todo__form_description');
			this._submitButton = document.querySelector('.todo__form_submit_btn');
		}

		_initEvents () {
			this._inputName.addEventListener('click', this._clearValue);
			this._inputDescription.addEventListener('click', this._clearValue);
      this._submitButton.addEventListener('click', this._addElemItem);
    }

		_clearValue (event) {
			event.target.value = "";
		}

		_isNameInvalid () {
			return (!this._inputName.value ||
				this._inputName.value === this._inputName.getAttribute('value'));
		}

		_isDescriptionInvalid () {
			return (!this._inputDescription.value ||
				this._inputDescription.value === this._inputDescription.getAttribute('value'));
		}

		_refreshForm () {
			this._inputName.value = this._inputName.getAttribute('value');
			this._inputDescription.value = this._inputDescription.getAttribute('value');
			if (this._inputName.classList.contains("todo__form_error")) {
				this._inputName.classList.remove("todo__form_error");
			}
			if (this._inputDescription.classList.contains("todo__form_error")) {
				this._inputDescription.classList.remove("todo__form_error");
			}
		}

		_throwError () {
			if (this._isNameInvalid() && !this._inputName.classList.contains("todo__form_error")) {
				this._inputName.classList.add("todo__form_error");
			}
			if (this._isDescriptionInvalid() && !this._inputDescription.classList.contains("todo__form_error")) {
				this._inputDescription.classList.add("todo__form_error");
			}
		}

		_initElemItem () {
			let container = document.createElement('div');
			let title = document.createElement('h2');
			let description = document.createElement('p');
			container.className = "todo__list_element";
			title.className = "todo__list_element_title";
			description.className = "todo__list_element_description";
			title.textContent = this._inputName.value;
			description.textContent = this._inputDescription.value;
			container.appendChild(title);
			container.appendChild(description);
			this.elem.appendChild(container);
		}

		_addElemItem () {
			if (this._isNameInvalid() || this._isDescriptionInvalid()) {
				this._throwError();
				return;
			}
			this._initElemItem();
			this._refreshForm();
		}

	}

  window.Todo = Todo;
})();
