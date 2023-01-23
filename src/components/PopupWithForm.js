import Popup from "./Popup.js";

class PopupWithForm extends Popup {

  constructor(selector, formSubmit) {
    super(selector);
    this._formSubmit = formSubmit;
    this._popupFormElementEdit = this._popup.querySelector('.popup__form');
  };

  _getInputValues() {
    this._data = Array.from(this._popupFormElementEdit).
      filter((item) => !!item.name).
      map((element) => {
        const name = element.name;
        const value = element.value;
        return { name, value };
      });
    return this._data;
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