export class Card {
  constructor({name, link, templateSelector, handleCardClick}) {
    this._name = name;
    this._link = link;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _delete (evt) {
    evt.target.closest('.card').remove();
  }

  _like (evt) {
    evt.target.classList.toggle('card__like_active');
  }



  render() {
    this._content = this._template.content.cloneNode(true);

    this._content.querySelector('.card__title').textContent = this._name;
    this._content.querySelector('.card__picture').alt = this._name;
    this._content.querySelector('.card__picture').src = this._link;

    this._content.querySelector('.card__delete-button').
      addEventListener('click', this._delete);

    this._content.querySelector('.card__like').
      addEventListener('click', this._like);

    this._content.querySelector('.card__popup-button').
      addEventListener('click', () => this._handleCardClick());

    return this._content;
  }
}

