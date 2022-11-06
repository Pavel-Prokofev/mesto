var profileEditButton = document.querySelector('.profile__edit-button');
var profileName = document.querySelector('.profile__name');
var profileInfo = document.querySelector('.profile__info');
var popupElem = document.querySelector('.popup');
var formElement = popupElem.querySelector('.popup__form');
var popupCloseButton = popupElem.querySelector('.popup__close-button');
var popupSaveButton = popupElem.querySelector('.popup__save-button');
var popupInputName = popupElem.querySelector('.popup__name');
var popupInputInfo = popupElem.querySelector('.popup__info');




function clickOnTheProfileEditButton() {
  popupElem.classList.add('popup_open');
  popupInputName.value = profileName.textContent;
  popupInputInfo.value = profileInfo.textContent;
}

function clickOnThePopupCloseButton() {
  popupElem.classList.remove('popup_open');
}

function clickOnThePopupSaveButton(evt) {
  evt.preventDefault();
  if (popupInputName.value && popupInputInfo.value) {
    profileName.textContent = popupInputName.value;
    profileInfo.textContent = popupInputInfo.value;
    clickOnThePopupCloseButton();
  }

}

profileEditButton.addEventListener('click', clickOnTheProfileEditButton); 

popupCloseButton.addEventListener('click', clickOnThePopupCloseButton);

popupSaveButton.addEventListener('click', clickOnThePopupSaveButton);

formElement.addEventListener('submit', clickOnThePopupSaveButton);




