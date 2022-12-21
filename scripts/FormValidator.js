class FormValidator {
  constructor(listOfCurrentClasses, popup) {
    this._formClass = listOfCurrentClasses.formClass;
    this._fieldsetClass = listOfCurrentClasses.fieldsetClass;
    this._inputClass = listOfCurrentClasses.inputClass;
    this._submitButtonClass = listOfCurrentClasses.submitButtonClass;
    this._inactiveButtonClass = listOfCurrentClasses.inactiveButtonClass;
    this._inputErrorClass = listOfCurrentClasses.inputErrorClass;
    this._formErrorClassKey = listOfCurrentClasses.formErrorClassKey;
    this._popup = popup;
  };



  _showError(fieldsetElement, inputElement) {
    const formError = fieldsetElement.querySelector(`.${inputElement.id}${this._formErrorClassKey}`);
    inputElement.classList.add(`${this._inputErrorClass}`);
    formError.textContent = inputElement.validationMessage;
  };
  
  _hidenError(fieldsetElement, inputElement) {
    const formError = fieldsetElement.querySelector(`.${inputElement.id}${this._formErrorClassKey}`);
    inputElement.classList.remove(`${this._inputErrorClass}`);
    formError.textContent = '';
  };
  
  _checkValid(fieldsetElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(fieldsetElement, inputElement);
    } else {
      this._hidenError(fieldsetElement, inputElement);
    };
  };



  _hasInvalidInput(inputList) {
    return inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  };

  _switchButtonState(inputList, buttonSave) {
    if (!this._hasInvalidInput(inputList)) {
      buttonSave.classList.remove(`${this._inactiveButtonClass}`);
      buttonSave.removeAttribute('disabled');
    } else {
      buttonSave.classList.add(`${this._inactiveButtonClass}`);
      buttonSave.setAttribute('disabled', true);
    };
  };



  _setEventListeners(fieldsetElement, formElement) {
    const inputList = Array.from(fieldsetElement.querySelectorAll(`.${this._inputClass}`));
    const buttonSave = formElement.querySelector(`.${this._submitButtonClass}`);
  
    this._switchButtonState(inputList, buttonSave);
  
    inputList.forEach((inputElement) => {

      this._hidenError(fieldsetElement, inputElement);

      inputElement.addEventListener('input', () => {
        this._checkValid(fieldsetElement, inputElement);
        this._switchButtonState(inputList, buttonSave);
      });
    });
  };



  enableValidation() {
    const formList = Array.from(this._popup.querySelectorAll(`.${this._formClass}`));

  formList.forEach((formElement) => {

    const fieldsetList = Array.from(formElement.querySelectorAll(`.${this._fieldsetClass}`));

    fieldsetList.forEach((fieldsetElement) => {
      this._setEventListeners(fieldsetElement, formElement);
    });
  });
  };

};

export default FormValidator;