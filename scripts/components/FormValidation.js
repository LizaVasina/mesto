export class FormValidation {
  constructor(formInfo, form) {
    this._form = form;
    this._formSelector = formInfo.formSelector;
    this._inputSelector = formInfo.inputSelector;
    this._buttonElement = this._form.querySelector(formInfo.buttonSelector);
    this._inactiveButtonState = formInfo.inactiveButtonState;
    this._inputErrorClass = formInfo.inputErrorClass;

  }

  _showError() {
    this._error = document.querySelector(`#${this._input.id}-error`);
    this._input.classList.add(this._inputErrorClass);
    this._error.textContent = this._input.validationMessage;
  }

  _hideError() {
    this._error = document.querySelector(`#${this._input.id}-error`);
    this._input.classList.remove(this._inputErrorClass);
    this._error.textContent = '';
  }

  _toggleButtonState(isActive) {
    if (isActive) {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonState);
    } else {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonState);
    }
  }

  _checkInputValidity () {
    if(!this._input.validity.valid) {
      this._showError();
    } else {
      this._hideError();
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._inputList.forEach((input) => {
      input.addEventListener('input', (evt) => {
        this._input = evt.target;
        this._checkInputValidity();

        this._isValid = this._form.checkValidity();
        this._toggleButtonState(this._isValid);
      })
    })
  }

  enableValidation() {

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
    this._toggleButtonState(this._form.checkValidity());
  }
}
