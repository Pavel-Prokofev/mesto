class Card {
  constructor(dataCard, cardTemplateId, handleCardClick) {
    this._link = dataCard.link;
    this._name = dataCard.name;
    this._cardTemplateId = cardTemplateId;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    return document
      .querySelector(`#${this._cardTemplateId}`)
      .content.querySelector('.gallery__card')
      .cloneNode(true);
  };

  _handleLikeCard() {
    this._likeButton.classList.toggle('gallery__card-like_active');
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

  _setEventListeners() {
    this._likeButton = this._newCard.querySelector('.gallery__card-like');
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard();
    });

    const trashBtn = this._newCard.querySelector('.gallery__card-trash');
    trashBtn.addEventListener('click', () => {
      this._handleTrashCard();
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._image, this._title);
    });
  };

  generateCard() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();
    return this._newCard;
  };
};

export default Card;