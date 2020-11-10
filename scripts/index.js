import { Card } from './Card.js';


// фото галерея
const gridContainer = document.querySelector('.photo-grid');

// массив карточек
const initialCards = [
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

// шаблон карточки
const cardTemplate = document.querySelector('#card-template');

//кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const infoCloseButton = document.querySelector('.popup__close-button_place_info');
const photosCloseButton = document.querySelector('.popup__close-button_place_photos');

// попапы профиля и добавления фото и формы в них
const popupInfo = document.querySelector('.popup_type_info');
const popupPhotos = document.querySelector('.popup_type_photos');
const formInfo = popupInfo.querySelector('.popup__form_type_info');
const formPhotos = popupPhotos.querySelector('.popup__form_type_photos');

// переменные формы добавления карточки
const inputPicName = popupPhotos.querySelector('.popup__text_type_pic-name');
const inputLink = popupPhotos.querySelector('.popup__text_type_link');

const profile = document.querySelector('.profile');
// переменные имени профиля
const name = profile.querySelector('.profile__name');
const inputName = popupInfo.querySelector('.popup__text_type_name');

// перменные описания профиля
const description = profile.querySelector('.profile__description');
const inputDescription = popupInfo.querySelector('.popup__text_type_description');

// элементы открытой картинки
const popupPicture = document.querySelector('.pic-popup');
const picPopupPicture = popupPicture.querySelector('.pic-popup__image');
const picPopupCaption = popupPicture.querySelector('.pic-popup__caption');
const picPopupCloseButton = popupPicture.querySelector('.popup__close-button_place_picture');

// закрытие попапа при нажатии на escape
const onEscapeClosePopup =  (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const openPopup = (popupName) => {
  popupName.classList.add('popup_opened');
  window.addEventListener('keydown', onEscapeClosePopup);
}

const closePopup = (popupName) => {
  popupName.classList.remove('popup_opened');
  window.removeEventListener('keydown', onEscapeClosePopup);
}

// функция открытия попап окна данных о профиле
function openPopupInfo() {
  openPopup(popupInfo);
  inputName.value = name.textContent;
  inputDescription.value = description.textContent;
}

// добавление карточки из попап окна
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  const cardItem = new Card (inputPicName.value, inputLink.value, cardTemplate);
  gridContainer.prepend(cardItem.render());

  closePopup(popupPhotos);
  formPhotos.reset();
}

// функция открытия попапа картинки
export function openPicPopup(picture, caption) {
  picPopupPicture.src = picture;
  picPopupPicture.alt = caption;
  picPopupCaption.textContent = caption;

  openPopup(popupPicture);
}

// автоматическое добавление карточек
initialCards.forEach((data) => {
  const cardItem = new Card (data.name, data.link, cardTemplate);
  gridContainer.append(cardItem.render());
})

// обработчик формы информации о профиле
function formInfoSubmitHandler (evt) {
  evt.preventDefault();

  name.textContent = inputName.value;
  description.textContent = inputDescription.value;
  closePopup(popupInfo);
}

// обработчики
picPopupCloseButton.addEventListener('click', () => closePopup(popupPicture));
editButton.addEventListener('click', openPopupInfo);
formInfo.addEventListener('submit', formInfoSubmitHandler);
infoCloseButton.addEventListener('click', () => closePopup(popupInfo));
photosCloseButton.addEventListener('click', () => closePopup(popupPhotos));
addButton.addEventListener('click', () => openPopup(popupPhotos));
formPhotos.addEventListener('submit', handleCardFormSubmit);


// закрытие попапов по нажатию на оверлей
const onClickPopupBackgroundListener = (popupName) => (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupName);
  }
}

popupInfo.addEventListener('click', onClickPopupBackgroundListener(popupInfo));
popupPhotos.addEventListener('click', onClickPopupBackgroundListener(popupPhotos));
popupPicture.addEventListener('click', onClickPopupBackgroundListener(popupPicture));
