import './index.css';

import { Card } from '../scripts/components/Card.js';
import { FormValidation } from '../scripts/components/FormValidation.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

import { initialCards,
        formConfig,
        formInfo,
        formPhotos,
        gridContainer,
        cardTemplate,
        editButton,
        addButton,
        inputPicName,
        inputLink } from '../scripts/utils/constants.js';



// валидация
const infoFormValidation = new FormValidation(formConfig, formInfo);
infoFormValidation.enableValidation();

const photosFormValidation = new FormValidation(formConfig, formPhotos);
photosFormValidation.enableValidation();

//функция создания карточки
function createCard(name, link, templateSelector, handleCardClick) {
  return new Card ({
    name: name,
    link: link,
    templateSelector: templateSelector,
    handleCardClick: handleCardClick
  });
};

const popupWithImage = new PopupWithImage('.pic-popup');
popupWithImage.setEventListeners();
// добавление карточек из попапа
const popupPhotoForm = new PopupWithForm({
  popupSelector: '.popup_type_photos',
  handleFormSubmit: () => {
    const cardItem = createCard(inputPicName.value, inputLink.value, cardTemplate,
    () => {
      popupWithImage.open(cardItem._name, cardItem._link);
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
    const card = createCard(cardElement.name, cardElement.link, cardTemplate,
    () => {
      popupWithImage.open(card._name, card._link);
    });
    defaultCardList.addItem(card.render());
  }
}, gridContainer);
defaultCardList.render();


// работа с данными профиля
const userInfo = new UserInfo('.profile__name', '.profile__description');
const popupInfoClass = new PopupWithForm({
  popupSelector: '.popup_type_info',
  handleFormSubmit: (values) => {
    userInfo.setUserInfo(values.name, values.description);
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
  formName.value = profileData.name;
  formDescription.value = profileData.description;
  infoFormValidation.enableValidation();
  });

// кнопка добавления фото
addButton.addEventListener('click', () => {
    popupPhotoForm.open();
    photosFormValidation.enableValidation();
});






