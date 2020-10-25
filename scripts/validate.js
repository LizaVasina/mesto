
// показываем сообщение об ошибке
function showError(input, inputErrorClass) {
  const error = document.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  error.textContent = input.validationMessage;
}

// скрываем сообщение об ошибке
function hideError(input, inputErrorClass) {
  const error = document.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  error.textContent = '';
}

// смена активности кнопки
function toggleButtonState(buttonElement, inactiveButtonClass, isActive) {
  if (isActive) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  }
}

// проверка полей
function checkInputValidity(input, inputErrorClass) {
  if (!input.validity.valid) {
    showError(input, inputErrorClass);
  } else {
    hideError(input, inputErrorClass);
  }
}

// присваивание слушателей событий
function setEventListeners(formElement, buttonElement, inputSelector, inactiveButtonClass ,inputErrorClass) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  inputList.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(evt.target, inputErrorClass);

      const isValid = formElement.checkValidity();
      toggleButtonState(buttonElement, inactiveButtonClass, isValid);
    });
  });
}

function enableValidation({formSelector, inputSelector, buttonSelector, inactiveButtonClass, inputErrorClass}) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const buttonElement = form.querySelector(buttonSelector);

    setEventListeners(form, buttonElement, inputSelector, inactiveButtonClass ,inputErrorClass);
    toggleButtonState(buttonElement, inactiveButtonClass, form.checkValidity());
  });
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  buttonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__text_state_invalid',
});

// изначально делаем кнопку сохранить в попапе редактирования профиля активной
// поскольку в попап сразу заносятся корректные данные из разметки
const saveButton = document.querySelector('.popup__button_type_save');
saveButton.disabled = false;
saveButton.classList.remove('popup__button_invalid');

