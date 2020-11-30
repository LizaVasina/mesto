// массив карточек
export const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// конфиг для валидации форм
export const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  buttonSelector: '.popup__button',
  inactiveButtonState: 'popup__button_invalid',
  inputErrorClass: 'popup__text_state_invalid',
}

// попапы профиля и добавления фото и формы в них
export const popupInfo = document.querySelector('.popup_type_info');
export const popupPhotos = document.querySelector('.popup_type_photos');
export const formInfo = popupInfo.querySelector('.popup__form_type_info');
export const formPhotos = popupPhotos.querySelector('.popup__form_type_photos');

// фото галерея
export const gridContainer = document.querySelector('.photo-grid');

// шаблон карточки
export const cardTemplate = document.querySelector('#card-template');

//кнопки
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

// переменные формы добавления карточки
export const inputPicName = popupPhotos.querySelector('.popup__text_type_pic-name');
export const inputLink = popupPhotos.querySelector('.popup__text_type_link');
