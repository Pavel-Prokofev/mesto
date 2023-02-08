import Popup from "./Popup.js";

class PopupWithError extends Popup {
  constructor(selector) {
    super(selector);
    this._popupErrorTextConteyner = this._popup.querySelector('.popup__title');
    this._popupFormElementEdit = this._popup.querySelector('.popup__form');

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

  open(err) {
    super.open();
    this._popupErrorTextConteyner.textContent = err;
    document.addEventListener('keydown', this._handleEnter);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupFormElementEdit.addEventListener('submit', (evt)=> {
      evt.preventDefault();
      this.close();
    });
  };
}

export default PopupWithError;