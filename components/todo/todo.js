(function () {
	'use strict';

	class Todo {
		constructor ({elem}) {
			this.elem = elem;
			this._addElemItem = this._addElemItem.bind(this);
			this._removeElemItem = this._removeElemItem.bind(this);
			this._editElemItem = this._editElemItem.bind(this);
			this._saveChanges = this._saveChanges.bind(this);

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
			let control = document.createElement('div');
			let removeButton = document.createElement('button');
			let editButton = document.createElement('button');
			let markAsDone = document.createElement('span');

			removeButton.className = "todo__list_element_remove";
			removeButton.innerHTML = "remove";
      removeButton.addEventListener('click', this._removeElemItem);

			editButton.className = "todo__list_element_edit";
			editButton.innerHTML = "edit";
      editButton.addEventListener('click', this._editElemItem);

			markAsDone.className = "todo__list_element_mark";
      markAsDone.addEventListener('click', this._markAsDone);

			container.className = "todo__list_element";
			title.className = "todo__list_element_title";
			description.className = "todo__list_element_description";
			control.className = "todo__list_element_control";

			title.innerHTML = this._inputName.value;
			description.innerHTML = this._inputDescription.value;

			container.appendChild(title);
			container.appendChild(description);
			control.appendChild(removeButton);
			control.appendChild(editButton);
			container.appendChild(control);
			container.appendChild(markAsDone);
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

		_removeElemItem (event) {
			this.elem.removeChild(event.target.closest('.todo__list_element'));
		}

		_markAsDone (event) {
			event.target.closest('.todo__list_element').classList.toggle('done');
		}

		_editElemItem (event) {
			let parent = event.target.closest('.todo__list_element');
			let title = parent.childNodes[0];
			let description = parent.childNodes[1];
			let editTitle = document.createElement('input');
			let editDescription = document.createElement('input');
			let saveButton = document.createElement('button');

			editTitle.className = 'todo__list_element_title_edit';
			editTitle.type = 'text';
			editTitle.value = title.innerHTML;

			editDescription.className = 'todo__list_element_description_edit';
			editDescription.type = 'text';
			editDescription.value = description.innerHTML;

			saveButton.className = 'todo__list_element_save_btn';
			saveButton.innerHTML = "save";
			saveButton.addEventListener('click', this._saveChanges);

			this._title = parent.replaceChild(editTitle, title);
			this._description = parent.replaceChild(editDescription, description);
			this._editButton = parent.childNodes[2].replaceChild(saveButton, event.target);
		}

		_saveChanges (event) {
			let parent = event.target.closest('.todo__list_element');
			let title = parent.childNodes[0];
			let description = parent.childNodes[1];

			this._title.innerHTML = title.value;
			this._description.innerHTML = description.value;

			parent.replaceChild(this._title, title);
			parent.replaceChild(this._description, description);

			parent.childNodes[2].replaceChild(this._editButton, event.target);
		}

	}

  window.Todo = Todo;
})();
