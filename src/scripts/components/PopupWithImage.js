import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._picture = this._popup.querySelector('.pic-popup__image');
    this._caption = this._popup.querySelector('.pic-popup__caption');
  }
  open(name, link) {
    super.open();
    this._picture.src = link;
    this._picture.alt = name;
    this._caption.textContent = name;
  }
}
