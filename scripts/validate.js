
// показываем сообщение об ошибке
function showError(input) {
  const error = document.querySelector(`#${input.id}-error`);
  input.classList.add('popup__text_state_invalid');
  error.textContent = input.validationMessage;
}

// скрываем сообщение об ошибке
function hideError(input) {
  const error = document.querySelector(`#${input.id}-error`);
  input.classList.remove('popup__text_state_invalid');
  error.textContent = '';
}

// смена активности кнопки
function toggleButtonState(buttonElement, isActive) {
  if (isActive) {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_invalid');
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_invalid');
  }
}

// проверка полей
function checkInputValidity(input) {
  if (!input.validity.valid) {
    showError(input);
  } else {
    hideError(input);
  }
}

// присваивание слушателей событий
function setEventListeners(formElement, buttonElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));

  inputList.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(evt.target);

      const isValid = formElement.checkValidity();
      toggleButtonState(buttonElement, isValid);
    });
  });
}

function enableValidation({formSelector, buttonSelector}) {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const buttonElement = form.querySelector(buttonSelector);

    setEventListeners(form, buttonElement);
    toggleButtonState(buttonElement, form.checkValidity());
  });
}

enableValidation({
  formSelector: '.popup__form',
  buttonSelector: '.popup__button'
});

// изначально делаем кнопку сохранить в попапе редактирования профиля активной
// поскольку в попап сразу заносятся корректные данные из разметки
const saveButton = document.querySelector('.popup__button_type_save');
saveButton.disabled = false;
saveButton.classList.remove('popup__button_invalid');

