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

  let inputPicName = document.querySelector('.popup__text_type_pic-name');
  let inputLink = document.querySelector('.popup__text_type_link');

//кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const infoCloseButton = document.querySelector('.popup__close-button_place_info');
const photosCloseButton = document.querySelector('.popup__close-button_place_photos');

// попап и форма в нем
const popupInfo = document.querySelector('.popup_type_info');
const popupPhotos = document.querySelector('.popup_type_photos');
const formInfo = document.querySelector('.popup__form_type_info');
const formPhotos = document.querySelector('.popup__form_type_photos');
const popupPicture = document.querySelector('.pic-popup');

// переменные имени профиля
const name = document.querySelector('.profile__name');
const inputName = document.querySelector('.popup__text_type_name');

// перменные описания профиля
const description = document.querySelector('.profile__description');
const inputDescription = document.querySelector('.popup__text_type_description');


function openPopup(popupName) {
  popupName.classList.add('popup_opened');
}
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}

// функция открытия попап окна данных о профиле
function openPopupInfo() {
  popupInfo.classList.add('popup_opened');
  inputName.value = name.textContent;
  inputDescription.value = description.textContent;
}

const createCard = (cardDetails) => {
  // клонирование элемента карточки
  const cardElement = cardTemplate.cloneNode(true).content;

  const caption = cardElement.querySelector('.card__title');
  const picture = cardElement.querySelector('.card__picture');

  caption.textContent = cardDetails.name;
  picture.src = cardDetails.link;

  // лайк
  const likeElement = cardElement.querySelector('.card__like');
  likeElement.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  });

  // кнопка удалить
  const removeButton = cardElement.querySelector('.card__delete-button');
  removeButton.addEventListener('click', removeCard);

  const picPopupButton = cardElement.querySelector('.card__popup-button');
  picPopupButton.addEventListener('click', () => openPicPopup(picture.src, caption.textContent));

  // кнопка закрытия картинки
  let picPopupCloseButton = popupPicture.querySelector('.popup__close-button_place_picture');
  picPopupCloseButton.addEventListener('click', () => closePopup(popupPicture));

  return cardElement;
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  const cardItem = createCard({
    name: inputPicName.value,
    link: inputLink.value,
  });

  gridContainer.prepend(cardItem);
  closePopup(popupPhotos);
}

// функция открытия попапа картинки
function openPicPopup(picture, caption) {
  popupPicture.classList.add('popup_opened');

  const picPopupPicture = document.querySelector('.pic-popup__image');
  const picPopupCaption = document.querySelector('.pic-popup__caption');

  picPopupPicture.src = picture;
  picPopupCaption.textContent = caption;
}

// обработчик формы информации о профиле
function formInfoSubmitHandler (evt) {
  evt.preventDefault();

  name.textContent = inputName.value;
  description.textContent = inputDescription.value;
  closePopup(popupInfo);
}

//удаление карточки
function removeCard(evt) {
  evt.target.closest('.card').remove();
}

// обработчики
editButton.addEventListener('click', openPopupInfo);
formInfo.addEventListener('submit', formInfoSubmitHandler);
infoCloseButton.addEventListener('click', () => closePopup(popupInfo));
photosCloseButton.addEventListener('click', () => closePopup(popupPhotos));
addButton.addEventListener('click', () => openPopup(popupPhotos));
formPhotos.addEventListener('submit', handleCardFormSubmit);

// автоматическое добавление карточек
initialCards.forEach((data) => {
  const cardItem = createCard(data);
  gridContainer.append(cardItem);
})
