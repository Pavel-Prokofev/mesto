import dombay from '../images/dombay.jpg';
import albrus from '../images/albrus.jpg';
const karachaevoCherkesia = new URL('../images/karachaevo_cherkesia.jpg', import.meta.url);

const initialCards = [
  {
    name: 'Домбай',
    link: dombay
  },
  {
    name: 'Гора Эльбрус',
    link: albrus
  },
  {
    name: 'Карачаевск',
    link: karachaevoCherkesia
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
  inputClass: 'popup__text-box',
  submitButtonClass: 'popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-box_type_error',
  formErrorClassKey: '-error'
};

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_edit');
const popupEditInputName = popupEdit.querySelector('.popup__text-box_type_name');
const popupEditInputInfo = popupEdit.querySelector('.popup__text-box_type_info');

export {
  initialCards, listOfCurrentClassesBasic,
  profileEditButton, profileAddButton,
  popupEditInputName, popupEditInputInfo,
};