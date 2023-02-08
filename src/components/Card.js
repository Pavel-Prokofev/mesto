class Card {
  constructor({ name, link, likes, _id, owner },
    { cardTemplateSelector, handleCardClick, myId, handleDelCard, hendleAddLike, hendleRemoveLike }) {
    this._link = link;
    this._name = name;
    this._likes = likes;
    this._cardId = _id;
    this._creatorCardId = owner._id;
    this._myId = myId;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelCard = handleDelCard;
    this._hendleAddLike = hendleAddLike;
    this._hendleRemoveLike = hendleRemoveLike;
  };

  _getTemplate() {
    return document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.gallery__card')
      .cloneNode(true);
  };

  _checkMyLike() {
    return this._likes.some(likeItem => likeItem._id === this._myId);
  }

  _handleLikeCard() {
    if (this._checkMyLike()) {
      this._hendleRemoveLike(this._cardId);
    } else { this._hendleAddLike(this._cardId); };
  };

  _assigningLikesCounter() {
    this._likesCounter.textContent = this._likes.length;
  }

  handlelikesCounter(res) {
    this._likes = res.likes;
    this._assigningLikesCounter();
  };

  addLike() {
    this._likeButton.classList.add('gallery__card-like_active');
  };

  removeLike() {
    this._likeButton.classList.remove('gallery__card-like_active');
  };

  _setData() {
    this._image = this._newCard.querySelector('.gallery__card-image');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title = this._newCard.querySelector('.gallery__card-title');
    this._title.textContent = this._name;

    this._likeButton = this._newCard.querySelector('.gallery__card-like');
    this._likesCounter = this._newCard.querySelector('.gallery__card-like-counter');
    this._assigningLikesCounter();
    if (this._checkMyLike()) { this.addLike(); };
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard();
    });

    const trashButton = this._newCard.querySelector('.gallery__card-trash');
    if (this._creatorCardId === this._myId) {
      trashButton.addEventListener('click', () => {
        this._handleDelCard(this._newCard, this._cardId);
      });
    } else {
      trashButton.remove();
    };

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