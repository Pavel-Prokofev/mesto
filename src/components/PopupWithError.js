import Popup from "./Popup.js";

class PopupWithError extends Popup {
  constructor(selector) {
    super(selector);
    this._popupErrorTextConteyner = this._popup.querySelector('.popup__title');
  };

  open(err) {
    super.open();
    this._popupErrorTextConteyner.textContent = err;
  };

}

export default PopupWithError;