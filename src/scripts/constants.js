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
  inputClass: 'popup__text-box',
  submitButtonClass: 'popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-box_type_error',
  formErrorClassKey: '-error'
};

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_edit');
const popupEditFormElement = popupEdit.querySelector('.popup__form');
const popupEditInputName = popupEdit.querySelector('.popup__text-box_type_name');
const popupEditInputInfo = popupEdit.querySelector('.popup__text-box_type_info');

const popupAdd = document.querySelector('.popup_add');
const popupAddInputTitle = popupAdd.querySelector('.popup__text-box_type_title');
const popupAddInputSrc = popupAdd.querySelector('.popup__text-box_type_img-src');

const galleryContainerSelector = '.gallery__cards';
const cardTemplateIdBasic = 'gallery__card-template';

export {
  initialCards, listOfCurrentClassesBasic,
  profileEditButton, profileAddButton,
  popupEdit, popupEditFormElement, popupEditInputName, popupEditInputInfo,
  popupAdd, popupAddInputTitle, popupAddInputSrc,
  galleryContainerSelector, cardTemplateIdBasic
};