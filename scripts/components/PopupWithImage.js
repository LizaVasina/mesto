import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(name, link) {
    super.open();
    this._popup.querySelector('.pic-popup__image').src = link;
    this._popup.querySelector('.pic-popup__image').alt = name;
    this._popup.querySelector('.pic-popup__caption').textContent = name;
  }
}
