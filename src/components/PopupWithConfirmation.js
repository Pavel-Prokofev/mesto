import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(selector, formSubmit) {
    super(selector);
    this._formSubmit = formSubmit;
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

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
    document.addEventListener('keydown', this._handleEnter);
  };

  delCard() {
    this._card.remove();
    this._card = null;
  };

  _submit(evt) {
    evt.preventDefault();
    this._formSubmit(this._cardId, this._submitButton, this._submitButtonDefaultTextContent);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupFormElementEdit.addEventListener('submit', this._submit);
  };
}

export default PopupWithConfirmation;