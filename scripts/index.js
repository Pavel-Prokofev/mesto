const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

const popupEdit = document.querySelector('.popup_edit');
const popupEditFormElement = popupEdit.querySelector('.popup__form');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');
const popupEditSaveButton = popupEdit.querySelector('.popup__save-button');
const popupEditInputName = popupEdit.querySelector('.popup__text-box_type_name');
const popupEditInputInfo = popupEdit.querySelector('.popup__text-box_type_info');

const popupAdd = document.querySelector('.popup_add');
const popupAddFormElementEdit = popupAdd.querySelector('.popup__form');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');
const popupAddSaveButton = popupAdd.querySelector('.popup__save-button');
const popupAddInputTitle = popupAdd.querySelector('.popup__text-box_type_title');
const popupAddInputSrc = popupAdd.querySelector('.popup__text-box_type_img-src');

const galleryContainer = document.querySelector('.gallery__cards');
const cardTemplate = document.querySelector('#gallery__card-template').content.querySelector('.gallery__card');

const popupViewing = document.querySelector('.popup-viewing');
const popupViewingImage = popupViewing.querySelector('.popup-viewing__figure-image');
const popupViewingTitle = popupViewing.querySelector('.popup-viewing__figure-title');
const popupViewingCloseButton = popupViewing.querySelector('.popup-viewing__close-button');

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



const OnOffPopup  = popup => popup.classList.toggle('popup-opened');

const saveTextInValue = (a, b) => a.value = b.textContent;

const saveValueInText = (a, b) => a.textContent = b.value;


profileEditButton.addEventListener('click', () => {
  OnOffPopup(popupEdit);
  saveTextInValue(popupEditInputName, profileName);
  saveTextInValue(popupEditInputInfo, profileInfo);
});

popupEditCloseButton.addEventListener('click', () => {
  OnOffPopup(popupEdit);
});

popupEditSaveButton.addEventListener('click', (evt) => {
  saveValueInText(profileName, popupEditInputName);
  saveValueInText(profileInfo, popupEditInputInfo);
  OnOffPopup(popupEdit);
  evt.preventDefault();
});

popupEditFormElement.addEventListener('submit', (evt) => {
  saveValueInText(profileName, popupEditInputName);
  saveValueInText(profileInfo, popupEditInputInfo);
  OnOffPopup(popupEdit);
  evt.preventDefault();
});



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
};

popupViewingCloseButton.addEventListener('click', () => {
  OnOffPopup(popupViewing);
});

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
    OnOffPopup(popupViewing);
  });
  
  return newCard;
};

const renderCard = (dataCard) => galleryContainer.prepend(generateCard(dataCard));

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});

profileAddButton.addEventListener('click', () => {
  OnOffPopup(popupAdd);
});

popupAddCloseButton.addEventListener('click', () => {
  OnOffPopup(popupAdd);
});

const handleAddCard = (evt) => {
  evt.preventDefault();
  renderCard({ name: popupAddInputTitle.value, link:  popupAddInputSrc.value });
  OnOffPopup(popupAdd);
  popupAddInputTitle.value = '';
  popupAddInputSrc.value = '';
};

popupAddSaveButton.addEventListener('click', handleAddCard);

popupAddFormElementEdit.addEventListener('submit', handleAddCard);