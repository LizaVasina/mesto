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

// автоматическое добавление карточек из массива
initialCards.forEach(function(item) {
  // клонирование элемента карточки
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__picture').src = item.link;

  // лайк
  const likeElement = cardElement.querySelector('.card__like');
  likeElement.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  });

  // кнопка удалить
  const removeButton = cardElement.querySelector('.card__delete-button');
  removeButton.addEventListener('click', removeCard);

  //работа с переменными для попапа картинки
  const picture = cardElement.querySelector('.card__picture');
  const caption = cardElement.querySelector('.card__title');

  const picPopupButton = cardElement.querySelector('.card__popup-button');
  picPopupButton.addEventListener('click', () => openPicPopup(picture, caption));

  // кнопка закрытия картинки
  const picPopupCloseButton = document.querySelector('.popup__close-button_place_picture');
  picPopupCloseButton.addEventListener('click', () => closePopup(popupPicture));


  gridContainer.append(cardElement);
});

// функция открытия попапа картинки
function openPicPopup(picture, caption) {
  popupPicture.classList.add('popup_opened');

  const picPopupPicture = document.querySelector('.pic-popup__image');
  const picPopupCaption = document.querySelector('.pic-popup__caption');

  picPopupPicture.src = picture.src;
  picPopupCaption.textContent = caption.textContent;
}

//кнопки
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let infoCloseButton = document.querySelector('.popup__close-button_place_info');
let photosCloseButton = document.querySelector('.popup__close-button_place_photos');

// попап и форма в нем
let popupInfo = document.querySelector('.popup_type_info');
let popupPhotos = document.querySelector('.popup_type_photos');
let formInfo = document.querySelector('.popup__form_type_info');
let formPhotos = document.querySelector('.popup__form_type_photos');
let popupPicture = document.querySelector('.pic-popup');

// переменные имени профиля
let name = document.querySelector('.profile__name');
let inputName = document.querySelector('.popup__text_type_name');

// перменные описания профиля
let description = document.querySelector('.profile__description');
let inputDescription = document.querySelector('.popup__text_type_description');


// функция открытия попап окна
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  if (popupName == popupInfo) {
    inputName.value = name.textContent;
    inputDescription.value = description.textContent;
  }
}

// функция закрытия попап окна
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
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

// обработчик формы добавления карточки
function formPhotosSubmitHandler (evt) {
  evt.preventDefault();
  console.log('пипяо');

  let inputPicName = document.querySelector('.popup__text_type_pic-name');
  let inputLink = document.querySelector('.popup__text_type_link');

  // клонирование элемента карточки
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = inputPicName.value;
  cardElement.querySelector('.card__picture').src = inputLink.value;

  // лайк
  const likeElement = cardElement.querySelector('.card__like');
  likeElement.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  });

  // кнопка удалить
  const removeButton = cardElement.querySelector('.card__delete-button');
  removeButton.addEventListener('click', removeCard);

  // работа с переменными для попапа картинки
  const picture = cardElement.querySelector('.card__picture');
  const caption = cardElement.querySelector('.card__title');

  const picPopupButton = cardElement.querySelector('.card__popup-button');
  picPopupButton.addEventListener('click', () => openPicPopup(picture, caption));

  // кнопка закрытия попапа картинки
  const picPopupCloseButton = document.querySelector('.popup__close-button_place_picture');
  picPopupCloseButton.addEventListener('click', () => closePopup(popupPicture));

  gridContainer.prepend(cardElement);
  closePopup(popupPhotos);
}

editButton.addEventListener('click', () => openPopup(popupInfo));
formInfo.addEventListener('submit', formInfoSubmitHandler);
infoCloseButton.addEventListener('click', () => closePopup(popupInfo));
photosCloseButton.addEventListener('click', () => closePopup(popupPhotos));
addButton.addEventListener('click', () => openPopup(popupPhotos));
formPhotos.addEventListener('submit', formPhotosSubmitHandler);
