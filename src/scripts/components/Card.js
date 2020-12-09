export class Card {
  constructor({name, link, id, templateSelector, handleCardClick, handleDeleteButtonClick, handleLikeButtonClick}) {
    this._name = name;
    this._link = link;
    this.id = id;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;

    this._content = this._template.content.cloneNode(true);


  }

  delete () {
    this._deleteButton.closest('.card').remove();
  }

  setNumberOfLikes(amount) {
    this._likeNumber.textContent = amount;
  }

  toggleLike() {
    this.likeButton.classList.toggle('card__like_active');
  }

  render() {
    this._title = this._content.querySelector('.card__title');
    this._picture = this._content.querySelector('.card__picture');

    this._deleteButton = this._content.querySelector('.card__delete-button');
    this._popupButton = this._content.querySelector('.card__popup-button');
    this._likeNumber = this._content.querySelector('.card__like-number');
    this.likeButton = this._content.querySelector('.card__like');

    this._title.textContent = this._name;
    this._picture.alt = this._name;
    this._picture.src = this._link;

    this._deleteButton.addEventListener('click', this._handleDeleteButtonClick);

    this.likeButton.addEventListener('click', this._handleLikeButtonClick);

    this._popupButton.addEventListener('click', this._handleCardClick);

    return this._content;
  }
}

