import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(selector, formSubmit) {
    super(selector);
    this._formSubmit = formSubmit;
    this._popupFormElementEdit = this._popup.querySelector('.popup__form');
    this._inputList = this._popupFormElementEdit.querySelectorAll('.popup__text-box');
    this._submitButton = this._popupFormElementEdit.querySelector('.popup__save-button');
    this._submitButtonDefaultTextContent = this._submitButton.textContent;
  };

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._submitButtonDefaultTextContent;
    };
  };

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;

  };

  close() {
    super.close();
    this._popupFormElementEdit.reset();

  };
  setEventListeners() {
    super.setEventListeners();
    this._popupFormElementEdit.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues())
    });
  };
}

export default PopupWithForm;