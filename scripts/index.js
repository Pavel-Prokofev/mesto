var profileEditButton = document.querySelector('.profile__edit-button');
var profileName = document.querySelector('.profile__name');
var profileInfo = document.querySelector('.profile__info');
var popupElem = document.querySelector('.popup');
var formElement = popupElem.querySelector('.popup__form');
var popupCloseButton = popupElem.querySelector('.popup__close-button');
var popupSaveButton = popupElem.querySelector('.popup__save-button');
var popupInputName = popupElem.querySelector('.popup__text-box_type_name');
var popupInputInfo = popupElem.querySelector('.popup__text-box_type_info');

function OnOffPopup() {
  popupElem.classList.toggle('popup_opened');
}

function clickOnTheprofileEditButton() {
  popupInputName.value = profileName.textContent;
  popupInputInfo.value = profileInfo.textContent;
}

function clickOnThePopupSaveButton(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileInfo.textContent = popupInputInfo.value;
  OnOffPopup();
}

profileEditButton.addEventListener('click', () => {
  OnOffPopup();
  clickOnTheprofileEditButton();
});

popupCloseButton.addEventListener('click', OnOffPopup);

popupSaveButton.addEventListener('click', clickOnThePopupSaveButton);

formElement.addEventListener('submit', clickOnThePopupSaveButton);