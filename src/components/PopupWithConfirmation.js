import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(selector, formSubmit) {
    super(selector);
    this._formSubmit = formSubmit;
    this._popupFormElementEdit = this._popup.querySelector('.popup__form');

    this._submit = this._submit.bind(this);
    this._handleEnter = this._handleEnter.bind(this);
  };

  _handleEnter(evt) {
    if (evt.key === 'Enter') {
      this._submit(evt);
    };
  };

  close() {
    super.close()
    document.removeEventListener('keydown', this._handleEnter);
  }

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
    this._formSubmit(this._cardId);
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormElementEdit.addEventListener('submit', this._submit);
  };
}

export default PopupWithConfirmation;