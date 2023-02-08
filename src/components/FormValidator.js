class FormValidator {
  constructor(listOfCurrentClasses, form) {
    this._inputClass = listOfCurrentClasses.inputClass;
    this._submitButtonClass = listOfCurrentClasses.submitButtonClass;
    this._inactiveButtonClass = listOfCurrentClasses.inactiveButtonClass;
    this._inputErrorClass = listOfCurrentClasses.inputErrorClass;
    this._formErrorClassKey = listOfCurrentClasses.formErrorClassKey;
    this._form = form;
  };

  _showError(inputElement) {
    const formError = this._form.querySelector
      (`.${inputElement.id}${this._formErrorClassKey}`);
    inputElement.classList.add(`${this._inputErrorClass}`);
    formError.textContent = inputElement.validationMessage;
  };

  _hidenError(inputElement) {
    const formError = this._form.querySelector
      (`.${inputElement.id}${this._formErrorClassKey}`);
    inputElement.classList.remove(`${this._inputErrorClass}`);
    formError.textContent = '';
  };

  _checkValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement);
    } else {
      this._hidenError(inputElement);
    };
  };

  _hasInvalidInput() {
    return this._inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  };

  _switchButtonState() {
    if (!this._hasInvalidInput(this._inputList)) {
      this._buttonSave.classList.remove(`${this._inactiveButtonClass}`);
      this._buttonSave.removeAttribute('disabled');
    } else {
      this._buttonSave.classList.add(`${this._inactiveButtonClass}`);
      this._buttonSave.setAttribute('disabled', true);
    };
  };

  enableValidation() {
    this._inputList = Array.from(this._form.querySelectorAll(`.${this._inputClass}`));
    this._buttonSave = this._form.querySelector(`.${this._submitButtonClass}`);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValid(inputElement);
        this._switchButtonState();
      });
    });
  };

  _hidenAllError() {
    this._inputList.forEach((inputElement) => {
      this._hidenError(inputElement);
    });
  }

  resetErrorWhenOpeningPopup() {
    this._switchButtonState();
    this._hidenAllError();
  };

};

export default FormValidator;