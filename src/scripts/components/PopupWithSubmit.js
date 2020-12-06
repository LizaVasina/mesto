import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
  constructor({popupSelector, handleSubmitButton}) {
    super(popupSelector);
    this._handleSubmitButton = handleSubmitButton;
    this._submitButton = this._popup.querySelector('.popup__button_type_submit-action');
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', this._handleSubmitButton);
  }
}
