import './index.css';

import { Card } from '../scripts/components/Card.js';
import { FormValidation } from '../scripts/components/FormValidation.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithSubmit } from '../scripts/components/PopupWithSubmit.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api.js';

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

const userInfo = new UserInfo('.profile__name', '.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-18/',
  headers: {
    authorization: '692b85e5-e2ab-47c0-9643-687f3c4965d9',
    'Content-type': 'application/json',
  }
});

// получение информации о профиле с сервера
api.getProfileData()
  .then(data => {
  userInfo.setUserInfo(data.name, data.about);
  profileAvatar.src = data.avatar;
  })
  .catch(err => {
    console.log(err);
  });

// получение карточек с сервера
api.getInitialCards()
  .then(data => {
      const defaultCardList = new Section({
        items: data,
        renderer: (cardElement) => {
          const card = createCard(cardElement.name, cardElement.link, cardTemplate,
          () => {
            popupWithImage.open(card._name, card._link);
          });
          defaultCardList.addItem(card.render());
        }
      }, gridContainer);
      defaultCardList.render();
  })
  .catch(err => {
    console.log(err);
  });



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
    api.addCard(inputPicName.value, inputLink.value);
    const cardItem = createCard(inputPicName.value, inputLink.value, cardTemplate,
    () => {
      popupWithImage.open(cardItem._name, cardItem._link);
    });
    cardItem.showDeleteButton();
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
// const oldDefaultCardList = new Section({
//   items: initialCards,
//   renderer: (cardElement) => {
//     const card = createCard(cardElement.name, cardElement.link, cardTemplate,
//     () => {
//       popupWithImage.open(card._name, card._link);
//     });
//     oldDefaultCardList.addItem(card.render());
//   }
// }, gridContainer);
// oldDefaultCardList.render();


// работа с данными профиля

const popupInfoClass = new PopupWithForm({
  popupSelector: '.popup_type_info',
  handleFormSubmit: (values) => {
    userInfo.setUserInfo(values.name, values.description);
    api.updateProfileData(values.name, values.description);
    popupInfoClass.close();
  }
  });
popupInfoClass.setEventListeners();

const popupWithSubmit = new PopupWithSubmit({
  popupSelector: '.popup_type_submit',
  handleSubmitButton: () => {
    console.log('сабмит из сабмита');
    popupWithSubmit.close();
  }
});
popupWithSubmit.setEventListeners();


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






