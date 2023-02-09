import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(selector, formSubmit) {
    super(selector);
    this._formSubmit = formSubmit;
    this._popupFormElementEdit = this._popup.querySelector('.popup__form');
    this._inputList = this._popupFormElementEdit.querySelectorAll('.popup__text-box');

    this._submitButton = this._popupFormElementEdit.querySelector('.popup__save-button');
    this._submitButtonDefaultTextContent = this._submitButton.textContent;

    this._loadingErrorBox = this._popup.querySelector('.loading-error');
    this.renderRemoveLoadingError = this.renderRemoveLoadingError.bind(this);
  };

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  };

  renderLoadingError(loadingErrorText) {
    this._loadingErrorBox.textContent = loadingErrorText;
  };

  renderRemoveLoadingError() {
    this._loadingErrorBox.textContent = '';
  };

  close() {
    super.close();
    this._popupFormElementEdit.reset();
    this.renderRemoveLoadingError();
    this._popupFormElementEdit.removeEventListener('input', this.renderRemoveLoadingError);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupFormElementEdit.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._popupFormElementEdit.addEventListener('input', this.renderRemoveLoadingError);
      this._formSubmit(this._getInputValues(), this._submitButton, this._submitButtonDefaultTextContent);
    });
  };
}

export default PopupWithForm;