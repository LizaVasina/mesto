import './index.css';

import { Card } from '../scripts/components/Card.js';
import { FormValidation } from '../scripts/components/FormValidation.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithSubmit } from '../scripts/components/PopupWithSubmit.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/utils/Api.js';

import {formConfig,
        formInfo,
        formPhotos,
        formAvatar,
        profileAvatar,
        gridContainer,
        cardTemplate,
        editButton,
        addButton,
        editAvatarButton,
        inputPicName,
        inputLink } from '../scripts/utils/constants.js';

const userInfo = new UserInfo('.profile__name', '.profile__description');

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-18/',
  headers: {
    authorization: '692b85e5-e2ab-47c0-9643-687f3c4965d9',
    'Content-type': 'application/json',
  }
});

function renderLoading(isLoading, buttonSelector, defaultMessage) {
  if (isLoading) {
    document.querySelector(buttonSelector).textContent = 'Сохранение...';
  } else {
    document.querySelector(buttonSelector).textContent = defaultMessage;
  }
}

// проверка на наличие лайка
function hasMyLike(myId) {
  return like => like._id === myId;
}

// профиль и карточки с сервера
Promise.all([
  api.getProfileData(),
  api.getInitialCards(),
])
  .then(([userData, initialCards]) => {
    // получение информации о профиле с сервера
    userInfo.setUserInfo(userData.name, userData.about);
    profileAvatar.src = userData.avatar;
    userInfo.setUserId(userData._id);

    // получение карточек с сервера
    const defaultCardList = new Section({
      items: initialCards,
      renderer: (cardElement) => {
        const card = createCard(cardElement.name, cardElement.link, cardElement._id, cardTemplate);
        if (cardElement.likes.some(hasMyLike(userInfo.getUserId()))) {
          card.render().querySelector('.card__like').classList.add('card__like_active');
        }
        card.render().querySelector('.card__like-number').textContent = cardElement.likes.length;
        if (userInfo.getUserId() == cardElement.owner._id) {
          card.render().querySelector('.card__delete-button').style.display = "block";
        };
        defaultCardList.addItem(card.render());
      }
    }, gridContainer);
    defaultCardList.render();
  })
  .catch((err) => {
    console.log(err);
  });


// валидация
const infoFormValidation = new FormValidation(formConfig, formInfo);
infoFormValidation.enableValidation();

const photosFormValidation = new FormValidation(formConfig, formPhotos);
photosFormValidation.enableValidation();

const avatarFormValidation = new FormValidation(formConfig, formAvatar);
avatarFormValidation.enableValidation();

//функция создания карточки
function createCard(name, link, id, templateSelector) {
  const card = new Card ({
    name,
    link,
    id,
    templateSelector,
    handleCardClick: () => {
      popupWithImage.open(name, link);
    },
    handleDeleteButtonClick: () => {
      popupWithSubmit.open(card);
    },
    handleLikeButtonClick: () => {
      if (card.likeButton.classList.contains('card__like_active')) {
        api.removeLike(card.id)
          .then(res => {
            card.toggleLike();
            card.setNumberOfLikes(res.likes.length);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        api.setLike(card.id)
          .then(res => {
            card.toggleLike();
            card.setNumberOfLikes(res.likes.length);
          })
          .catch(err => {
            console.log(err);
          });
      };
    }
  });
  return card;
};

const popupWithImage = new PopupWithImage('.pic-popup');
popupWithImage.setEventListeners();
// добавление карточек из попапа
const popupPhotoForm = new PopupWithForm({
  popupSelector: '.popup_type_photos',
  handleFormSubmit: () => {
    renderLoading(true, '.popup__button_type_create', '');
    api.addCard(inputPicName.value, inputLink.value)
      .then(res => {
        const cardItem = createCard(inputPicName.value, inputLink.value, res._id, cardTemplate);
        cardItem.render().querySelector('.card__delete-button').style.display = "block";
        const newCardAdding = new Section({
          items: [cardItem],
          renderer: () => {
            newCardAdding.addItem(cardItem.render());
          }
        }, gridContainer);
        newCardAdding.render();

        popupPhotoForm.close();
        formPhotos.reset();
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => renderLoading(false, '.popup__button_type_create', 'Создать'));
      }
});
popupPhotoForm.setEventListeners();

// работа с данными профиля
const popupInfoClass = new PopupWithForm({
  popupSelector: '.popup_type_info',
  handleFormSubmit: (values) => {
    renderLoading(true, '.popup__button_type_save', '')
    api.updateProfileData(values.name, values.description)
      .then(() => {
        userInfo.setUserInfo(values.name, values.description);
        popupInfoClass.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => renderLoading(false, '.popup__button_type_save', 'Сохранить'));

  }
  });
popupInfoClass.setEventListeners();

// попап подтверждения действия
const popupWithSubmit = new PopupWithSubmit({
  popupSelector: '.popup_type_submit',
  handleSubmitButton: (card) => {
    api.deleteCard(card.id)
      .then(() => {
        card.delete();
        popupWithSubmit.close();
      })
      .catch(err => {
        console.log(err);
      });
  }
});
popupWithSubmit.setEventListeners();

// попап обновления аватарки
const popupAvatarClass = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  handleFormSubmit: (value) => {
    renderLoading(true, '.popup__button_type_update', '')
    api.updateProfileAvatar(value.link)
      .then(() => {
        profileAvatar.src = value.link;
        popupAvatarClass.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => renderLoading(false, '.popup__button_type_update', 'Сохранить'));
  }
});
popupAvatarClass.setEventListeners();

// обработчики
// кнопка редактирования аватара
editAvatarButton.addEventListener('click', () => {
  popupAvatarClass.open();
  avatarFormValidation.enableValidation();
})

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






