import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._popupFormElementEdit = this._popup.querySelector('.popup__form');

    this._submitButton = this._popupFormElementEdit.querySelector('.popup__save-button');
    this._submitButtonDefaultTextContent = this._submitButton.textContent;

    this._submit = this._submit.bind(this);
    this._handleEnter = this._handleEnter.bind(this);

    this._loadingErrorBox = this._popup.querySelector('.loading-error');
  };

  renderLoadingError(loadingErrorText) {
    this._loadingErrorBox.textContent = loadingErrorText;
  };

  renderRemoveLoadingError() {
    this._loadingErrorBox.textContent = '';
  };

  _handleEnter(evt) {
    if (evt.key === 'Enter') {
      this._submit(evt);
    };
  };

  close() {
    super.close()
    this.renderRemoveLoadingError();
    document.removeEventListener('keydown', this._handleEnter);
  };

  open(formSubmit) {
    super.open();
    this._formSubmit = formSubmit;
    document.addEventListener('keydown', this._handleEnter);
  };

  _submit(evt) {
    evt.preventDefault();
    this._formSubmit(this._submitButton, this._submitButtonDefaultTextContent);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupFormElementEdit.addEventListener('submit', this._submit);
  };
}

export default PopupWithConfirmation;