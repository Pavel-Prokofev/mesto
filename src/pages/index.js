import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards, listOfCurrentClassesBasic,
  profileEditButton, profileAddButton,
  popupEdit, popupEditFormElement, popupEditInputName, popupEditInputInfo,
  popupAdd, popupAddInputTitle, popupAddInputSrc,
  galleryContainerSelector, cardTemplateIdBasic
} from '../utils/constants.js';

const userInfoNew = new UserInfo({ userNameSelector: ".profile__name", userOccupationSelector: ".profile__info" });

const popupEditNew = new Popup('.popup_edit');
const formValidatorPopupEdit = new FormValidator(listOfCurrentClassesBasic, popupEdit);
popupEditNew.setEventListeners();
formValidatorPopupEdit.enableValidation();

profileEditButton.addEventListener('click', () => {
  popupEditNew.open();
  const userData = userInfoNew.getUserInfo();
  popupEditInputName.value = userData.userName;
  popupEditInputInfo.value = userData.userOccupation;
  formValidatorPopupEdit.resetErrorWhenOpeningPopup();
});

const handleEditForm = (evt) => {
  evt.preventDefault();
  userInfoNew.setUserInfo(popupEditInputName, popupEditInputInfo);
  popupEditNew.close();
};

popupEditFormElement.addEventListener('submit', handleEditForm);

const popupViewingNew = new PopupWithImage('.popup_viewing');
popupViewingNew.setEventListeners();

const popupAddNew = new PopupWithForm('.popup_add', (InputValues) => {
  const defaultNewCard = new Section({
    items: [{ name: popupAddInputTitle.value, link: popupAddInputSrc.value }],
    renderer: (card) => {
      const newcard = new Card(card, cardTemplateIdBasic, (image, title) => {
        popupViewingNew.open(image, title);
      });
      const newcardElement = newcard.generateCard();
      defaultNewCard.addItem(newcardElement);
    },
  },
    galleryContainerSelector
  );
  defaultNewCard.renderItems();

  console.log(InputValues);

  popupAddNew.close();
});
const formValidatorPopupAdd = new FormValidator(listOfCurrentClassesBasic, popupAdd);
popupAddNew.setEventListeners();
formValidatorPopupAdd.enableValidation();

profileAddButton.addEventListener('click', () => {
  popupAddNew.open();
  formValidatorPopupAdd.resetErrorWhenOpeningPopup();
});

const defaultCardList = new Section({
  items: initialCards,
  renderer: (card) => {
    const newcard = new Card(card, cardTemplateIdBasic, (image, title) => {
      popupViewingNew.open(image, title);
    });

    const newcardElement = newcard.generateCard();
    defaultCardList.addItem(newcardElement);
  },
},
  galleryContainerSelector
);

defaultCardList.renderItems();