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
    this._title = this._content.querySelector('.card__title');
    this._picture = this._content.querySelector('.card__picture');
    this._deleteButton = this._content.querySelector('.card__delete-button');
    this._likeButton = this._content.querySelector('.card__like');
    this._popupButton = this._content.querySelector('.card__popup-button');

    this._title.textContent = this._name;
    this._picture.alt = this._name;
    this._picture.src = this._link;

    this._deleteButton.addEventListener('click', this._delete);

    this._likeButton.addEventListener('click', this._like);

    this._popupButton.addEventListener('click', () => this._handleCardClick());

    return this._content;
  }
}

