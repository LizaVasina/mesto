import { Card } from './components/Card.js';
import { FormValidation } from './components/FormValidation.js';
import { initialCards } from './utils/constants.js';
import { Section } from './components/Section.js';
import { Popup } from './components/Popup.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';



// фото галерея
const gridContainer = document.querySelector('.photo-grid');

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

const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  buttonSelector: '.popup__button',
  inactiveButtonState: 'popup__button_invalid',
  inputErrorClass: 'popup__text_state_invalid',
}


const infoFormValidation = new FormValidation(formConfig, formInfo);
infoFormValidation.enableValidation();

const photosFormValidation = new FormValidation(formConfig, formPhotos);
photosFormValidation.enableValidation();

// закрытие попапа при нажатии на escape
// const onEscapeClosePopup =  (evt) => {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }

// const openPopup = (popupName) => {
//   popupName.classList.add('popup_opened');
//   window.addEventListener('keydown', onEscapeClosePopup);
// }

// const closePopup = (popupName) => {
//   popupName.classList.remove('popup_opened');
//   window.removeEventListener('keydown', onEscapeClosePopup);
//   console.log('закрылся из файла');
// }

// функция открытия попап окна данных о профиле
function openPopupInfo() {
  openPopup(popupInfo);
  inputName.value = name.textContent;
  inputDescription.value = description.textContent;
  infoFormValidation.enableValidation();
}

// добавление карточки из попап окна
// const handleCardFormSubmit = (evt) => {
//   evt.preventDefault();

//   const cardItem = new Card (inputPicName.value, inputLink.value, cardTemplate);
//   gridContainer.prepend(cardItem.render());

//   closePopup(popupPhotos);
//   formPhotos.reset();
// }
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  const cardItem = new Card ({
    name: inputPicName.value,
    link: inputLink.value,
    templateSelector: cardTemplate,
    handleCardClick: () => {
      const popupWithImage = new PopupWithImage('.pic-popup');
      popupWithImage.setEventListeners();
      popupWithImage.open(cardItem._name, cardItem._link);
    }
  });
  const newCardAdding = new Section({
    items: [cardItem],
    renderer: () => {
      newCardAdding.addItem(cardItem.render());
    }
  }, gridContainer);
  newCardAdding.render();

  popupPhotoForm.close();
  formPhotos.reset();
}

const popupPhotoForm = new PopupWithForm({
  popupSelector: '.popup_type_photos',
  handleFormSubmit: () => {
    const cardItem = new Card ({
      name: inputPicName.value,
      link: inputLink.value,
      templateSelector: cardTemplate,
      handleCardClick: () => {
        const popupWithImage = new PopupWithImage('.pic-popup');
        popupWithImage.setEventListeners();
        popupWithImage.open(cardItem._name, cardItem._link);
      }
    });
    const newCardAdding = new Section({
      items: [cardItem],
      renderer: () => {
        newCardAdding.addItem(cardItem.render());
      }
    }, gridContainer);
    newCardAdding.render();

    popupPhotoForm.close();
    formPhotos.reset();
  }
});
popupPhotoForm.setEventListeners();
//formPhotos.addEventListener('submit', handleCardFormSubmit);



// функция открытия попапа картинки
export function openPicPopup(picture, caption) {
  picPopupPicture.src = picture;
  picPopupPicture.alt = caption;
  picPopupCaption.textContent = caption;

  openPopup(popupPicture);
}

// автоматическое добавление карточек
const defaultCardList = new Section({
  items: initialCards,
  renderer: (cardElement) => {
    const card = new Card ({
      name: cardElement.name,
      link: cardElement.link,
      templateSelector: cardTemplate,
      handleCardClick: () => {
        const popupWithImage = new PopupWithImage('.pic-popup');
        popupWithImage.setEventListeners();
        popupWithImage.open(card._name, card._link);
      }
    });
    defaultCardList._container.append(card.render());
  }
}, gridContainer);
defaultCardList.render();

// initialCards.forEach((data) => {
//   const cardItem = new Card (data.name, data.link, cardTemplate);
//   gridContainer.append(cardItem.render());
// })

// обработчик формы информации о профиле
// const formInfoSubmitHandler = (evt) => {
//   evt.preventDefault();

//   name.textContent = inputName.value;
//   description.textContent = inputDescription.value;
//   closePopup(popupInfo);
// }

const userInfo = new UserInfo('.profile__name', '.profile__description');
const popupInfoClass = new PopupWithForm({
  popupSelector: '.popup_type_info',
  handleFormSubmit: () => {
    popupInfoClass._getInputValues();
    userInfo.setUserInfo(popupInfoClass._formValues.Name, popupInfoClass._formValues.Description);
    popupInfoClass.close();
  }
  });
popupInfoClass.setEventListeners();



// обработчики
//picPopupCloseButton.addEventListener('click', () => closePopup(popupPicture));
editButton.addEventListener('click', () => {
  popupInfoClass.open();
  const profileData = userInfo.getUserInfo();
  const formName = popupInfoClass._form.querySelector('.popup__text_type_name');
  const formDescription = popupInfoClass._form.querySelector('.popup__text_type_description');
  formName.value = profileData.Name;
  formDescription.value = profileData.Description;
  infoFormValidation.enableValidation();
  });
// formInfo.addEventListener('submit', () => {
//   //formInfoSubmitHandler();
//   //popupPhotoForm.close();
// });
//infoCloseButton.addEventListener('click', () => closePopup(popupInfo));
photosCloseButton.addEventListener('click', () => popupPhotoForm.close());
addButton.addEventListener('click', () => {
    //openPopup(popupPhotos);
    popupPhotoForm.open();
    photosFormValidation.enableValidation();
});



// закрытие попапов по нажатию на оверлей
// const onClickPopupBackgroundListener = (popupName) => (evt) => {
//   if (evt.target === evt.currentTarget) {
//     closePopup(popupName);
//   }
// }

//popupInfo.addEventListener('click', onClickPopupBackgroundListener(popupInfo));
//popupPhotos.addEventListener('click', onClickPopupBackgroundListener(popupPhotos));
//popupPicture.addEventListener('click', onClickPopupBackgroundListener(popupPicture));




