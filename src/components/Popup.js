class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  };

  open() {
    this._popup.classList.add('popup_opened');
    this._handleEscClose = this._handleEscClose.bind(this);
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener('click', () => {
      const isOverlay = evt.target.classList.contains('popup');
      const isCloseButton = evt.target.classList.contains('popup__close-button');
      if (isOverlay || isCloseButton) {
        this.close();
      };
    });
  };
}

export default Popup;