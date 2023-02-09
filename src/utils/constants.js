const listOfCurrentClassesBasic = {
  inputClass: 'popup__text-box',
  submitButtonClass: 'popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-box_type_error',
  formErrorClassKey: '-error'
};

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditAvatarButton = document.querySelector('.profile__avatar-box');
const profileAddButton = document.querySelector('.profile__add-button');

const formEdit = document.querySelector('.popup__form-edit');
const formEditAvatar = document.querySelector('.popup__form-edit-avatar');
const formAdd = document.querySelector('.popup__form-add');

const popupEdit = document.querySelector('.popup_edit');
const popupEditInputName = popupEdit.querySelector('.popup__text-box_type_name');
const popupEditInputInfo = popupEdit.querySelector('.popup__text-box_type_info');

const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '671343e9-f0a7-463f-80c9-744ddd3c1bdb',
    'Content-Type': 'application/json'
  }
};

export {
  listOfCurrentClassesBasic,
  formEdit, formEditAvatar, formAdd,
  profileEditButton, profileEditAvatarButton, profileAddButton,
  popupEditInputName, popupEditInputInfo,
  configApi
};