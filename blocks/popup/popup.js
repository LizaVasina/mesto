//кнопки
let editButton = document.querySelector('.editButton');
let closeButton = document.querySelector('.closeButton');

// попап и форма в нем
let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__form');

// переменные имени профиля
let name = document.querySelector('.profile__name');
let inputName = document.querySelector('.popup__text_type_name');

// перменные описания профиля
let description = document.querySelector('.profile__description');
let inputDescription = document.querySelector('.popup__text_type_description');

// функция открытия попап окна
function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = name.textContent;
  inputDescription.value = description.textContent;
}

// функция закрытия попап окна
function closePopup() {
  popup.classList.remove('popup_opened');
}

// обработчик формы
function formSubmitHandler (evt) {
  evt.preventDefault();

  name.textContent = inputName.value;
  description.textContent = inputDescription.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
form.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', closePopup);
