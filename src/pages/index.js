import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards, listOfCurrentClassesBasic,
  formEdit, formAdd,
  profileEditButton, profileAddButton,
  popupEditInputName, popupEditInputInfo,
} from '../utils/constants.js';

const userInfoNew = new UserInfo({ userNameSelector: ".profile__name", userOccupationSelector: ".profile__info" });

const popupEditNew = new PopupWithForm('.popup_edit', (inputValues) => {
  userInfoNew.setUserInfo(inputValues);
  popupEditNew.close();
});
const formValidatorPopupEdit = new FormValidator(listOfCurrentClassesBasic, /*'.popup__form-edit'*/formEdit);
popupEditNew.setEventListeners();
formValidatorPopupEdit.enableValidation();

profileEditButton.addEventListener('click', () => {
  popupEditNew.open();
  const userData = userInfoNew.getUserInfo();
  popupEditInputName.value = userData.userName;
  popupEditInputInfo.value = userData.userOccupation;
  formValidatorPopupEdit.resetErrorWhenOpeningPopup();
});

const popupViewingNew = new PopupWithImage('.popup_viewing');
popupViewingNew.setEventListeners();

const creatCard = (card) => {
  const newCard = new Card(card, '#gallery__card-template', (image, title) => {
    popupViewingNew.open(image, title);
  });
  const newCardElement = newCard.generateCard();
  return newCardElement;
}

const newSection = new Section({
  items: initialCards,
  renderer: (card) => {
    newSection.addItem(creatCard(card));
  },
},
  '.gallery__cards'
);

const popupAddNew = new PopupWithForm('.popup_add', (inputValues) => {
  newSection.addItem(creatCard({ name: inputValues.title, link: inputValues.img }))
  popupAddNew.close();
});

const formValidatorPopupAdd = new FormValidator(listOfCurrentClassesBasic, formAdd/*'.popup__form-add'*/);
popupAddNew.setEventListeners();
formValidatorPopupAdd.enableValidation();

profileAddButton.addEventListener('click', () => {
  popupAddNew.open();
  formValidatorPopupAdd.resetErrorWhenOpeningPopup();
});

newSection.renderItems();