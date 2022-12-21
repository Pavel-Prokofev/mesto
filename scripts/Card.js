class Card {
  constructor(dataCard, cardTemplate, renderPopupViewing) {
    this._link = dataCard.link;
    this._name = dataCard.name;
    this._cardTemplate = cardTemplate;
    this._renderPopupViewing = renderPopupViewing;
  };

  _handleLikeCard(likeButton) {
    likeButton.classList.toggle('gallery__card-like_active');
  };

  _handleTrashCard() {
    this._newCard.remove();
    this._newCard = null;
  };

  _setData() {
    this._image = this._newCard.querySelector('.gallery__card-image');
    this._image.src = this._link;
    this._image.alt = this._name;

    this._title = this._newCard.querySelector('.gallery__card-title');
    this._title.textContent = this._name;
  };

  _setEventListeners(image, title) {
    const likeButton = this._newCard.querySelector('.gallery__card-like');
    likeButton.addEventListener('click', () => {
    this._handleLikeCard(likeButton);
  });

    const trashBtn = this._newCard.querySelector('.gallery__card-trash');
    trashBtn.addEventListener('click', () => {
    this._handleTrashCard();
  });

    this._image.addEventListener('click', () => {
    this._renderPopupViewing(this._image, this._title);
  });
  };

  generateCard() {
    this._newCard = this._cardTemplate.cloneNode(true);
    this._setData();
    this._setEventListeners();

    return this._newCard;
  };
};

export default Card;