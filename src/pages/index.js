import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithError from '../components/PopupWithError.js'
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  listOfCurrentClassesBasic,
  formEdit, formEditAvatar, formAdd,
  profileEditButton, profileEditAvatarButton, profileAddButton,
  popupEditInputName, popupEditInputInfo,
  configApi
} from '../utils/constants.js';

const PopupWithErrorNew = new PopupWithError('.popup_error');
PopupWithErrorNew.setEventListeners();

const api = new Api(configApi);

const userInfoNew = new UserInfo({
  userNameSelector: '.profile__name',
  userOccupationSelector: '.profile__info',
  userAvatarSelector: '.profile__avatar'
});



const popupEditNew = new PopupWithForm('.popup_edit',
  (inputValues) => {
    if (userInfoNew.transferMyId()) {
      popupEditNew.renderLoading(true);
      api.patchUserInfo({ name: inputValues.username, about: inputValues.occupation })
        .then((res) => {
          userInfoNew.setUserInfo(res);
        })
        .catch((err) => {
          PopupWithErrorNew.open(`Ошибка при перезаписи данных пользователя: ${err}`);
        })
        .finally(() => {
          popupEditNew.renderLoading(false);
          popupEditNew.close();
        });
    } else {
      popupEditNew.close();
      PopupWithErrorNew.open(`Ошибка при загрузке новых данных на сервер вызваная некорреректной загрузкой данных пользователя`);
    }
  }
);
const formValidatorPopupEdit = new FormValidator(listOfCurrentClassesBasic, formEdit);
popupEditNew.setEventListeners();
formValidatorPopupEdit.enableValidation();
profileEditButton.addEventListener('click',
  () => {
    popupEditNew.open();
    const userData = userInfoNew.getUserInfo();
    popupEditInputName.value = userData.userName;
    popupEditInputInfo.value = userData.userOccupation;
    formValidatorPopupEdit.resetErrorWhenOpeningPopup();
  }
);

const popupEditAvatarNew = new PopupWithForm('.popup_edit-avatar',
  (inputValues) => {
    if (userInfoNew.transferMyId()) {
      popupEditAvatarNew.renderLoading(true);
      api.patchUserAvatar(inputValues)
        .then((res) => {
          userInfoNew.setUseravatar(res);
        })
        .catch((err) => {
          PopupWithErrorNew.open(`Ошибка при перезаписи аватара пользователя: ${err}`);
        })
        .finally(() => {
          popupEditAvatarNew.renderLoading(false);
          popupEditAvatarNew.close();
        });
    } else {
      popupEditAvatarNew.close();
      PopupWithErrorNew.open(`Ошибка при загрузке новых данных на сервер вызваная некорреректной загрузкой данных пользователя`);
    }
  }
);
const formValidatorPopupEditAvatar = new FormValidator(listOfCurrentClassesBasic, formEditAvatar);
popupEditAvatarNew.setEventListeners();
formValidatorPopupEditAvatar.enableValidation();
profileEditAvatarButton.addEventListener('click',
  () => {
    popupEditAvatarNew.open();
    formValidatorPopupEditAvatar.resetErrorWhenOpeningPopup();
  }
);

const popupViewingNew = new PopupWithImage('.popup_viewing');
popupViewingNew.setEventListeners();

const PopupWithConfirmationNew = new PopupWithConfirmation('.popup_del-card',
  (cardId) => {
    api.delCard(cardId)
      .then(() => {
        PopupWithConfirmationNew.delCard();
      })
      .catch((err) => {
        PopupWithErrorNew.open(`Ошибка при удалении карточки с сервера: ${err}`);
      });
  }
);
PopupWithConfirmationNew.setEventListeners();

const creatCard = (card) => {
  if (userInfoNew.transferMyId()) {
    const newCard = new Card(
      card,
      {
        cardTemplateSelector: '#gallery__card-template',

        handleCardClick: (image, title) => {
          popupViewingNew.open(image, title);
        },

        myId: userInfoNew.transferMyId(),

        handleDelCard: (card, cardId) => {
          PopupWithConfirmationNew.open(card, cardId);
        },

        hendleAddLike: (cardId) => {
          api.putCardLike(cardId)
            .then((res) => {
              newCard.addLike();
              newCard.handlelikesCounter(res);
            })
            .catch((err) => {
              PopupWithErrorNew.open(`Ошибка при добавлении лайка карточки на сервер: ${err}`);
            });
        },

        hendleRemoveLike: (cardId) => {
          api.delCardLike(cardId)
            .then((res) => {
              newCard.removeLike();
              newCard.handlelikesCounter(res);
            })
            .catch((err) => {
              PopupWithErrorNew.open(`Ошибка при удалении лайка карточки с сервера: ${err}`);
            });
        }
      }
    );

    return newCard.generateCard();
  }
  PopupWithErrorNew.open(`Ошибка при загрузке новой карточки на сервер вызваная некорреректной загрузкой данных пользователя`);
}

const newSection = new Section(
  (card) => {
    newSection.addDefaultItems(creatCard(card));
  },
  '.gallery__cards'
);

const popupAddNew = new PopupWithForm('.popup_add',
  (inputValues) => {
    popupAddNew.renderLoading(true);
    api.postNewCard({ name: inputValues.title, link: inputValues.img })
      .then((res) => {
        newSection.addItem(creatCard(res));
      })
      .catch((err) => {
        popupAddNew.close();
        PopupWithErrorNew.open(`Ошибка при загрузки новой карточки на сервер: ${err}`);
      })
      .finally(() => {
        popupAddNew.renderLoading(false);
        popupAddNew.close();
      });
  }
);

const formValidatorPopupAdd = new FormValidator(listOfCurrentClassesBasic, formAdd);
popupAddNew.setEventListeners();
formValidatorPopupAdd.enableValidation();

profileAddButton.addEventListener('click',
  () => {
    popupAddNew.open();
    formValidatorPopupAdd.resetErrorWhenOpeningPopup();
  });


api.getUserInfo()
  .then((res) => {
    userInfoNew.setUserInfo(res);
    userInfoNew.setUseravatar(res);
    if (res._id) {
      api.getAllCards()
        .then((res) => {
          newSection.renderItems(res);
        })
        .catch((err) => {
          PopupWithErrorNew.open(`Ошибка при загрузке карточек с сервера: ${err}`);
        });
    }
  })
  .catch((err) => {
    PopupWithErrorNew.open(`Ошибка при загрузке данных пользователя с сервера: ${err}`);
  });
