export class Card {
  constructor({name, link, id, templateSelector, handleCardClick, handleDeleteButtonClick}) {
    this._name = name;
    this._link = link;
    this.id = id;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick.bind(this);

    this._content = this._template.content.cloneNode(true);

  }

  delete () {
    this._deleteButton.closest('.card').remove();
  }

  _like (evt) {
    evt.target.classList.toggle('card__like_active');
  }

  render() {
    this._title = this._content.querySelector('.card__title');
    this._picture = this._content.querySelector('.card__picture');

    this._likeButton = this._content.querySelector('.card__like');
    this._deleteButton = this._content.querySelector('.card__delete-button');
    this._popupButton = this._content.querySelector('.card__popup-button');

    this._likeNumber = this._content.querySelector('.card__like-number');

    this._title.textContent = this._name;
    this._picture.alt = this._name;
    this._picture.src = this._link;

    this._deleteButton.addEventListener('click', this._handleDeleteButtonClick);

    this._likeButton.addEventListener('click', this._like);

    this._popupButton.addEventListener('click', () => this._handleCardClick());

    return this._content;
  }
}

