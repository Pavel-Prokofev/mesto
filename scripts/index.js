import Card from './Card.js';
import FormValidator from './FormValidator.js';

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
const cardTemplateBasic = document.querySelector('#gallery__card-template').content.querySelector('.gallery__card');

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

const listOfCurrentClassesBasic = {
  formClass: 'popup__form',
  fieldsetClass: 'popup__personal-data',
  inputClass: 'popup__text-box',
  submitButtonClass: 'popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-box_type_error',
  formErrorClassKey: '-error'
};

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

const saveTextInValue = (a, b) => a.value = b.textContent;

const saveValueInText = (a, b) => a.textContent = b.value;



profileEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  saveTextInValue(popupEditInputName, profileName);
  saveTextInValue(popupEditInputInfo, profileInfo);

  const formValidator = new FormValidator(listOfCurrentClassesBasic, popupEdit);
  formValidator.enableValidation();
});

const handleEditForm = (evt) => {
  evt.preventDefault();
  saveValueInText(profileName, popupEditInputName);
  saveValueInText(profileInfo, popupEditInputInfo);
  closePopup(popupEdit);

};

popupEditFormElement.addEventListener('submit', handleEditForm);



const renderPopupViewingBasic = (image, title) => {
  popupViewingImage.src = image.src;
  popupViewingImage.alt = title.textContent;
  popupViewingTitle.textContent = title.textContent;
  openPopup(popupViewing);
};

const renderCard = (dataCard, cardTemplate, renderPopupViewing) => {
  const card = new Card(dataCard, cardTemplate, renderPopupViewing);
  galleryContainer.prepend(card.generateCard());
};

initialCards.forEach((dataCard) => {
  renderCard(dataCard, cardTemplateBasic, renderPopupViewingBasic);
});



profileAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
  popupAddFormElementEdit.reset();
  const formValidator = new FormValidator(listOfCurrentClassesBasic, popupAdd);
  formValidator.enableValidation();
});

const handleAddCard = (evt) => {
  evt.preventDefault();
  renderCard({ name: popupAddInputTitle.value, link: popupAddInputSrc.value }, cardTemplateBasic, renderPopupViewingBasic);
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
    };

  });

});