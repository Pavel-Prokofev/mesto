const showError = (listOfCurrentClasses, fieldsetElement, inputElement) => {
  const formError = fieldsetElement.querySelector(`.${inputElement.id}${listOfCurrentClasses.formErrorClassKey}`);
  inputElement.classList.add(`${listOfCurrentClasses.inputErrorClass}`);
  formError.textContent = inputElement.validationMessage;
};

const hidenError = (listOfCurrentClasses, fieldsetElement, inputElement) => {
  const formError = fieldsetElement.querySelector(`.${inputElement.id}${listOfCurrentClasses.formErrorClassKey}`);
  inputElement.classList.remove(`${listOfCurrentClasses.inputErrorClass}`);
  formError.textContent = '';
};

const checkValid = (listOfCurrentClasses, fieldsetElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(listOfCurrentClasses, fieldsetElement, inputElement);
  } else {
    hidenError(listOfCurrentClasses, fieldsetElement, inputElement);
  };
};



const hasInvalidInput = (inputList) => {
  return inputList.some((InputEl) => {
    return !InputEl.validity.valid;
  });
};

const switchButtonState = (listOfCurrentClasses, inputList, buttonSave) => {
  if (!hasInvalidInput(inputList)) {
    buttonSave.classList.remove(`${listOfCurrentClasses.inactiveButtonClass}`);
    buttonSave.removeAttribute('disabled');
  } else {
    buttonSave.classList.add(`${listOfCurrentClasses.inactiveButtonClass}`);
    buttonSave.setAttribute('disabled', true);
  };
};



const setEventListeners = (listOfCurrentClasses, fieldsetElement, formElement) => {
  const inputList = Array.from(fieldsetElement.querySelectorAll(`.${listOfCurrentClasses.inputClass}`));
  const buttonSave = formElement.querySelector(`.${listOfCurrentClasses.submitButtonClass}`);

  switchButtonState(listOfCurrentClasses, inputList, buttonSave);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValid(listOfCurrentClasses, fieldsetElement, inputElement);
      switchButtonState(listOfCurrentClasses, inputList, buttonSave);
    });
  });
};

const enableValidation = (listOfCurrentClasses) => {
  const formList = Array.from(document.querySelectorAll(`.${listOfCurrentClasses.formClass}`));

  formList.forEach((formElement) => {
    const fieldsetList = Array.from(formElement.querySelectorAll(`.${listOfCurrentClasses.fieldsetClass}`));

    fieldsetList.forEach((fieldsetElement) => {
      setEventListeners(listOfCurrentClasses, fieldsetElement, formElement);
    });
  });
};



enableValidation({
  formClass: 'popup__form',
  fieldsetClass: 'popup__personal-data',
  inputClass: 'popup__text-box',
  submitButtonClass: 'popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-box_type_error',
  formErrorClassKey: '-error'
}); 