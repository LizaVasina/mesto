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

// обработчик формы
function formSubmitHandler (evt) {
  evt.preventDefault();

  name.textContent = inputName.value;
  description.textContent = inputDescription.value;
  closePopup(popupInfo);
}

editButton.addEventListener('click', () => openPopup(popupInfo));
formInfo.addEventListener('submit', formSubmitHandler);
infoCloseButton.addEventListener('click', () => closePopup(popupInfo));
photosCloseButton.addEventListener('click', () => closePopup(popupPhotos));
addButton.addEventListener('click', () => openPopup(popupPhotos));
