import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupViewingImage = this._popup.querySelector('.popup__figure-image');
    this._popupViewingTitle = this._popup.querySelector('.popup__figure-title');
  };

  open(image, title) {
    super.open();
    this._popupViewingImage.src = image.src;
    this._popupViewingImage.alt = title.textContent;
    this._popupViewingTitle.textContent = title.textContent;
  };
}

export default PopupWithImage;