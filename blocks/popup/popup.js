let editButton = document.querySelector('.editButton');
let saveButton = document.querySelector('.saveButton');
let closeButton = document.querySelector('.closeButton');
let popup = document.querySelector('.popup');

/* Переменные имени профиля */
let name = document.querySelector('.profile__name');
let inputName = document.querySelector('.popup__text_type_name');

/* Переменные описания профиля */
let description = document.querySelector('.profile__description');
let inputDescription = document.querySelector('.popup__text_type_description');

/* Функция открытия попап окна */
function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = name.textContent;
  inputDescription.value = description.textContent;
}

/* Функция закрытия попап окна */
function closePopup() {
  popup.classList.remove('popup_opened');
}

console.log(name);
console.log(inputName);
console.log(description);
console.log(inputDescription);

function formSubmitHandler (evt) {
  evt.preventDefault();

  name.textContent = inputName.value;
  description.textContent = inputDescription.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
saveButton.addEventListener('click', formSubmitHandler);
closeButton.addEventListener('click', closePopup);
