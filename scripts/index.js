import { Card } from './components/Card.js';
import { FormValidation } from './components/FormValidation.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';

import { initialCards,
        formConfig,
        formInfo,
        formPhotos,
        gridContainer,
        cardTemplate,
        editButton,
        addButton,
        inputPicName,
        inputLink } from './utils/constants.js';



// валидация
const infoFormValidation = new FormValidation(formConfig, formInfo);
infoFormValidation.enableValidation();

const photosFormValidation = new FormValidation(formConfig, formPhotos);
photosFormValidation.enableValidation();


// добавление карточек из попапа
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


// работа с данными профиля
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
// кнопка редактирования профиля
editButton.addEventListener('click', () => {
  popupInfoClass.open();
  const profileData = userInfo.getUserInfo();
  const formName = popupInfoClass._form.querySelector('.popup__text_type_name');
  const formDescription = popupInfoClass._form.querySelector('.popup__text_type_description');
  formName.value = profileData.Name;
  formDescription.value = profileData.Description;
  infoFormValidation.enableValidation();
  });

// кнопка добавления фото
addButton.addEventListener('click', () => {
    popupPhotoForm.open();
    photosFormValidation.enableValidation();
});






