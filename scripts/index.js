const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

const popupEdit = document.querySelector('.popup_edit');
const popupEditFormElement = popupEdit.querySelector('.popup__form');
const popupEditInputName = popupEdit.querySelector('.popup__text-box_type_name');
const popupEditInputInfo = popupEdit.querySelector('.popup__text-box_type_info');

const popupAdd = document.querySelector('.popup_add');
const popupAddFormElementEdit = popupAdd.querySelector('.popup__form');
const popupAddInputTitle = popupAdd.querySelector('.popup__text-box_type_title');
const popupAddInputSrc = popupAdd.querySelector('.popup__text-box_type_img-src');

const galleryContainer = document.querySelector('.gallery__cards');
const cardTemplate = document.querySelector('#gallery__card-template').content.querySelector('.gallery__card');

const popupViewing = document.querySelector('.popup_viewing');
const popupViewingImage = popupViewing.querySelector('.popup__figure-image');
const popupViewingTitle = popupViewing.querySelector('.popup__figure-title');

const popups = Array.from(document.querySelectorAll('.popup'));

const initialCards = [
  {
    name: 'Домбай',
    link: './images/dombay.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/albrus.jpg'
  },
  {
    name: 'Карачаевск',
    link: './images/karachaevo_cherkesia.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



const openPopup = popup => popup.classList.add('popup_opened');

const closePopup = popup => popup.classList.remove('popup_opened');

const saveTextInValue = (a, b) => a.value = b.textContent;

const saveValueInText = (a, b) => a.textContent = b.value;


const clearErrorTextсontent = (popup) => {
  const inputList = Array.from(popup.querySelectorAll('.popup__text-box'));
  inputList.forEach((input) => {
    input.classList.remove('popup__text-box_type_error');
  });
};

const removeErrorStileClass = (popup) => {
  const errorTextBoxes = Array.from(popup.querySelectorAll('.popup__text-box-error'));
  errorTextBoxes.forEach((errorTextBox) => {
    errorTextBox.textContent = '';
  });
};

const offSubmitbutton = (popup) => {
  popup.querySelector('.popup__save-button').classList.add('popup__save-button_disabled');
  popup.querySelector('.popup__save-button').setAttribute('disabled', true);
};

const onSubmitbutton = (popup) => {
  popup.querySelector('.popup__save-button').classList.remove('popup__save-button_disabled');
  popup.querySelector('.popup__save-button').removeAttribute('disabled');
};


profileEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  saveTextInValue(popupEditInputName, profileName);
  saveTextInValue(popupEditInputInfo, profileInfo);

  if (profileName.textContent && profileInfo.textContent) {
    onSubmitbutton(popupEdit);
  };

});


const handleEditForm = (evt) => {
  evt.preventDefault();
  saveValueInText(profileName, popupEditInputName);
  saveValueInText(profileInfo, popupEditInputInfo);
  closePopup(popupEdit);

};

popupEditFormElement.addEventListener('submit', handleEditForm);


const handleLikeCard = (likeButton) => {
  likeButton.classList.toggle('gallery__card-like_active');
};

const handleTrashCard = (evt) => {
  evt.target.closest('.gallery__card').remove();
};

const renderPopupViewing = (image, title) => {
  popupViewingImage.src = image.src;
  popupViewingImage.alt = title.textContent;
  popupViewingTitle.textContent = title.textContent;
  openPopup(popupViewing);
};

const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);

  const image = newCard.querySelector('.gallery__card-image');
  image.src = dataCard.link;
  image.alt = dataCard.name;

  const title = newCard.querySelector('.gallery__card-title');
  title.textContent = dataCard.name;

  const likeButton = newCard.querySelector('.gallery__card-like');
  likeButton.addEventListener('click', () => {
    handleLikeCard(likeButton);
  });

  const trashBtn = newCard.querySelector('.gallery__card-trash');
  trashBtn.addEventListener('click', handleTrashCard);

  image.addEventListener('click', () => {
    renderPopupViewing(image, title);
  });

  return newCard;
};

const renderCard = (dataCard) => galleryContainer.prepend(generateCard(dataCard));

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});

profileAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
  popupAddFormElementEdit.reset();
  offSubmitbutton(popupAdd);
});

const handleAddCard = (evt) => {
  evt.preventDefault();
  renderCard({ name: popupAddInputTitle.value, link: popupAddInputSrc.value });
  closePopup(popupAdd);
  popupAddFormElementEdit.reset();
};

popupAddFormElementEdit.addEventListener('submit', handleAddCard);



popups.forEach((popup) => {

  popup.addEventListener('click', (evt) => {

    const isOverlay = evt.target.classList.contains('popup');
    const isCloseButton = evt.target.classList.contains('popup__close-button');

    if (isOverlay || isCloseButton) {
      closePopup(popup);
      clearErrorTextсontent(popup);
      removeErrorStileClass(popup);
    };
  });


  document.addEventListener('keydown', (evt) => {
    const isOverlay = popup.classList.contains('popup_opened');
    if (evt.key === 'Escape' && isOverlay) {
      closePopup(popup);
      clearErrorTextсontent(popup);
      removeErrorStileClass(popup);
    };
  });

});