import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, listOfCurrentClassesBasic} from './constantsObjects.js';

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
const cardTemplateIdBasic = 'gallery__card-template';

const popupViewing = document.querySelector('.popup_viewing');
const popupViewingImage = popupViewing.querySelector('.popup__figure-image');
const popupViewingTitle = popupViewing.querySelector('.popup__figure-title');

const popups = Array.from(document.querySelectorAll('.popup'));

const formValidatorPopupEdit = new FormValidator(listOfCurrentClassesBasic, popupEdit);
const formValidatorPopupAdd = new FormValidator(listOfCurrentClassesBasic, popupAdd);

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

formValidatorPopupEdit.enableValidation();

profileEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  saveTextInValue(popupEditInputName, profileName);
  saveTextInValue(popupEditInputInfo, profileInfo);
  formValidatorPopupEdit.resetErrorWhenOpeningPopup();
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

const createCard = (dataCard, cardTemplateId, renderPopupViewing) => {
  return new Card(dataCard, cardTemplateId, renderPopupViewing);
};

const renderCard = (card) => {
  galleryContainer.prepend(card.generateCard());
};

initialCards.forEach((dataCard) => {
  const card = createCard(dataCard, cardTemplateIdBasic, renderPopupViewingBasic);
  renderCard(card);
});

formValidatorPopupAdd.enableValidation();

profileAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
  popupAddFormElementEdit.reset();
  formValidatorPopupAdd.resetErrorWhenOpeningPopup();
});

const handleAddCard = (evt) => {
  evt.preventDefault();
  const card = createCard({ name: popupAddInputTitle.value, link: popupAddInputSrc.value },
    cardTemplateIdBasic, renderPopupViewingBasic);
  renderCard(card);
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